from flask import Blueprint, request, jsonify
from src.models.content import db, JobPost, NewsPost, Publication, ClickTracking
from src.models.config import Group
from datetime import datetime
import uuid
import json

content_bp = Blueprint('content', __name__)

@content_bp.route('/jobs', methods=['GET'])
def get_jobs():
    """Lista todas as vagas"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Filtros
        location = request.args.get('location')
        salary_min = request.args.get('salary_min', type=float)
        job_type = request.args.get('job_type')
        work_mode = request.args.get('work_mode')
        experience_level = request.args.get('experience_level')
        
        query = JobPost.query
        
        # Aplicar filtros
        if location:
            query = query.filter(JobPost.location.ilike(f'%{location}%'))
        if salary_min:
            query = query.filter(JobPost.salary_min >= salary_min)
        if job_type:
            query = query.filter(JobPost.job_type == job_type)
        if work_mode:
            query = query.filter(JobPost.work_mode == work_mode)
        if experience_level:
            query = query.filter(JobPost.experience_level == experience_level)
        
        # Ordenar por mais recentes
        query = query.order_by(JobPost.created_at.desc())
        
        # Paginação
        jobs = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        result = {
            'jobs': [job.to_dict() for job in jobs.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': jobs.total,
                'pages': jobs.pages,
                'has_next': jobs.has_next,
                'has_prev': jobs.has_prev
            }
        }
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/jobs', methods=['POST'])
def create_job():
    """Cria uma nova vaga"""
    try:
        data = request.get_json()
        
        # Campos obrigatórios
        if not data.get('title'):
            return jsonify({
                'success': False,
                'error': 'Título é obrigatório'
            }), 400
        
        job = JobPost(
            title=data.get('title'),
            company=data.get('company'),
            location=data.get('location'),
            salary=data.get('salary'),
            salary_min=data.get('salary_min'),
            salary_max=data.get('salary_max'),
            description=data.get('description'),
            requirements=data.get('requirements'),
            job_type=data.get('job_type'),
            work_mode=data.get('work_mode'),
            experience_level=data.get('experience_level'),
            source_url=data.get('source_url'),
            source_name=data.get('source_name')
        )
        
        # Gerar URL de tracking se tiver URL original
        if job.source_url:
            tracking_id = str(uuid.uuid4())
            job.tracking_url = f"/track/{tracking_id}"
            
            # Criar registro de tracking
            tracking = ClickTracking(
                tracking_id=tracking_id,
                original_url=job.source_url,
                job_post_id=job.id
            )
            db.session.add(tracking)
        
        db.session.add(job)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Vaga criada com sucesso',
            'data': job.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/news', methods=['GET'])
def get_news():
    """Lista todas as notícias"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Filtros
        category = request.args.get('category')
        source = request.args.get('source')
        
        query = NewsPost.query
        
        # Aplicar filtros
        if category:
            query = query.filter(NewsPost.category == category)
        if source:
            query = query.filter(NewsPost.source_name.ilike(f'%{source}%'))
        
        # Ordenar por mais recentes
        query = query.order_by(NewsPost.created_at.desc())
        
        # Paginação
        news = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        result = {
            'news': [article.to_dict() for article in news.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': news.total,
                'pages': news.pages,
                'has_next': news.has_next,
                'has_prev': news.has_prev
            }
        }
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/news', methods=['POST'])
def create_news():
    """Cria uma nova notícia"""
    try:
        data = request.get_json()
        
        # Campos obrigatórios
        if not data.get('title') or not data.get('source_url'):
            return jsonify({
                'success': False,
                'error': 'Título e URL da fonte são obrigatórios'
            }), 400
        
        news = NewsPost(
            title=data.get('title'),
            summary=data.get('summary'),
            content=data.get('content'),
            source_url=data.get('source_url'),
            source_name=data.get('source_name'),
            category=data.get('category'),
            tags=json.dumps(data.get('tags', [])),
            original_published_at=datetime.fromisoformat(data['original_published_at']) if data.get('original_published_at') else None
        )
        
        # Gerar URL de tracking
        tracking_id = str(uuid.uuid4())
        news.tracking_url = f"/track/{tracking_id}"
        
        # Criar registro de tracking
        tracking = ClickTracking(
            tracking_id=tracking_id,
            original_url=news.source_url,
            news_post_id=news.id
        )
        
        db.session.add(news)
        db.session.add(tracking)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Notícia criada com sucesso',
            'data': news.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/publish', methods=['POST'])
