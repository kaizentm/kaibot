import azure.cognitiveservices.speech as speechsdk
import os
import requests 
import time
from dotenv import load_dotenv

# Set up the subscription info for the Speech Service:
# Replace with your own subscription key and service region (e.g., "westus").
speech_key, service_region = os.environ.get("SPEECH_SERVICE_KEY"), os.environ.get("SPEECH_SERVICE_REGION")
URL = "https://kaibot.azurewebsites.net/api/comm-fn"
head_name = os.getenv("HEAD_NAME")

def speech_recognize_once_from_mic():
    """performs one-shot speech recognition from the default microphone"""
    # <SpeechRecognitionWithMicrophone>
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
    # Creates a speech recognizer using microphone as audio input.
    # The default language is "en-us".
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    # Starts speech recognition, and returns after a single utterance is recognized. The end of a
    # single utterance is determined by listening for silence at the end or until a maximum of 15
    # seconds of audio is processed. It returns the recognition text as result.
    # Note: Since recognize_once() returns only a single utterance, it is suitable only for single
    # shot recognition like command or query.
    # For long-running multi-utterance recognition, use start_continuous_recognition() instead.
    while True:   
        result = speech_recognizer.recognize_once()

        # Check the result
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print("Recognized: {}".format(result.text))
            transcript = result.text
            requests.post(url = URL, json = {"name":head_name, "message":transcript} ) 
            time.sleep(3)
        elif result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized")
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print("Speech Recognition canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print("Error details: {}".format(cancellation_details.error_details))
        # </SpeechRecognitionWithMicrophone>

speech_recognize_once_from_mic()