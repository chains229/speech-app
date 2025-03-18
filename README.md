I created an app for TTS (using suno-ai/bark) and ASR (using phoWhisper). My biggest goal in this project is to learn ReactJS. I think this app is cringe.

# Usage


## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js and npm (for React frontend)
- Python 3.7+ (for Flask backend)
- Git (optional, for cloning the repository)

## Setting Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (optional but recommended):
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   pip install git+https://github.com/suno-ai/bark.git
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

   The backend server will run on `http://127.0.0.1:5000`.

## Setting Up the Frontend

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

## Using the Application

1. Open your web browser and go to `http://localhost:3000`.

2. The application has three main pages:
   - **Home Page**: Landing page with general information
   - **Text to Speech**: Convert text input to spoken audio
   - **Speech Recognition**: Record your voice and convert it to text
