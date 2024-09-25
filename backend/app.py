from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
import firebase_admin
from firebase_admin import credentials, auth, firestore, storage
import openai
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv
import time
import requests
from PyPDF2 import PdfReader
import io
import time
# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def pdf_content(pdf_url):
    response = requests.get(pdf_url)

    if(response.status_code == 200):
        pdf_bytes = io.BytesIO(response.content)
        reader = PdfReader(pdf_bytes)
        text = ""

        for i in reader.pages:
            text = text + i.extract_text()
        
        return text
    
    else: 
        return None

cred = credentials.Certificate("backend/unoofirebaseadmin.json")

firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')
})

api_key = os.getenv('OPEN_AI')
openai.api_key = os.getenv('OPEN_AI')

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    full_name = f"{first_name} {last_name}"
    try:
        # Create the user with email, password, and full_name (display_name in Firebase)
        user = auth.create_user(email=email, password=password, display_name=full_name)
        return jsonify({"message": "User created successfully", "uid": user.uid, "name": user.display_name}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/signin', methods=['POST'])
def signin():
    id_token = request.json.get('idToken')
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        user = auth.get_user(uid)  # Fetch user data
        return jsonify({
            "message": "User signed in successfully",
            "uid": uid,
            "name": user.display_name,
            "email": user.email
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401
    

avaj = 'nova'
client = OpenAI(api_key=api_key)
def convert_to_speech(text):
    speech_file_path = "backend/static/output.mp3"
    
    response = client.audio.speech.create(
        model="tts-1",
        voice=avaj,
        input=text
    )

    # Save the generated audio to a file
    response.stream_to_file(speech_file_path)

    # Return the URL to the saved audio file with a timestamp to avoid caching
    return f"/output.mp3?{int(time.time())}"

@app.route('/handle-voice-command', methods=['POST'])
def handle_voice_command():
    command = request.json.get('command').lower()
    page_url = None
    pdf_url = "https://firebasestorage.googleapis.com/v0/b/unoo-45cb7.appspot.com/o/medical_report%20(1).pdf?alt=media&token=78165d10-1655-4d9c-ae44-543b17646069"
    
    # Fetch PDF content if the command involves a report
    if "report" in command or "summarise" in command:
        pdf_content1 = pdf_content(pdf_url)
        if pdf_content1:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Summarize the following medical report."},
                    {"role": "user", "content": pdf_content1}
                ],
                max_tokens=200,
                temperature=0.7
            )
            response_text = response.choices[0].message.content
        else:
            response_text = "Unable to fetch the medical report."
    
    # Dynamic medical response generation based on keywords
    elif any(keyword in command for keyword in ["symptoms", "treatment", "diagnosis", "advice", "i have", "feeling"]):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": f"Provide medical information about: {command}"}],
            max_tokens=200,
            temperature=0.7
        )
        response_text = response.choices[0].message.content
    
    # Handle navigation-related commands dynamically
    else:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content" : f"Determine the page navigation for the command: '{command}'. Respond with one of the following: home, sign-up, sign-in, dashboard, diagnoses, reports."}],
            max_tokens=100,
            temperature=0.7
        )
        navigation_command = response.choices[0].message.content.strip().lower()
        page_mapping = {
            "home": "/",
            "sign-up": "/sign-up",
            "sign-in": "/sign-in",
            "dashboard": "/dashboard",
            "diagnoses": "/diagnoses",
            "reports": "/reports"
        }
        
        page_url = page_mapping.get(navigation_command, f"/{page_url}")
        response_text = f"Navigate to {page_url}"
   


    # Convert the response to speech and return
    audio_url = convert_to_speech(response_text)
    return jsonify({
        'text_response': response_text,
        'audio_url': audio_url,
        'navigate_to': page_url
    })

@app.route('/output.mp3')
def serve_audio():
    return send_from_directory('static', 'output.mp3')


db = firestore.client()

@app.route('/get-pdfs', methods=['GET'])
def get_pdfs():
    try:
        # Fetch all documents from the 'pdfs' collection in Firestore
        pdfs_ref = db.collection('pdfs').stream()

        pdfs = []
        for pdf in pdfs_ref:
            pdf_data = pdf.to_dict()
            pdfs.append(pdf_data)

        return jsonify(pdfs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)
