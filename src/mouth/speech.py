# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
# Based on https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/quickstart/python/text-to-speech/quickstart.py

import azure.cognitiveservices.speech as speechsdk
import os


class speech:
    def __init__(self):
        speech_key, service_region = os.environ.get("SPEECH_SERVICE_KEY"), os.environ.get("SPEECH_SERVICE_REGION")
        speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

        # Creates a speech synthesizer using the default speaker as audio output.
        self.speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

    def say(self, text):
        # Synthesizes the received text to speech.
        # The synthesized speech is expected to be heard on the speaker with this line executed.

        result = self.speech_synthesizer.speak_text_async(text).get()
        # Checks result.
        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print("Speech synthesized to speaker for text [{}]".format(text))
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print("Speech synthesis canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                if cancellation_details.error_details:
                    print("Error details: {}".format(cancellation_details.error_details))
            print("Did you update the subscription info?")


if __name__ == '__main__':
    test_speech = speech()
    test_speech.say("testing testing 1 2 3")
