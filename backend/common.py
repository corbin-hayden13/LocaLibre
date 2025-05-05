from typing import TypeAlias, Optional, List, Union
from dataclasses import dataclass, fields
from datetime import datetime
import base64
import uuid

from pydantic import BaseModel


Analytics: TypeAlias = dict[str, str | float]
Tags: TypeAlias = list[str]


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


class GameData(BaseModel):
    gameUID: Optional[str] = ""
    displayName: str
    gamePath: str
    dateAdded: datetime

    coverImagePath: Optional[str] = ""
    releaseDate: Optional[datetime] = datetime.now()
    version: Optional[str] = ""
    genre: Optional[str] = ""
    description: Optional[str] = ""
    developer: Optional[str] = ""
    tags: Optional[List[str]] = []
    collections: Optional[List[str]] = []


def generate_game_uuid() -> str:
    _random_uuid = uuid.uuid4()
    _base64_uuid = base64.urlsafe_b64encode(_random_uuid.bytes)
    _url_safe_uuid = _base64_uuid.decode("ascii").rstrip("=")
    return str(_url_safe_uuid)