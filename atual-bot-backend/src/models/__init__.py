from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Importar todos os modelos para garantir que sejam registrados
from .user import User
from .config import BotConfig, AIProvider, SocialAccount, Group
from .content import JobPost, NewsPost, Publication, ClickTracking

