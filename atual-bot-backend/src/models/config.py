from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class BotConfig(db.Model):
    __tablename__ = 'bot_config'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=True)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<BotConfig {self.key}: {self.value}>'
    
    @staticmethod
    def get_config(key, default=None):
        """Obtém uma configuração pelo key"""
        config = BotConfig.query.filter_by(key=key).first()
        if config:
            try:
                # Tenta fazer parse JSON se for um objeto/array
                return json.loads(config.value)
            except (json.JSONDecodeError, TypeError):
                # Se não for JSON válido, retorna como string
                return config.value
        return default
    
    @staticmethod
    def set_config(key, value, description=None):
        """Define uma configuração"""
        config = BotConfig.query.filter_by(key=key).first()
        
        # Converte para JSON se for dict/list
        if isinstance(value, (dict, list)):
            value_str = json.dumps(value)
        else:
            value_str = str(value)
        
        if config:
            config.value = value_str
            config.updated_at = datetime.utcnow()
            if description:
                config.description = description
        else:
            config = BotConfig(
                key=key,
                value=value_str,
                description=description
            )
            db.session.add(config)
        
        db.session.commit()
        return config

class AIProvider(db.Model):
    __tablename__ = 'ai_providers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    api_key = db.Column(db.String(500), nullable=True)
    model = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='offline')  # online, offline, error
    last_check = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<AIProvider {self.name}: {self.status}>'

class SocialAccount(db.Model):
    __tablename__ = 'social_accounts'
    
    id = db.Column(db.Integer, primary_key=True)
    platform = db.Column(db.String(50), nullable=False)  # whatsapp, facebook, telegram
    account_name = db.Column(db.String(200), nullable=True)
    api_key = db.Column(db.String(500), nullable=True)
    session_data = db.Column(db.Text, nullable=True)  # Para dados de sessão como cookies
    is_active = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='offline')  # online, offline, error
    last_check = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<SocialAccount {self.platform}: {self.status}>'

class Group(db.Model):
    __tablename__ = 'groups'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    platform = db.Column(db.String(50), nullable=False)  # whatsapp, facebook, telegram
    group_id = db.Column(db.String(500), nullable=False)  # ID único do grupo na plataforma
    link = db.Column(db.String(1000), nullable=True)
    member_count = db.Column(db.Integer, default=0)
    activity_score = db.Column(db.Float, default=0.0)  # Score de engajamento calculado pela IA
    is_active = db.Column(db.Boolean, default=True)
    auto_discovered = db.Column(db.Boolean, default=False)  # Se foi descoberto automaticamente
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Group {self.name} ({self.platform})>'

