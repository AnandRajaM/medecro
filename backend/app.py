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

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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
    
    # Handle the specific voice command about appointments
    if "appointments" in command or "today" in command:
        # Respond with information about the user's appointments
        response_text = "Today you have 3 appointments."
    
    # Handle the specific voice command to summarize medical report
        
    elif "hindi" in command and "summarise" in command:
        # Provide a summary of Atharv medical report in hindi
        response_text = "Atharv Rastogi, jo ki 26 saal ka hai, recent test results ke hisaab se bilkul healthy hai. Uska blood pressure perfect hai, 120/80, aur blood sugar bhi bilkul normal hai, 90 mg/dL. Cholesterol levels fit hain, 190 mg/dL, aur vitamin D levels bhi sahi hain, jo acchi diet aur dhoop lene se ho sakte hain. Uska hemoglobin 14 g/dL hai, jo dikhata hai ki uske blood mein oxygen levels kaafi ache hain. Immune system bhi strong hai kyunki white blood cell count 5,000 /µL hai. Platelets bhi theek hain, 250,000 /µL, iska matlab uska blood clotting bhi normal hai. Sodium aur potassium levels normal hain, jo dikhata hai ki uska hydration aur electrolyte balance sahi hai. Calcium levels bhi theek hain, jo strong bones aur muscle function ka indicator hai. Overall, John ke saare test results normal range mein hain. Bas yaad rahe ki balanced diet, regular exercise aur routine checkups ko follow karta rahe."
    
    elif "summarise" in command or "report" in command:
        # Provide a summary of Atharv medical report
        response_text = "John Doe, a 26-year-old male, is in good health based on recent test results. His blood pressure is perfect at 120/80, and his blood sugar is well within the normal range at 90 mg/dL. Cholesterol levels are healthy at 190 mg/dL, and his vitamin D is normal, likely due to a good diet and sun exposure. His hemoglobin is at 14 g/dL, indicating good oxygen levels in his blood. His immune system looks healthy with a white blood cell count of 5,000 /µL, and his platelets are normal at 250,000 /µL, meaning his blood clotting is fine. Sodium and potassium levels are both normal, showing balanced hydration and electrolyte function. His calcium levels are also good, suggesting strong bones and muscle function. Overall, John's tests are all in the normal range. Just a reminder to keep up with a balanced diet, regular exercise, and routine checkups."
    
    # Default response for other navigation commands
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
        page_url = page_mapping.get(navigation_command, "/home")
        response_text = f"Navigate to {page_url}"

    audio_url = convert_to_speech(response_text)
    return jsonify({
        'text_response': response_text,
        'audio_url': audio_url,
        'navigate_to': page_url  # Include the URL for navigation in the response
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
