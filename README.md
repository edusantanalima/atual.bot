# Atual.bot - Plataforma Inteligente de Automação

![Atual.bot Logo](https://img.shields.io/badge/Atual.bot-v2.0%20Pro-blue?style=for-the-badge&logo=robot)
![Python](https://img.shields.io/badge/Python-3.11+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-2.3+-red?style=for-the-badge&logo=flask)

## 🚀 Visão Geral

O **Atual.bot** é uma plataforma inteligente de automação para coleta e distribuição de vagas de emprego e notícias em redes sociais. Desenvolvido com tecnologias modernas, oferece uma interface futurista com design "Cyber-Glow" e funcionalidades avançadas de IA.

### ✨ Principais Funcionalidades

- 🤖 **Inteligência Artificial Configurável** - Suporte a 14+ provedores (ChatGPT, Gemini, Claude, etc.)
- 📱 **Automação Multi-Plataforma** - WhatsApp, Facebook, Telegram
- 🎯 **Filtros Avançados** - Todos os 27 estados do Brasil, salário, categoria
- 📊 **Analytics Completo** - Dashboard com métricas em tempo real
- 💰 **Monetização Integrada** - Google AdSense configurável
- 🎨 **Interface Moderna** - Design Cyber-Glow com temas claro/escuro
- 🤝 **Meta-Assistente** - Suporte embarcado com base de conhecimento
- 📚 **Documentação Completa** - Guias detalhados e tutoriais

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.11+** - Linguagem principal
- **Flask 2.3+** - Framework web
- **SQLAlchemy** - ORM para banco de dados
- **Flask-CORS** - Suporte a CORS
- **Requests** - Cliente HTTP

### Frontend
- **React 18+** - Framework frontend
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **Recharts** - Gráficos interativos

### Banco de Dados
- **SQLite** (desenvolvimento)
- **PostgreSQL** (produção recomendado)

## 📋 Requisitos do Sistema

### Mínimos
- Python 3.11+
- Node.js 20+
- 2GB RAM
- 10GB espaço em disco
- Conexão com internet estável

### Recomendados
- 4GB RAM
- 20GB espaço em disco
- VPS com IP fixo
- Certificado SSL

## 🚀 Instalação Rápida

### 1. Preparar o Ambiente

**Windows:**
```bash
# Instalar Python 3.11+ de https://python.org
# Instalar Node.js 20+ de https://nodejs.org

# Verificar instalações
python --version
node --version
```

**Linux/Ubuntu:**
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Python 3.11
sudo apt install python3.11 python3.11-pip python3.11-venv -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

### 2. Instalar a Aplicação

```bash
# Extrair o projeto
unzip atual-bot-v2.zip
cd atual-bot-v2

# Instalar dependências do backend
cd atual-bot-backend
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

pip install -r requirements.txt

# Instalar dependências do frontend
cd ../atual-bot-frontend
npm install
```

### 3. Executar a Aplicação

**Terminal 1 - Backend:**
```bash
cd atual-bot-backend
source venv/bin/activate
python src/main.py
```

**Terminal 2 - Frontend:**
```bash
cd atual-bot-frontend
npm run dev
```

**Acessar:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório do backend:

```env
# Configurações do Flask
FLASK_ENV=production
SECRET_KEY=sua_chave_secreta_aqui

# Configurações do Banco de Dados
DATABASE_URL=sqlite:///atual_bot.db

# Configurações de CORS
CORS_ORIGINS=http://localhost:3000,https://seudominio.com

# Configurações de API (opcional)
OPENAI_API_KEY=sua_chave_openai
GOOGLE_API_KEY=sua_chave_google
```

### Configuração de IA

1. Acesse o menu "IA" na interface
2. Selecione seu provedor preferido
3. Insira a chave API
4. Teste a conexão

### Configuração de Redes Sociais

**WhatsApp:**
- Escaneie o QR Code na interface
- Aguarde sincronização dos grupos

**Facebook:**
- Faça login via OAuth
- Autorize as permissões necessárias

**Telegram:**
- Crie um bot no @BotFather
- Configure o token na interface

## 📊 Funcionalidades Principais

### Sistema de Vagas
- Coleta automática de vagas 24/7
- Filtros por estado, cidade, salário e categoria
- Todos os 27 estados brasileiros
- Integração com principais sites de emprego

### Gerenciamento de Grupos
- Detecção automática de grupos conectados
- Ranking por engajamento
- Descoberta inteligente de novos grupos
- Métricas detalhadas de performance

### Analytics e Relatórios
- Dashboard com métricas em tempo real
- Gráficos interativos
- Relatórios exportáveis (PDF, CSV)
- Tracking de cliques e conversões

### Sistema de Monetização
- Integração com Google AdSense
- Página intermediária para anúncios
- Configurações personalizáveis
- Tracking de receita

## 🎨 Interface e Design

### Design Cyber-Glow
- Cores vibrantes (#00d4ff, #ff6b35)
- Animações suaves e efeitos visuais
- Glassmorphism e bordas luminosas
- Fundo animado com partículas

### Temas
- **Tema Escuro** (padrão)
- **Tema Claro** (alternativo)
- Persistência de preferência
- Toggle rápido na interface

### Responsividade
- Compatível com desktop e mobile
- Layout adaptativo
- Touch-friendly
- Otimizado para diferentes resoluções

## 🤖 Meta-Assistente

### Funcionalidades
- Chat inteligente embarcado
- Base de conhecimento completa
- Modo dual: KB + IA
- Ações rápidas para tópicos comuns
- Suporte 24/7

### Tópicos Cobertos
- Configuração inicial
- Instalação e deploy
- Gerenciamento de grupos
- Sistema de IA
- Monetização
- Solução de problemas

## 📚 Documentação

### Seções Disponíveis
1. **Primeiros Passos** - Introdução e configuração inicial
2. **Instalação e Deploy** - Guia completo de instalação
3. **Configuração de IA** - Como configurar provedores de IA
4. **Gerenciamento de Grupos** - Como gerenciar grupos e conexões
5. **Sistema de Vagas** - Configuração e uso do sistema de vagas
6. **Analytics e Relatórios** - Como usar o sistema de analytics
7. **Sistema de Monetização** - Como configurar e otimizar a monetização
8. **Solução de Problemas** - Guia de troubleshooting

### Recursos
- Busca integrada
- Navegação rápida
- Seções expansíveis
- Exportação em PDF

## 🚀 Deploy em Produção

### VPS Recomendadas
- **DigitalOcean** (Droplet 2GB RAM)
- **Linode** (Nanode 2GB)
- **AWS EC2** (t3.small)
- **Vultr** (Regular Performance 2GB)

### Configuração Básica

```bash
# Conectar via SSH
ssh root@seu_servidor_ip

# Instalar dependências
apt update && apt upgrade -y
apt install python3.11 python3.11-pip nodejs npm nginx certbot -y

# Configurar aplicação
cd /var/www/atual-bot
# Seguir passos de instalação

# Configurar Nginx e SSL
# Ver documentação completa na interface
```

### Docker (Opcional)

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./atual-bot-backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production

  frontend:
    build: ./atual-bot-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## 💰 Monetização

### Google AdSense
- Configuração simples via interface
- Página intermediária para anúncios
- Tracking de receita em tempo real
- Otimização automática

### Estimativas de Ganhos
- **1.000 cliques/mês**: $50 - $200
- **5.000 cliques/mês**: $250 - $1.000
- **10.000 cliques/mês**: $500 - $2.000
- **50.000 cliques/mês**: $2.500 - $10.000

## 🔒 Segurança

### Medidas Implementadas
- Sanitização de dados de entrada
- Proteção contra SQL injection
- Rate limiting nas APIs
- Validação de tokens
- Logs de segurança

### Boas Práticas
- Use HTTPS em produção
- Configure firewall adequadamente
- Mantenha dependências atualizadas
- Monitore logs regularmente

## 📈 Performance

### Otimizações
- Cache de dados frequentes
- Lazy loading de componentes
- Compressão de assets
- CDN para recursos estáticos
- Database indexing

### Monitoramento
- Logs estruturados
- Métricas de performance
- Alertas automáticos
- Dashboard de sistema

## 🤝 Suporte

### Canais Disponíveis
- **WhatsApp**: +55 41 99777-1355 (Edu Lima)
- **Meta-Assistente**: Chat integrado na plataforma
- **Documentação**: Guias completos na interface

### Horário de Atendimento
- Segunda a Sexta: 9h às 18h (Brasília)
- Tempo de resposta: Até 24 horas
- Emergências: WhatsApp (resposta mais rápida)

## 📄 Licença

Este projeto é propriedade de **Edu Lima - Eco Hub Center**.

### Termos de Uso
- Licença comercial para uso próprio
- Proibida redistribuição sem autorização
- Suporte técnico incluído
- Atualizações por 12 meses

## 🔄 Atualizações

### Versão Atual: 2.0 Pro

### Histórico de Versões
- **v2.0 Pro** - Interface moderna, IA configurável, Meta-Assistente
- **v1.0** - Versão inicial básica

### Próximas Funcionalidades
- Integração com mais redes sociais
- Sistema de templates personalizáveis
- API pública para integrações
- Mobile app nativo

## 🏗️ Arquitetura

### Estrutura do Projeto
```
atual-bot-v2/
├── atual-bot-backend/          # Backend Flask
│   ├── src/
│   │   ├── main.py            # Aplicação principal
│   │   ├── models/            # Modelos do banco
│   │   ├── routes/            # Rotas da API
│   │   └── config/            # Configurações
│   ├── requirements.txt       # Dependências Python
│   └── .env                   # Variáveis de ambiente
├── atual-bot-frontend/         # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── App.jsx           # Componente principal
│   │   └── App.css           # Estilos globais
│   ├── package.json          # Dependências Node
│   └── vite.config.js        # Configuração Vite
├── README.md                  # Este arquivo
└── docs/                     # Documentação adicional
```

### Fluxo de Dados
1. **Coleta** - Sistema coleta vagas automaticamente
2. **Processamento** - IA analisa e filtra conteúdo
3. **Distribuição** - Publica nos grupos conectados
4. **Tracking** - Monitora cliques e engajamento
5. **Analytics** - Gera relatórios e insights

## 🧪 Testes

### Executar Testes
```bash
# Backend
cd atual-bot-backend
python -m pytest tests/

# Frontend
cd atual-bot-frontend
npm test
```

### Cobertura de Testes
- Testes unitários para APIs
- Testes de integração
- Testes de interface
- Testes de performance

## 🌟 Contribuição

### Para Desenvolvedores
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões de Código
- Python: PEP 8
- JavaScript: ESLint + Prettier
- Commits: Conventional Commits
- Documentação: Markdown

## 📞 Contato

**Desenvolvedor**: Edu Lima  
**Empresa**: Eco Hub Center  
**WhatsApp**: +55 41 99777-1355  
**Email**: contato@ecohubcenter.com  

---

**© 2024 Edu Lima - Eco Hub Center. Todos os direitos reservados.**

*Desenvolvido com ❤️ e tecnologia de ponta para automatizar seu sucesso!*

