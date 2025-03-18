from modules.asr import ASR 
from modules.tts import TTS
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import soundfile as sf

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/api/home', methods=['GET'])
def get_message():
    return jsonify({"message": "Hello from Flask backend!"})

@app.route('/api/tts', methods=['POST'])
def tts():
    data = request.get_json()
    text = data.get("text", "")
    voice_preset = data.get("voice_preset", "v2/en_speaker_1")
    tts = TTS()
    
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    out_wav = tts.generate_audio(text, voice_preset)
    output_path = "output.wav"
    sf.write(output_path, out_wav, samplerate=24000)
    return send_file(output_path, as_attachment=True, mimetype="audio/wav")

@app.route('/api/asr',methods=['POST'])
def asr():
    audio = request.files['file']
    audio_path = 'audio.webm'
    audio.save(audio_path)

    asr = ASR()
    transcription = asr.transcribe(audio_path)

    return jsonify({"transcription": transcription})


if __name__ == '__main__':
    app.run(debug=True)
