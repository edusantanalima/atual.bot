from flask import Blueprint, request, redirect, render_template_string, jsonify
from src.models.content import db, ClickTracking
from src.models.config import BotConfig
from datetime import datetime
import urllib.parse

tracking_bp = Blueprint('tracking', __name__)

@tracking_bp.route('/track/<tracking_id>')
def track_click(tracking_id):
    """Processa clique com tracking e monetização"""
    try:
        # Buscar registro de tracking
        tracking = ClickTracking.query.filter_by(tracking_id=tracking_id).first()
        
        if not tracking:
            return "Link não encontrado", 404
        
        # Registrar informações do clique
        tracking.ip_address = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
        tracking.user_agent = request.headers.get('User-Agent', '')
        tracking.referrer = request.headers.get('Referer', '')
        tracking.clicked_at = datetime.utcnow()
        
        db.session.commit()
        
        # Verificar se AdSense está configurado
        adsense_publisher_id = BotConfig.get_config('adsense_publisher_id')
        adsense_slot_id = BotConfig.get_config('adsense_slot_id')
        
        if adsense_publisher_id and adsense_slot_id:
            # Mostrar página com anúncio
            return render_ad_page(tracking.original_url, tracking_id, adsense_publisher_id, adsense_slot_id)
        else:
            # Redirecionar diretamente
            return redirect(tracking.original_url)
            
    except Exception as e:
        print(f"Erro no tracking: {e}")
        return "Erro interno", 500

def render_ad_page(destination_url, tracking_id, publisher_id, slot_id):
    """Renderiza página com anúncio do AdSense"""
    
    # Determinar título baseado no conteúdo
    tracking = ClickTracking.query.filter_by(tracking_id=tracking_id).first()
    if tracking and tracking.job_post:
        title = f"Vaga: {tracking.job_post.title}"
    elif tracking and tracking.news_post:
        title = f"Notícia: {tracking.news_post.title}"
    else:
        title = "Conteúdo"
    
    html_template = f"""
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionando - Atual.bot</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow-x: hidden;
        }}
        
        /* Fundo animado */
        .animated-bg {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.1;
        }}
        
        .particle {{
            position: absolute;
            background: #00d4ff;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }}
        
        @keyframes float {{
            0%, 100% {{ transform: translateY(0px) rotate(0deg); }}
            50% {{ transform: translateY(-20px) rotate(180deg); }}
        }}
        
        .container {{
            max-width: 900px;
            width: 90%;
            background: rgba(26, 35, 50, 0.95);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.2);
            backdrop-filter: blur(10px);
        }}
        
        .header {{
            margin-bottom: 30px;
        }}
        
        .logo {{
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, #00d4ff, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }}
        
        .subtitle {{
            color: #a0a9b8;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }}
        
        .content-info {{
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin: 30px 0;
        }}
        
        .content-title {{
            font-size: 1.3rem;
            color: #00d4ff;
            margin-bottom: 10px;
        }}
        
        .timer {{
            font-size: 1.2rem;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 10px;
            color: #ff6b35;
        }}
        
        .ad-container {{
            min-height: 300px;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 2px dashed rgba(0, 212, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}
        
        .ad-placeholder {{
            color: #a0a9b8;
            font-size: 1.1rem;
            text-align: center;
        }}
        
        .continue-btn {{
            display: none;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        
        .continue-btn:hover {{
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
            background: linear-gradient(45deg, #0099cc, #00d4ff);
        }}
        
        .continue-btn:active {{
            transform: translateY(0);
        }}
        
        .footer {{
            margin-top: 30px;
            color: #6b7280;
            font-size: 0.9rem;
        }}
        
        /* Responsivo */
        @media (max-width: 768px) {{
            .container {{
                padding: 20px;
                margin: 20px;
            }}
            
            .logo {{
                font-size: 2rem;
            }}
            
            .subtitle {{
                font-size: 1rem;
            }}
        }}
    </style>
</head>
<body>
    <div class="animated-bg" id="particles"></div>
    
    <div class="container">
        <div class="header">
            <div class="logo">Atual.bot</div>
            <div class="subtitle">Plataforma Inteligente de Automação</div>
        </div>
        
        <div class="content-info">
            <div class="content-title">📋 {title}</div>
            <p>Você será redirecionado em instantes...</p>
        </div>
        
        <div class="timer" id="timer">
            ⏱️ Aguarde o carregamento do anúncio...
        </div>
        
        <div class="ad-container">
            <div class="ad-placeholder" id="ad-content">
                <p>🔄 Carregando anúncio...</p>
                <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">
                    Este espaço será preenchido com anúncios relevantes
                </p>
            </div>
            
            <!-- Aqui seria inserido o código real do AdSense -->
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={publisher_id}"
                 crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                 style="display:block; width: 100%; height: 250px;"
                 data-ad-client="{publisher_id}"
                 data-ad-slot="{slot_id}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({{}});
            </script>
        </div>
        
        <button id="continue-btn" class="continue-btn" onclick="continueToContent()">
            🚀 Continuar para o Conteúdo
        </button>
        
        <div class="footer">
            <p>Powered by Atual.bot • Desenvolvido por Edu Lima - Eco Hub Center</p>
        </div>
    </div>
    
    <script>
        // Criar partículas animadas
        function createParticles() {{
            const container = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {{
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = (Math.random() * 4 + 2) + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                container.appendChild(particle);
            }}
        }}
        
        // Simular carregamento do anúncio
        let countdown = 5;
        const timerElement = document.getElementById('timer');
        const continueBtn = document.getElementById('continue-btn');
        const adContent = document.getElementById('ad-content');
        
        function updateTimer() {{
            if (countdown > 0) {{
                timerElement.innerHTML = `⏱️ Redirecionamento em ${{countdown}} segundos...`;
                countdown--;
                setTimeout(updateTimer, 1000);
            }} else {{
                timerElement.innerHTML = '✅ Anúncio carregado com sucesso!';
                continueBtn.style.display = 'inline-block';
                adContent.innerHTML = `
                    <div style="text-align: center;">
                        <p style="color: #00d4ff; font-size: 1.1rem; margin-bottom: 10px;">📢 Anúncio Carregado</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">
                            O anúncio foi carregado com sucesso. Clique no botão abaixo para continuar.
                        </p>
                    </div>
                `;
            }}
        }}
        
        function continueToContent() {{
            window.location.href = '{destination_url}';
        }}
        
        // Inicializar
        createParticles();
        updateTimer();
        
        // Auto-redirect após 10 segundos se o usuário não clicar
        setTimeout(() => {{
            if (continueBtn.style.display === 'inline-block') {{
                continueToContent();
            }}
        }}, 10000);
    </script>
</body>
</html>
    """
    
    return html_template

