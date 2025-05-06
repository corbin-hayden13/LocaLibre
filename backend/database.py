from sqlite3 import Error as SqlError, Connection, Cursor, Row
import sqlite3

from datetime import datetime
import json

from common import GameData


DB_FILE_NAME: str = "localibre.db"

GAME_TABLE_NAME: str = "Games"
CREATE_GAME_DATA_SQL: str = f"""
CREATE TABLE IF NOT EXISTS {GAME_TABLE_NAME} (
    gameUID TEXT PRIMARY KEY,
    displayName TEXT NOT NULL,
    gamePath TEXT NOT NULL,
    coverImagePath TEXT,
    dateAdded TEXT NOT NULL,
    releaseDate TEXT,
    version TEXT,
    genre TEXT,
    description TEXT,
    developer TEXT,
    tags TEXT,
    collections TEXT
);
"""
ADD_GAME_SQL: str = f"""
INSERT INTO games (
    gameUID, displayName, gamePath, coverImagePath,
    dateAdded, releaseDate, version, genre,
    description, developer, tags, collections
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
"""
GET_GAME_BY_UUID: str = f"""
SELECT * FROM {GAME_TABLE_NAME} WHERE gameUID = ? LIMIT 1;
"""


def connect_to_db() -> tuple[Connection | None, str]:
    try:
        return sqlite3.connect(DB_FILE_NAME), ""
    
    except SqlError as e:
        error_msg: str = f"SQL Error connecting to the database: {e}"
        print(error_msg)
        return None, error_msg
    

def setup_database(db_conn: Connection) -> tuple[bool, str]:
    try:
        cursor: Cursor = db_conn.cursor()
        cursor.execute(CREATE_GAME_DATA_SQL)
        db_conn.commit()
    
    except SqlError as e:
        error_msg: str = f"SQL Error creating the {GAME_TABLE_NAME} table: {e}"
        print(error_msg)
        return False, error_msg
    
    return True, ""


def add_game_db(db_conn: Connection, game_data: GameData) -> tuple[bool, str]:
    try:
        cursor: Cursor = db_conn.cursor()
        cursor.execute(ADD_GAME_SQL, (
            game_data.gameUID,
            game_data.displayName,
            game_data.gamePath,
            game_data.dateAdded,
            game_data.coverImagePath,
            game_data.releaseDate,
            game_data.version,
            game_data.genre,
            game_data.description,
            game_data.developer,
            ",".join(game_data.tags),
            ",".join(game_data.collections),
        ))

        db_conn.commit()

    except SqlError as e:
        error_msg: str = f"SQL Error adding a game: {e}"
        print(error_msg)
        return False, error_msg
    
    return True, ""


def get_game_by_uuid_db(db_conn: Connection, game_uuid: str) -> tuple[GameData | None, str]:
    error_msg: str
    row_dict: dict
    row_data: any

    try:
        cursor: Cursor = db_conn.cursor()
        cursor.execute(GET_GAME_BY_UUID, (game_uuid,))
        row_data = cursor.fetchone()

        if not row_data:
            raise SqlError(f"game with uuid={game_uuid} was not found")

    except SqlError as e:
        error_msg = f"SQL Error finding game by UID: {e}"
        print(error_msg)
        return None, error_msg

    try:
        row_dict = dict(row_data)

        # Need to manually clean some fields
        if not row_dict["dateAdded"]:
            row_dict["dateAdded"] = datetime.now()
        else:
            row_dict["dateAdded"] = datetime.fromisoformat(row_dict["dateAdded"])

        # Fix releaseDate if needed
        if row_dict.get("releaseDate"):
            row_dict["releaseDate"] = datetime.fromisoformat(row_dict["releaseDate"])
        else:
            row_dict["releaseDate"] = None

        # Fix tags and collections
        for field in ["tags", "collections"]:
            if row_dict.get(field) in ("", None):
                row_dict[field] = []
            elif isinstance(row_dict[field], str):
                row_dict[field] = row_dict[field].split(",")

        return GameData(**row_dict), ""

    except Exception as e:
        error_msg = f"Error converting row data to GameData: {e}"
        error_msg += f"\nrow_dict={row_dict}"
        print(error_msg)
        return None, error_msg