def publish_content():
    """Publica conteúdo em grupos selecionados"""
    try:
        data = request.get_json()
        content_type = data.get('content_type')  # 'job' ou 'news'
        content_id = data.get('content_id')
        group_ids = data.get('group_ids', [])
        
        if not all([content_type, content_id, group_ids]):
            return jsonify({
                'success': False,
                'error': 'Tipo de conteúdo, ID e grupos são obrigatórios'
            }), 400
        
        # Verificar se o conteúdo existe
        if content_type == 'job':
            content = JobPost.query.get(content_id)
        elif content_type == 'news':
            content = NewsPost.query.get(content_id)
        else:
            return jsonify({
                'success': False,
                'error': 'Tipo de conteúdo inválido'
            }), 400
        
        if not content:
            return jsonify({
                'success': False,
                'error': 'Conteúdo não encontrado'
            }), 404
        
        # Criar publicações para cada grupo
        publications = []
        for group_id in group_ids:
            group = Group.query.get(group_id)
            if not group or not group.is_active:
                continue
            
            # Gerar mensagem formatada
            if content_type == 'job':
                message = self._format_job_message(content)
            else:
                message = self._format_news_message(content)
            
            publication = Publication(
                group_id=group_id,
                job_post_id=content_id if content_type == 'job' else None,
                news_post_id=content_id if content_type == 'news' else None,
                message_content=message,
                status='pending'
            )
            
            db.session.add(publication)
            publications.append(publication)
        
        # Marcar conteúdo como publicado
        content.is_published = True
        content.published_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Conteúdo agendado para publicação em {len(publications)} grupos',
            'data': {
                'publications_created': len(publications)
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/publications', methods=['GET'])
def get_publications():
    """Lista todas as publicações"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        
        query = Publication.query
        
        if status:
            query = query.filter(Publication.status == status)
        
        query = query.order_by(Publication.created_at.desc())
        
        publications = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        result = []
        for pub in publications.items:
            pub_data = {
                'id': pub.id,
                'group_id': pub.group_id,
                'group_name': pub.group.name if pub.group else None,
                'platform': pub.group.platform if pub.group else None,
                'status': pub.status,
                'error_message': pub.error_message,
                'sent_at': pub.sent_at.isoformat() if pub.sent_at else None,
                'created_at': pub.created_at.isoformat(),
                'content_type': 'job' if pub.job_post_id else 'news',
                'content_title': pub.job_post.title if pub.job_post else (pub.news_post.title if pub.news_post else None)
            }
            result.append(pub_data)
        
        return jsonify({
            'success': True,
            'data': {
                'publications': result,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': publications.total,
                    'pages': publications.pages,
                    'has_next': publications.has_next,
                    'has_prev': publications.has_prev
                }
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@content_bp.route('/analytics/clicks', methods=['GET'])
def get_click_analytics():
    """Obtém analytics de cliques"""
    try:
        # Parâmetros de filtro
        days = request.args.get('days', 30, type=int)
        content_type = request.args.get('content_type')  # 'job' ou 'news'
        
        # Query base
        query = ClickTracking.query
        
        # Filtrar por período
        from datetime import timedelta
        start_date = datetime.utcnow() - timedelta(days=days)
        query = query.filter(ClickTracking.clicked_at >= start_date)
        
        # Filtrar por tipo de conteúdo
        if content_type == 'job':
            query = query.filter(ClickTracking.job_post_id.isnot(None))
        elif content_type == 'news':
            query = query.filter(ClickTracking.news_post_id.isnot(None))
        
        clicks = query.all()
        
        # Estatísticas básicas
        total_clicks = len(clicks)
        
        # Cliques por dia
        clicks_by_day = {}
        for click in clicks:
            day = click.clicked_at.date().isoformat()
            clicks_by_day[day] = clicks_by_day.get(day, 0) + 1
        
        # Cliques por grupo
        clicks_by_group = {}
        for click in clicks:
            if click.group_id:
                group_name = click.group.name if click.group else f"Grupo {click.group_id}"
                clicks_by_group[group_name] = clicks_by_group.get(group_name, 0) + 1
        
        return jsonify({
            'success': True,
            'data': {
                'total_clicks': total_clicks,
                'period_days': days,
                'clicks_by_day': clicks_by_day,
                'clicks_by_group': clicks_by_group
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def _format_job_message(job):
    """Formata mensagem de vaga para publicação"""
    message = f"""💼 *NOVA VAGA DE EMPREGO*

📋 *{job.title}*
🏢 {job.company or 'Empresa não informada'}
📍 {job.location or 'Localização não informada'}"""
    
    if job.salary:
        message += f"\n💰 {job.salary}"
    
    if job.work_mode:
        message += f"\n🏠 {job.work_mode}"
    
    if job.job_type:
        message += f"\n📄 {job.job_type}"
    
    message += f"\n\n👉 *Clique aqui para se candidatar:*\n{job.tracking_url or job.source_url}"
    
    return message

def _format_news_message(news):
    """Formata mensagem de notícia para publicação"""
    message = f"""📰 *NOTÍCIA MUNDIAL*

📋 *{news.title}*"""
    
    if news.summary:
        message += f"\n\n📝 {news.summary[:200]}{'...' if len(news.summary) > 200 else ''}"
    
    if news.source_name:
        message += f"\n\n🏢 Fonte: {news.source_name}"
    
    message += f"\n\n👉 *Leia mais:*\n{news.tracking_url or news.source_url}"
    
    return message

