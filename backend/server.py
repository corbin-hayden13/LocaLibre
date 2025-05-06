import subprocess
import os

from flask import g, Flask, jsonify, request
from flask_cors import CORS
from pydantic import ValidationError

from common import GameData, generate_game_uuid
from database import (
    Connection, Row,
    connect_to_db, add_game_db, setup_database,
    get_game_by_uuid_db
)


app = Flask(__name__)
CORS(app, origins="*")


def get_db_conn() -> tuple[Connection | None, str]:
    db_conn: Connection | None
    error_msg: str

    if "db" not in g:
        db_conn, error_msg = connect_to_db()

        if not db_conn:
            return None, error_msg
        
        g.db = db_conn
        g.db.row_factory = Row

    return g.db, ""


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
        db_conn, error_msg = get_db_conn()

        if not db_conn:
            return jsonify({"staus": "add game error", "errors": error_msg}), 400

        add_game_success: bool
        add_game_success, error_msg = add_game_db(db_conn, game_data)

        # Return status of add to database
        if add_game_success:
            return jsonify({"status": "success", "gameData": game_data.model_dump()}), 200

        else:
            return jsonify({"staus": "add game error", "errors": error_msg}), 400

    except ValidationError as e:
        return jsonify({"staus": "add game error", "errors": e.errors()}), 400
    

@app.route("/test/get-game-by-uuid", methods=["GET"])
def test_get_game_by_uuid():
    db_conn: Connection
    game_data: GameData | None
    error_msg: str

    db_conn, error_msg = get_db_conn()

    if not db_conn:
        return jsonify({"staus": "get game error", "errors": error_msg}), 400

    game_uuid: str = request.args.get("gameUID", "")
    game_data, error_msg = get_game_by_uuid_db(g.db, game_uuid)

    if not game_data:
        return jsonify({"staus": "get game error", "errors": error_msg}), 400
    
    else:
        return jsonify({"status": "success", "gameData": game_data.model_dump()}), 200
    

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
    

@app.teardown_appcontext
def on_app_close(exception):
    # Close the database connection
    db: Connection | None = g.pop("db", None)
    if db is not None:
        db.close()


if __name__ == "__main__":
    db_conn: Connection
    error_msg: str

    port: int = int(os.environ.get("REACT_APP_SERVER_PORT", 8000))
    app.run(debug=True, port=port)

    db_conn, error_msg = get_db_conn()
    setup_database(db_conn)