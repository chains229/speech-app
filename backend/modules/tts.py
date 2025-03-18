from transformers import AutoProcessor, BarkModel

class TTS:
    def __init__(self):
        self.processor = AutoProcessor.from_pretrained("suno/bark")
        self.model = BarkModel.from_pretrained("suno/bark")

    def generate_audio(self, text, voice_preset):
        inputs = self.processor(text, voice_preset=voice_preset)
        audio_array = self.model.generate(**inputs)
        audio_array = audio_array.cpu().numpy().squeeze()
        return audio_array
