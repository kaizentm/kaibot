# Mouth service

## Overview

A flask server that takes a JSON:

{"message": "testing testing 1 2 3"}

Uses Azure Cognitive Services to do text to speech, and then returns a JSON status:

{"status": "ok"}

# Usage

Package requirements: flask, flask-json, azure-cognitiveservices-speech

You will need the cognitive services key in an environment var named SPEECH_SERVICE_KEY, and the Azure region in SPEECH_SERVICE_REGION e.g. "westus"
