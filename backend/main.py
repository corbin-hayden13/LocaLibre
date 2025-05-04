import subprocess
import os

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins="*")


@app.route("/api/debug", methods=["GET"])
def debug_connection():
    print("Request was received!")
    return jsonify({"status": "success", "payload": "This is the debug api to test that the server is up and running"})
    

@app.route("/api/find-game-files", methods=["GET"])
def pick_game_folder():
    """
    Used to get an absolute folder path from file explorer / finder,
        bypassing browser security to restrict access to full file paths.
    """
    # Hack to allow running server standalone vs concurrently
    backend_folder_prefix: str = request.args.get("prefix", "")
    script_path: str = os.path.join(backend_folder_prefix, "file_explorer_dialog.py")

    tkinter_process = subprocess.Popen(["python3", script_path],
                                       stdout=subprocess.PIPE,
                                       stderr=subprocess.PIPE)
    
    stdout, stderr = tkinter_process.communicate()
    folder_path: str = stdout.decode("utf-8").strip()

    if folder_path:
        print(f"folder path: {folder_path}")
        return jsonify({ "status": "success", "folderPath": folder_path })
    else:
        return jsonify({ "status": "failure", "errorMessage": stderr.decode("utf-8") }), 400


if __name__ == "__main__":
    port: int = int(os.environ.get("REACT_APP_SERVER_PORT", 8000))
    app.run(debug=True, port=port)