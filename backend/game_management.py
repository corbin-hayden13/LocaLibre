from typing import TypeAlias
from flask import Flask
import sqlite3


Analytics: TypeAlias = dict[str, str | float]
Tags: TypeAlias = list[str]


app = Flask(__name__)

class UserProfile:
    def __init__(self,
        name: str, password: str=None,
        icon_path: str=None, user_tags: Tags=None,
        analytics: Analytics=None
    ):
        self.name: str = name
        self.password: str = password
        self.icon_path: str = icon_path
        self.user_tags: Tags = user_tags
        analytics: Analytics = analytics


class Game:
    def __init__(self,
        name: str, icon_path: str=None, 
        description: str=None, game_tags: Tags=None,
        users: list[str]=None, game_analytics: Analytics=None
    ):
        self.name: str = name
        self.icon_path: str = icon_path
        self.description: str = description
        self.game_tags: Tags = game_tags
        self.users: list[str] = users
        self.game_analytics: Analytics = game_analytics


@app.post("/api/add-user")
def add_user(new_user):
    return {}


@app.post("/api/add-game")
def add_game(new_game):
    return {}


@app.get("/api/get-games")
def get_games(user: str):
    return {}


@app.post("/api/launch-game-server")
def launch_game_server(game_name: str):
    return {}


@app.post("/api/on-game-close")
def on_game_close(game_name: str):
    return {}