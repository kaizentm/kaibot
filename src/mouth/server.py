from datetime import datetime
from flask import Flask, request
from flask_json import FlaskJSON, JsonError, json_response, as_json

from speech import speech

app = Flask(__name__)
FlaskJSON(app)

tts = speech()


@app.route('/say', methods=['POST'])
def say():
    # We use 'force' to skip mimetype checking to have shorter curl command.
    data = request.get_json(force=True)
    try:
        message = str(data['message'])
    except (KeyError, TypeError, ValueError):
        return json_response(status_=400, status="Failed: Invalid message")

    # Say the message
    tts.say(message)

    return json_response(status="OK")


if __name__ == '__main__':
    app.run()
