import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models import db
from src.routes.user import user_bp
from src.routes.config import config_bp
from src.routes.content import content_bp
from src.routes.tracking import tracking_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Configurar CORS para permitir requisições do frontend
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"])

# Registrar blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(config_bp, url_prefix='/api')
app.register_blueprint(content_bp, url_prefix='/api')
app.register_blueprint(tracking_bp, url_prefix='/')

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Criar tabelas
with app.app_context():
    db.create_all()
    
    # Inicializar configurações padrão
    from src.models.config import BotConfig
    
    # Configurações padrão do bot
    default_configs = {
        'bot_name': 'Atual.bot',
        'bot_description': 'Plataforma Inteligente de Automação de Vagas e Notícias',
        'theme': 'dark',
        'adsense_publisher_id': '',
        'adsense_slot_id': '',
        'whatsapp_support_number': '',
        'estados_brasil': [
            'AC - Acre', 'AL - Alagoas', 'AP - Amapá', 'AM - Amazonas',
            'BA - Bahia', 'CE - Ceará', 'DF - Distrito Federal', 'ES - Espírito Santo',
            'GO - Goiás', 'MA - Maranhão', 'MT - Mato Grosso', 'MS - Mato Grosso do Sul',
            'MG - Minas Gerais', 'PA - Pará', 'PB - Paraíba', 'PR - Paraná',
            'PE - Pernambuco', 'PI - Piauí', 'RJ - Rio de Janeiro', 'RN - Rio Grande do Norte',
            'RS - Rio Grande do Sul', 'RO - Rondônia', 'RR - Roraima', 'SC - Santa Catarina',
            'SP - São Paulo', 'SE - Sergipe', 'TO - Tocantins'
        ],
        'ai_providers_available': [
            'ChatGPT-4o', 'ChatGPT-4 Turbo', 'ChatGPT-3.5 Turbo',
            'Gemini 1.5 Pro', 'Gemini 1.5 Flash',
            'Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku',
            'Llama 3', 'Mistral Large', 'Qwen (Tongyi Qianwen)',
            'Command R+', 'Perplexity Online', 'Manus'
        ]
    }
    
    for key, value in default_configs.items():
        existing = BotConfig.query.filter_by(key=key).first()
        if not existing:
            BotConfig.set_config(key, value)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
