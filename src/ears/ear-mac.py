import speech_recognition as sr
import requests 
import subprocess
import time
from dotenv import load_dotenv
import os


URL = "https://kaibot.azurewebsites.net/api/comm-fn"

r = sr.Recognizer()
mic = sr.Microphone()
load_dotenv()

activatePhrase='howdy'
byePhrase='goodbye'
active = False
head_name = os.getenv("HEAD_NAME")

def say(text):
    subprocess.call(['say', text])


with mic as source:
    r.energy_threshold = 2000
    r.adjust_for_ambient_noise(source)

print('ready')

while True:   
    try:
        with mic as source:  
            #r.adjust_for_ambient_noise(source)
            audio = r.listen(source, phrase_time_limit=5)            
            transcript = r.recognize_google(audio)
            print(transcript)
            if not active and transcript.lower() == activatePhrase:
                active = True
                say('Howdy, how can I help you?')
            if transcript.lower() == byePhrase:
                say('See you later')
                break                
            if active:
                requests.post(url = URL, json = {"name":head_name, "message":transcript} ) 
                time.sleep(3)
            
    except sr.UnknownValueError:
        print(f"Sorry {head_name}, I don't understand you")
        #time.sleep(3)
        #pass