from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class JobPost(db.Model):
    __tablename__ = 'job_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    company = db.Column(db.String(200), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    salary = db.Column(db.String(100), nullable=True)
    salary_min = db.Column(db.Float, nullable=True)  # Para filtros numéricos
    salary_max = db.Column(db.Float, nullable=True)
    description = db.Column(db.Text, nullable=True)
    requirements = db.Column(db.Text, nullable=True)
    job_type = db.Column(db.String(50), nullable=True)  # CLT, PJ, Temporário, etc.
    work_mode = db.Column(db.String(50), nullable=True)  # Presencial, Remoto, Híbrido
    experience_level = db.Column(db.String(50), nullable=True)  # Júnior, Pleno, Sênior
    source_url = db.Column(db.String(1000), nullable=True)
    source_name = db.Column(db.String(100), nullable=True)
    tracking_url = db.Column(db.String(1000), nullable=True)  # URL com tracking para monetização
    is_published = db.Column(db.Boolean, default=False)
    published_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    publications = db.relationship('Publication', backref='job_post', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<JobPost {self.title} - {self.company}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'location': self.location,
            'salary': self.salary,
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'description': self.description,
            'requirements': self.requirements,
            'job_type': self.job_type,
            'work_mode': self.work_mode,
            'experience_level': self.experience_level,
            'source_url': self.source_url,
            'source_name': self.source_name,
            'tracking_url': self.tracking_url,
            'is_published': self.is_published,
            'published_at': self.published_at.isoformat() if self.published_at else None,
            'created_at': self.created_at.isoformat()
        }

class NewsPost(db.Model):
    __tablename__ = 'news_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    content = db.Column(db.Text, nullable=True)
    source_url = db.Column(db.String(1000), nullable=False)
    source_name = db.Column(db.String(100), nullable=True)
    tracking_url = db.Column(db.String(1000), nullable=True)  # URL com tracking para monetização
    category = db.Column(db.String(100), nullable=True)
    tags = db.Column(db.Text, nullable=True)  # JSON array de tags
    is_published = db.Column(db.Boolean, default=False)
    published_at = db.Column(db.DateTime, nullable=True)
    original_published_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    publications = db.relationship('Publication', backref='news_post', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<NewsPost {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'summary': self.summary,
            'content': self.content,
            'source_url': self.source_url,
            'source_name': self.source_name,
            'tracking_url': self.tracking_url,
            'category': self.category,
            'tags': json.loads(self.tags) if self.tags else [],
            'is_published': self.is_published,
            'published_at': self.published_at.isoformat() if self.published_at else None,
            'original_published_at': self.original_published_at.isoformat() if self.original_published_at else None,
            'created_at': self.created_at.isoformat()
        }

class Publication(db.Model):
    __tablename__ = 'publications'
    
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    job_post_id = db.Column(db.Integer, db.ForeignKey('job_posts.id'), nullable=True)
    news_post_id = db.Column(db.Integer, db.ForeignKey('news_posts.id'), nullable=True)
    message_content = db.Column(db.Text, nullable=False)
    platform_message_id = db.Column(db.String(200), nullable=True)  # ID da mensagem na plataforma
    status = db.Column(db.String(50), default='pending')  # pending, sent, failed
    error_message = db.Column(db.Text, nullable=True)
    sent_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        content_type = 'job' if self.job_post_id else 'news'
        return f'<Publication {content_type} to group {self.group_id}>'

class ClickTracking(db.Model):
    __tablename__ = 'click_tracking'
    
    id = db.Column(db.Integer, primary_key=True)
    tracking_id = db.Column(db.String(100), unique=True, nullable=False)
    original_url = db.Column(db.String(1000), nullable=False)
    job_post_id = db.Column(db.Integer, db.ForeignKey('job_posts.id'), nullable=True)
    news_post_id = db.Column(db.Integer, db.ForeignKey('news_posts.id'), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=True)
    ip_address = db.Column(db.String(45), nullable=True)
    user_agent = db.Column(db.String(500), nullable=True)
    referrer = db.Column(db.String(1000), nullable=True)
    clicked_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<ClickTracking {self.tracking_id}>'

