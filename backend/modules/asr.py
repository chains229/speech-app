from transformers import pipeline
import subprocess
import os

class ASR:
    def __init__(self):
        self.transcriber = pipeline("automatic-speech-recognition", model="vinai/PhoWhisper-tiny", device="cpu")

    def transcribe(self, webm_path):
        """
        Converts a .webm file to .wav and transcribes it.
        Cleans up the .wav file after transcription.

        :param webm_path: Path to the .webm audio file
        :return: Transcription result
        """
        # Ensure the input file exists
        if not os.path.exists(webm_path):
            raise FileNotFoundError(f"File not found: {webm_path}")

        # Correctly replace extension
        wav_path = os.path.splitext(webm_path)[0] + ".wav"

        # FFmpeg command to convert WebM to WAV
        command = [
            "ffmpeg", "-i", webm_path, "-ac", "1", "-ar", "16000",
            "-acodec", "pcm_s16le", wav_path, "-y"
        ]

        try:
            # Run FFmpeg to convert the file
            subprocess.run(command, check=True)

            # Transcribe the audio
            result = self.transcriber(wav_path)

            # Delete the converted WAV file to free up space
            os.remove(wav_path)

            return result['text']  # Return the transcription

        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"FFmpeg conversion failed: {e}")

        except Exception as e:
            raise RuntimeError(f"Transcription failed: {e}")