@tracking_bp.route('/analytics/summary')
def analytics_summary():
    """Retorna resumo de analytics"""
    try:
        from datetime import timedelta
        
        # Últimos 30 dias
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        
        # Total de cliques
        total_clicks = ClickTracking.query.filter(
            ClickTracking.clicked_at >= thirty_days_ago
        ).count()
        
        # Cliques de vagas vs notícias
        job_clicks = ClickTracking.query.filter(
            ClickTracking.clicked_at >= thirty_days_ago,
            ClickTracking.job_post_id.isnot(None)
        ).count()
        
        news_clicks = ClickTracking.query.filter(
            ClickTracking.clicked_at >= thirty_days_ago,
            ClickTracking.news_post_id.isnot(None)
        ).count()
        
        # Cliques por dia (últimos 7 dias)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_clicks = ClickTracking.query.filter(
            ClickTracking.clicked_at >= seven_days_ago
        ).all()
        
        clicks_by_day = {{}}
        for click in recent_clicks:
            day = click.clicked_at.date().isoformat()
            clicks_by_day[day] = clicks_by_day.get(day, 0) + 1
        
        return jsonify({{
            'success': True,
            'data': {{
                'total_clicks_30d': total_clicks,
                'job_clicks_30d': job_clicks,
                'news_clicks_30d': news_clicks,
                'clicks_by_day_7d': clicks_by_day
            }}
        }})
    except Exception as e:
        return jsonify({{
            'success': False,
            'error': str(e)
        }}), 500

