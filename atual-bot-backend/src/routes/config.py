from flask import Blueprint, request, jsonify
from src.models.config import db, BotConfig, AIProvider, SocialAccount, Group
from datetime import datetime
import json

config_bp = Blueprint('config', __name__)

@config_bp.route('/config', methods=['GET'])
def get_all_configs():
    """Obtém todas as configurações"""
    try:
        configs = BotConfig.query.all()
        result = {}
        for config in configs:
            try:
                result[config.key] = json.loads(config.value)
            except (json.JSONDecodeError, TypeError):
                result[config.key] = config.value
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/config/<key>', methods=['GET'])
def get_config(key):
    """Obtém uma configuração específica"""
    try:
        value = BotConfig.get_config(key)
        return jsonify({
            'success': True,
            'data': {
                'key': key,
                'value': value
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/config/<key>', methods=['POST'])
def set_config(key):
    """Define uma configuração"""
    try:
        data = request.get_json()
        value = data.get('value')
        description = data.get('description')
        
        BotConfig.set_config(key, value, description)
        
        return jsonify({
            'success': True,
            'message': f'Configuração {key} atualizada com sucesso'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/ai-providers', methods=['GET'])
def get_ai_providers():
    """Lista todos os provedores de IA"""
    try:
        providers = AIProvider.query.all()
        result = []
        for provider in providers:
            result.append({
                'id': provider.id,
                'name': provider.name,
                'model': provider.model,
                'is_active': provider.is_active,
                'status': provider.status,
                'last_check': provider.last_check.isoformat() if provider.last_check else None,
                'has_api_key': bool(provider.api_key)
            })
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/ai-providers', methods=['POST'])
def create_ai_provider():
    """Cria ou atualiza um provedor de IA"""
    try:
        data = request.get_json()
        name = data.get('name')
        api_key = data.get('api_key')
        model = data.get('model')
        
        if not name:
            return jsonify({
                'success': False,
                'error': 'Nome do provedor é obrigatório'
            }), 400
        
        # Verificar se já existe
        provider = AIProvider.query.filter_by(name=name).first()
        
        if provider:
            # Atualizar existente
            if api_key:
                provider.api_key = api_key
            if model:
                provider.model = model
            provider.status = 'offline'  # Resetar status para nova verificação
        else:
            # Criar novo
            provider = AIProvider(
                name=name,
                api_key=api_key,
                model=model,
                status='offline'
            )
            db.session.add(provider)
        
        # Se este for marcado como ativo, desativar outros
        if data.get('is_active'):
            AIProvider.query.update({'is_active': False})
            provider.is_active = True
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Provedor {name} configurado com sucesso',
            'data': {
                'id': provider.id,
                'name': provider.name,
                'model': provider.model,
                'is_active': provider.is_active,
                'status': provider.status
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/social-accounts', methods=['GET'])
def get_social_accounts():
    """Lista todas as contas sociais"""
    try:
        accounts = SocialAccount.query.all()
        result = []
        for account in accounts:
            result.append({
                'id': account.id,
                'platform': account.platform,
                'account_name': account.account_name,
                'is_active': account.is_active,
                'status': account.status,
                'last_check': account.last_check.isoformat() if account.last_check else None,
                'has_credentials': bool(account.api_key or account.session_data)
            })
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/social-accounts', methods=['POST'])
def create_social_account():
    """Cria ou atualiza uma conta social"""
    try:
        data = request.get_json()
        platform = data.get('platform')
        account_name = data.get('account_name')
        api_key = data.get('api_key')
        
        if not platform:
            return jsonify({
                'success': False,
                'error': 'Plataforma é obrigatória'
            }), 400
        
        # Verificar se já existe para esta plataforma
        account = SocialAccount.query.filter_by(platform=platform).first()
        
        if account:
            # Atualizar existente
            if account_name:
                account.account_name = account_name
            if api_key:
                account.api_key = api_key
            account.status = 'offline'  # Resetar status para nova verificação
        else:
            # Criar novo
            account = SocialAccount(
                platform=platform,
                account_name=account_name,
                api_key=api_key,
                status='offline'
            )
            db.session.add(account)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Conta {platform} configurada com sucesso',
            'data': {
                'id': account.id,
                'platform': account.platform,
                'account_name': account.account_name,
                'status': account.status
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/groups', methods=['GET'])
def get_groups():
    """Lista todos os grupos"""
    try:
        groups = Group.query.all()
        result = []
        for group in groups:
            result.append({
                'id': group.id,
                'name': group.name,
                'platform': group.platform,
                'group_id': group.group_id,
                'link': group.link,
                'member_count': group.member_count,
                'activity_score': group.activity_score,
                'is_active': group.is_active,
                'auto_discovered': group.auto_discovered,
                'created_at': group.created_at.isoformat()
            })
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/groups', methods=['POST'])
def create_group():
    """Adiciona um novo grupo"""
    try:
        data = request.get_json()
        name = data.get('name')
        platform = data.get('platform')
        group_id = data.get('group_id')
        link = data.get('link')
        
        if not all([name, platform, group_id]):
            return jsonify({
                'success': False,
                'error': 'Nome, plataforma e ID do grupo são obrigatórios'
            }), 400
        
        # Verificar se já existe
        existing = Group.query.filter_by(platform=platform, group_id=group_id).first()
        if existing:
            return jsonify({
                'success': False,
                'error': 'Grupo já existe para esta plataforma'
            }), 400
        
        group = Group(
            name=name,
            platform=platform,
            group_id=group_id,
            link=link,
            member_count=data.get('member_count', 0),
            activity_score=data.get('activity_score', 0.0),
            is_active=data.get('is_active', True),
            auto_discovered=data.get('auto_discovered', False)
        )
        
        db.session.add(group)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Grupo adicionado com sucesso',
            'data': {
                'id': group.id,
                'name': group.name,
                'platform': group.platform,
                'group_id': group.group_id
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/groups/<int:group_id>', methods=['PUT'])
def update_group(group_id):
    """Atualiza um grupo"""
    try:
        group = Group.query.get_or_404(group_id)
        data = request.get_json()
        
        # Atualizar campos permitidos
        if 'name' in data:
            group.name = data['name']
        if 'is_active' in data:
            group.is_active = data['is_active']
        if 'member_count' in data:
            group.member_count = data['member_count']
        if 'activity_score' in data:
            group.activity_score = data['activity_score']
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Grupo atualizado com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@config_bp.route('/groups/<int:group_id>', methods=['DELETE'])
def delete_group(group_id):
    """Remove um grupo"""
    try:
        group = Group.query.get_or_404(group_id)
        db.session.delete(group)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Grupo removido com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

