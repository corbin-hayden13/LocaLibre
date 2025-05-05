from sqlite3 import Error as SqlError, Connection, Cursor
import sqlite3

from datetime import datetime

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


def connect_to_db() -> tuple[Connection | None, str]:
    try:
        return sqlite3.connect(DB_FILE_NAME), ""
    
    except SqlError as e:
        error_msg: str = f"Error connecting to the database: {e}"
        print(error_msg)
        return None, error_msg


def setup_database() -> tuple[bool, str]:
    db_conn: Connection
    error_msg: str
    db_conn, error_msg = connect_to_db()

    if not db_conn: return False, error_msg

    try:
        cursor: Cursor = db_conn.cursor()
        cursor.execute(CREATE_GAME_DATA_SQL)
        db_conn.commit()
    
    except SqlError as e:
        error_msg = f"Error creating the {GAME_TABLE_NAME} table: {e}"
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
        error_msg: str = f"Error adding a game: {e}"
        print(error_msg)
        return False, error_msg
    
    return True, ""
