from flask import Flask, render_template, request, jsonify, send_from_directory
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv
