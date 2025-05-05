import subprocess
import uuid
import base64
import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from pydantic import ValidationError

from common import GameData, generate_game_uuid
from database import connect_to_db, add_game_db, setup_database


app = Flask(__name__)
CORS(app, origins="*")


@app.route("/api/debug", methods=["GET"])
def debug_connection():
    print("Request was received!")
    return jsonify({"status": "success", "payload": "This is the debug api to test that the server is up and running"})


@app.route("/api/add-game", methods=["POST"])
def add_game_to_database():
    try:
        json_data = request.get_json()
        game_data = GameData(**json_data)

        # Query database for duplicate name

        # Generate game UID
        game_data.gameUID = generate_game_uuid()

        # Save to database
        error_msg: str
        db_conn, error_msg = connect_to_db()

        if not db_conn:
            return jsonify({"staus": "add game error", "errors": error_msg}), 400

        add_game_success: bool
        add_game_success, error_msg = add_game_db(db_conn, game_data)

        # Return status of add to database
        if add_game_success:
            return jsonify({"status": "success", "gameUID": game_data.gameUID}), 200

        else:
            return jsonify({"staus": "add game error", "errors": error_msg}), 400

    except ValidationError as e:
        return jsonify({"staus": "add game error", "errors": e.errors()}), 400
    

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
    setup_database()

    port: int = int(os.environ.get("REACT_APP_SERVER_PORT", 8000))
    app.run(debug=True, port=port)