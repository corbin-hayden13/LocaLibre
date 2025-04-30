from typing import TypeAlias
import tkinter as tk
from tkinter import filedialog
import threading
import os

from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins="*")


@app.route("/api/debug", methods=["GET"])
def debug_connection():
    print("Request was received!")
    return jsonify({"status": "success", "payload": "This is the debug api to test that the server is up and running"})


@app.route("/api/find-game-files", methods=["GET"])
def pick_game_folder():
    selected = {}

    def run_dialog():
        root = tk.Tk()
        root.withdraw()
        selected["path"] = filedialog.askdirectory()

    file_picker_thread = threading.Thread(target=run_dialog)
    file_picker_thread.start()
    file_picker_thread.join()

    path = selected.get("path")
    if path:
        return jsonify({ "status": "success", "folderPath": path })
    else:
        return jsonify({ "status": "failure" }), 400


if __name__ == "__main__":
    port: int = int(os.environ.get("REACT_APP_SERVER_PORT", 8000))
    app.run(debug=True, port=port)