import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  ChevronRight, 
  ChevronDown,
  Search,
  Download,
  ExternalLink,
  Play,
  Settings,
  Zap,
  Users,
  BarChart3,
  DollarSign,
  HelpCircle,
  Server,
  Smartphone,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos',
      icon: Play,
      description: 'Como começar a usar o Atual.bot',
      content: `
## Bem-vindo ao Atual.bot

O Atual.bot é uma plataforma inteligente de automação para coleta e distribuição de vagas de emprego e notícias em redes sociais. Esta ferramenta permite que você automatize completamente o processo de encontrar, filtrar e publicar conteúdo relevante em grupos do WhatsApp, Facebook e Telegram.

### Principais Funcionalidades

**🤖 Inteligência Artificial Configurável**
- Suporte a 14+ provedores de IA (ChatGPT, Gemini, Claude, etc.)
- Modo dual: funciona com ou sem IA
- Análise inteligente de conteúdo e grupos

**📱 Automação Multi-Plataforma**
- WhatsApp Business API
- Facebook Groups API
- Telegram Bot API
- Detecção automática de grupos conectados

**🎯 Filtros Avançados**
- Todos os 27 estados do Brasil
- Filtros por salário, categoria e palavras-chave
- Coleta 24/7 automatizada

**📊 Analytics Completo**
- Dashboard com métricas em tempo real
- Gráficos interativos de performance
- Relatórios exportáveis

**💰 Monetização Integrada**
- Google AdSense configurável
- Página intermediária para anúncios
- Tracking de cliques e conversões

### Requisitos do Sistema

**Mínimos:**
- Python 3.11+
- Node.js 20+
- 2GB RAM
- 10GB espaço em disco
- Conexão com internet estável

**Recomendados:**
- 4GB RAM
- 20GB espaço em disco
- VPS com IP fixo
- Certificado SSL

### Primeira Configuração

1. **Extrair e Instalar**
   - Extraia o arquivo ZIP fornecido
   - Execute a instalação do backend e frontend

2. **Configurar IA (Opcional)**
   - Acesse o menu "IA"
   - Selecione seu provedor preferido
   - Insira a chave API

3. **Configurar Filtros de Vagas**
   - Acesse o menu "Vagas"
   - Configure estado, cidade e filtros
   - Inicie a coleta automática

4. **Conectar Redes Sociais**
   - Configure WhatsApp via QR Code
   - Conecte Facebook via OAuth
   - Configure Telegram Bot

5. **Configurar Monetização (Opcional)**
   - Acesse o menu "AdSense"
   - Configure suas credenciais
   - Ative o sistema de anúncios
      `
    },
    {
      id: 'installation',
      title: 'Instalação e Deploy',
      icon: Server,
      description: 'Guia completo de instalação',
      content: `
## Instalação Local

### Passo 1: Preparar o Ambiente

**Windows:**
\`\`\`bash
# Instalar Python 3.11+
# Baixar de: https://python.org

# Instalar Node.js 20+
# Baixar de: https://nodejs.org

# Verificar instalações
python --version
node --version
npm --version
\`\`\`

**Linux/Ubuntu:**
\`\`\`bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Python 3.11
sudo apt install python3.11 python3.11-pip python3.11-venv -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Verificar instalações
python3.11 --version
node --version
\`\`\`

### Passo 2: Instalar a Aplicação

\`\`\`bash
# Extrair o arquivo ZIP
unzip atual-bot.zip
cd atual-bot

# Instalar dependências do backend
cd atual-bot-backend
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\\Scripts\\activate  # Windows

pip install -r requirements.txt

# Instalar dependências do frontend
cd ../atual-bot-frontend
npm install
\`\`\`

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo \`.env\` no diretório do backend:

\`\`\`env
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
\`\`\`

### Passo 4: Executar a Aplicação

**Terminal 1 - Backend:**
\`\`\`bash
cd atual-bot-backend
source venv/bin/activate
python src/main.py
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd atual-bot-frontend
npm run dev
\`\`\`

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deploy em Produção

### Opção 1: VPS Manual

**Provedores Recomendados:**
- DigitalOcean (Droplet 2GB RAM)
- Linode (Nanode 2GB)
- AWS EC2 (t3.small)
- Vultr (Regular Performance 2GB)

**Configuração do Servidor:**
\`\`\`bash
# Conectar via SSH
ssh root@seu_servidor_ip

# Atualizar sistema
apt update && apt upgrade -y

# Instalar dependências
apt install python3.11 python3.11-pip python3.11-venv nodejs npm nginx certbot python3-certbot-nginx -y

# Clonar/enviar aplicação
# (usar scp, rsync ou git)

# Configurar aplicação
cd /var/www/atual-bot
# Seguir passos de instalação local

# Configurar Nginx
nano /etc/nginx/sites-available/atual-bot
\`\`\`

**Configuração do Nginx:**
\`\`\`nginx
server {
    listen 80;
    server_name seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

**Configurar SSL:**
\`\`\`bash
# Ativar site
ln -s /etc/nginx/sites-available/atual-bot /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Configurar SSL
certbot --nginx -d seudominio.com
\`\`\`

**Configurar Serviços Systemd:**

Backend (\`/etc/systemd/system/atual-bot-backend.service\`):
\`\`\`ini
[Unit]
Description=Atual Bot Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/atual-bot/atual-bot-backend
Environment=PATH=/var/www/atual-bot/atual-bot-backend/venv/bin
ExecStart=/var/www/atual-bot/atual-bot-backend/venv/bin/python src/main.py
Restart=always

[Install]
WantedBy=multi-user.target
\`\`\`

Frontend (\`/etc/systemd/system/atual-bot-frontend.service\`):
\`\`\`ini
[Unit]
Description=Atual Bot Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/atual-bot/atual-bot-frontend
ExecStart=/usr/bin/npm run start
Restart=always

[Install]
WantedBy=multi-user.target
\`\`\`

**Iniciar Serviços:**
\`\`\`bash
systemctl enable atual-bot-backend atual-bot-frontend
systemctl start atual-bot-backend atual-bot-frontend
systemctl status atual-bot-backend atual-bot-frontend
\`\`\`

### Opção 2: Docker (Avançado)

\`\`\`dockerfile
# Dockerfile.backend
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "src/main.py"]
\`\`\`

\`\`\`dockerfile
# Dockerfile.frontend
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
\`\`\`

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./atual-bot-backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./data:/app/data

  frontend:
    build:
      context: ./atual-bot-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - frontend
      - backend
\`\`\`

### Monitoramento e Manutenção

**Logs:**
\`\`\`bash
# Ver logs dos serviços
journalctl -u atual-bot-backend -f
journalctl -u atual-bot-frontend -f

# Logs do Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
\`\`\`

**Backup:**
\`\`\`bash
# Backup do banco de dados
cp /var/www/atual-bot/atual-bot-backend/atual_bot.db /backup/

# Backup das configurações
tar -czf /backup/atual-bot-config-$(date +%Y%m%d).tar.gz /var/www/atual-bot/.env
\`\`\`

**Atualizações:**
\`\`\`bash
# Parar serviços
systemctl stop atual-bot-backend atual-bot-frontend

# Atualizar código
cd /var/www/atual-bot
# Substituir arquivos

# Reinstalar dependências se necessário
cd atual-bot-backend
source venv/bin/activate
pip install -r requirements.txt

cd ../atual-bot-frontend
npm install

# Reiniciar serviços
systemctl start atual-bot-backend atual-bot-frontend
\`\`\`
      `
    },
    {
      id: 'ai-configuration',
      title: 'Configuração de IA',
      icon: Zap,
      description: 'Como configurar provedores de IA',
      content: `
## Configuração de Inteligência Artificial

O Atual.bot suporta múltiplos provedores de IA, permitindo que você escolha a melhor opção para suas necessidades e orçamento.

### Provedores Suportados

**OpenAI (ChatGPT):**
- GPT-4o (mais avançado)
- GPT-4 Turbo (otimizado)
- GPT-3.5 Turbo (econômico)

**Google (Gemini):**
- Gemini 1.5 Pro (avançado)
- Gemini 1.5 Flash (rápido)

**Anthropic (Claude):**
- Claude 3 Opus (mais poderoso)
- Claude 3 Sonnet (equilibrado)
- Claude 3 Haiku (rápido e econômico)

**Outros:**
- Llama 3 (Meta)
- Mistral Large
- Qwen (Alibaba)
- Command R+ (Cohere)
- Perplexity Online
- Manus

### Como Obter Chaves API

**OpenAI:**
1. Acesse https://platform.openai.com
2. Crie uma conta ou faça login
3. Vá em "API Keys"
4. Clique em "Create new secret key"
5. Copie a chave (sk-...)

**Google Gemini:**
1. Acesse https://makersuite.google.com
2. Faça login com conta Google
3. Clique em "Get API Key"
4. Crie um novo projeto se necessário
5. Copie a chave (AIza...)

**Anthropic Claude:**
1. Acesse https://console.anthropic.com
2. Crie uma conta
3. Vá em "API Keys"
4. Gere uma nova chave
5. Copie a chave (sk-ant-...)

### Configuração no Atual.bot

1. **Acessar Configuração:**
   - Clique no menu "IA"
   - Selecione o provedor desejado

2. **Inserir Credenciais:**
   - Cole a chave API no campo correspondente
   - Clique em "Testar Conexão"

3. **Verificar Status:**
   - Aguarde a confirmação de conexão
   - Clique em "Salvar Configuração"

### Funcionalidades com IA Ativa

**Análise Inteligente de Grupos:**
- Avaliação automática da qualidade dos grupos
- Identificação de grupos com melhor engajamento
- Sugestões de novos grupos relevantes

**Otimização de Conteúdo:**
- Melhoria automática de títulos de vagas
- Formatação inteligente de postagens
- Detecção e remoção de spam

**Análise de Sentimento:**
- Monitoramento de reações às postagens
- Identificação de conteúdo controverso
- Ajuste automático de estratégia

**Horários Otimizados:**
- Análise dos melhores horários para postar
- Agendamento inteligente de publicações
- Maximização do alcance e engajamento

### Custos Estimados

**Uso Leve (até 1.000 requisições/mês):**
- GPT-3.5 Turbo: $2-5/mês
- Gemini Flash: $1-3/mês
- Claude Haiku: $1-4/mês

**Uso Moderado (até 10.000 requisições/mês):**
- GPT-4 Turbo: $20-50/mês
- Gemini Pro: $15-40/mês
- Claude Sonnet: $15-45/mês

**Uso Intenso (até 100.000 requisições/mês):**
- GPT-4o: $100-300/mês
- Claude Opus: $150-400/mês
- Modelos customizados: Variável

### Otimização de Custos

**Dicas para Reduzir Gastos:**
1. Use modelos mais econômicos para tarefas simples
2. Configure limites de uso mensal
3. Otimize prompts para respostas mais concisas
4. Use cache para respostas repetitivas
5. Monitore uso através do dashboard do provedor

**Configurações Recomendadas:**
- **Iniciantes**: GPT-3.5 Turbo ou Gemini Flash
- **Uso Profissional**: GPT-4 Turbo ou Claude Sonnet
- **Máxima Performance**: GPT-4o ou Claude Opus

### Modo Híbrido

O Atual.bot pode operar em modo híbrido, usando IA apenas para tarefas específicas:

**Sem IA:**
- Coleta básica de vagas
- Publicação automática simples
- Filtros manuais

**Com IA:**
- Análise inteligente de qualidade
- Otimização automática
- Insights avançados

### Solução de Problemas

**Erro de Autenticação:**
- Verifique se a chave API está correta
- Confirme se há créditos na conta
- Teste com uma chave nova

**Limite de Rate Excedido:**
- Reduza a frequência de requisições
- Upgrade do plano do provedor
- Use um modelo com limites maiores

**Respostas de Baixa Qualidade:**
- Ajuste os prompts do sistema
- Teste com um modelo mais avançado
- Verifique os parâmetros de temperatura

**Custos Altos:**
- Monitore o uso através do dashboard
- Configure alertas de limite
- Otimize prompts para eficiência
      `
    },
    {
      id: 'groups-management',
      title: 'Gerenciamento de Grupos',
      icon: Users,
      description: 'Como gerenciar grupos e conexões',
      content: `
## Gerenciamento de Grupos

O sistema de grupos do Atual.bot é projetado para detectar automaticamente todos os grupos onde suas contas estão conectadas e otimizar as publicações baseado em métricas de engajamento.

### Como Funciona

**Detecção Automática:**
O sistema escaneia automaticamente todos os grupos onde você está presente nas seguintes plataformas:
- WhatsApp Business
- Facebook Groups
- Telegram Channels/Groups

**Análise de Qualidade:**
Cada grupo é analisado e ranqueado baseado em:
- Número de membros
- Taxa de engajamento
- Frequência de mensagens
- Qualidade das interações
- Relevância para o nicho

### Conectando Contas

**WhatsApp Business:**
1. Acesse o menu "Grupos"
2. Clique em "Conectar WhatsApp"
3. Escaneie o QR Code com seu celular
4. Aguarde a sincronização dos grupos

**Facebook:**
1. Clique em "Conectar Facebook"
2. Faça login com sua conta
3. Autorize as permissões necessárias
4. Aguarde a importação dos grupos

**Telegram:**
1. Crie um bot no @BotFather
2. Obtenha o token do bot
3. Adicione o bot aos seus grupos/canais
4. Configure o token no sistema

### Métricas de Grupos

**Engajamento:**
- Calculado baseado em likes, comentários e compartilhamentos
- Grupos com 80%+ são considerados excelentes
- 60-79%: Bom engajamento
- Abaixo de 60%: Baixo engajamento

**Atividade:**
- Mensagens por dia
- Horários de maior atividade
- Frequência de postagens

**Qualidade:**
- Relevância do conteúdo
- Spam score
- Moderação ativa

### Ranking Inteligente

O sistema classifica automaticamente os grupos em ordem de prioridade:

**Posição 1-3: Grupos Premium**
- Máximo engajamento
- Alta relevância
- Audiência ativa

**Posição 4-10: Grupos Bons**
- Bom engajamento
- Audiência moderada
- Potencial de crescimento

**Posição 11+: Grupos Básicos**
- Engajamento baixo
- Audiência limitada
- Uso ocasional

### Descoberta de Novos Grupos

**Com IA Ativa:**
O sistema pode sugerir novos grupos baseado em:
- Análise de grupos similares
- Palavras-chave relevantes
- Localização geográfica
- Nicho de atuação

**Processo de Descoberta:**
1. Clique em "Descobrir Grupos"
2. Configure filtros (região, categoria, tamanho)
3. Aguarde a análise da IA
4. Revise as sugestões
5. Solicite convites ou entre manualmente

### Configurações de Publicação

**Por Grupo:**
- Frequência de postagens
- Tipos de conteúdo permitido
- Horários preferenciais
- Filtros específicos

**Configurações Globais:**
- Intervalo mínimo entre posts
- Limite diário de publicações
- Blacklist de palavras
- Whitelist de categorias

### Monitoramento de Performance

**Métricas por Grupo:**
- Cliques gerados
- Visualizações
- Taxa de conversão
- Engajamento médio

**Relatórios:**
- Performance semanal/mensal
- Comparativo entre grupos
- Tendências de engajamento
- ROI por grupo

### Automação Inteligente

**Horários Otimizados:**
O sistema aprende os melhores horários para cada grupo:
- Análise de atividade histórica
- Identificação de picos de engajamento
- Agendamento automático

**Conteúdo Personalizado:**
- Adaptação do conteúdo por grupo
- Formatação específica por plataforma
- Linguagem adequada ao público

### Compliance e Boas Práticas

**Limites Recomendados:**
- WhatsApp: Máximo 5 posts/dia por grupo
- Facebook: Máximo 3 posts/dia por grupo
- Telegram: Máximo 10 posts/dia por canal

**Evitar Spam:**
- Intervalo mínimo de 2 horas entre posts
- Conteúdo variado e relevante
- Respeitar regras dos grupos
- Monitorar feedback dos membros

**Políticas das Plataformas:**
- Seguir termos de uso
- Evitar automação excessiva
- Manter contas em boa reputação
- Usar APIs oficiais quando disponível

### Solução de Problemas

**Grupos Não Aparecem:**
1. Verifique se está logado na conta correta
2. Reescaneie o QR Code (WhatsApp)
3. Reconecte as contas sociais
4. Aguarde até 30 minutos para sincronização

**Baixo Engajamento:**
1. Revise a qualidade do conteúdo
2. Ajuste horários de publicação
3. Teste diferentes tipos de post
4. Analise feedback dos membros

**Conta Bloqueada:**
1. Reduza frequência de posts
2. Varie o conteúdo
3. Evite links suspeitos
4. Entre em contato com suporte da plataforma

**Performance Inconsistente:**
1. Monitore métricas regularmente
2. Ajuste estratégia baseado em dados
3. Teste A/B com diferentes abordagens
4. Use insights da IA para otimização
      `
    },
    {
      id: 'jobs-system',
      title: 'Sistema de Vagas',
      icon: Settings,
      description: 'Configuração e uso do sistema de vagas',
      content: `
## Sistema de Vagas

O sistema de vagas do Atual.bot é projetado para coletar, filtrar e distribuir automaticamente oportunidades de emprego relevantes para sua audiência.

### Configuração de Filtros

**Localização:**
- **Estados**: Todos os 27 estados brasileiros disponíveis
- **Cidades**: Qualquer cidade pode ser especificada
- **Região Metropolitana**: Inclui cidades próximas automaticamente

**Filtros Salariais:**
- R$ 1.000 - R$ 1.500
- R$ 1.500 - R$ 2.000
- R$ 2.000 - R$ 2.500
- R$ 2.500 - R$ 3.000
- R$ 3.000 - R$ 4.000
- R$ 4.000 - R$ 5.000
- R$ 5.000 - R$ 7.500
- R$ 7.500 - R$ 10.000
- Acima de R$ 10.000

**Categorias Profissionais:**
- Tecnologia da Informação
- Vendas e Comercial
- Marketing e Publicidade
- Administração e Gestão
- Recursos Humanos
- Financeiro e Contabilidade
- Engenharia
- Saúde e Medicina
- Educação e Ensino
- Jurídico e Legal
- Design e Criação
- Logística e Transporte
- Produção e Manufatura
- Atendimento ao Cliente
- Outros

### Fontes de Vagas

**Sites Integrados:**
- Indeed Brasil
- Catho
- InfoJobs
- Vagas.com
- LinkedIn Jobs
- Glassdoor
- Trabalha Brasil
- SINE (Sistema Nacional de Emprego)

**APIs Utilizadas:**
- Indeed API
- LinkedIn Talent Solutions
- Google for Jobs
- Adzuna API

### Processo de Coleta

**Coleta Automática:**
1. Sistema executa busca a cada 30 minutos
2. Aplica filtros configurados
3. Remove duplicatas
4. Verifica qualidade da vaga
5. Adiciona à fila de publicação

**Com IA Ativa:**
- Análise de qualidade do conteúdo
- Detecção de vagas falsas/spam
- Otimização de títulos e descrições
- Classificação por relevância

### Qualidade das Vagas

**Critérios de Aprovação:**
- Salário dentro da faixa especificada
- Descrição completa e clara
- Empresa identificada
- Localização específica
- Sem indicadores de spam

**Filtros Anti-Spam:**
- Blacklist de empresas suspeitas
- Detecção de MLM/pirâmides
- Verificação de dados de contato
- Análise de linguagem suspeita

### Formatação de Publicações

**Template Padrão:**
\`\`\`
🔥 [TÍTULO DA VAGA]

🏢 Empresa: [NOME DA EMPRESA]
📍 Local: [CIDADE, ESTADO]
💰 Salário: [FAIXA SALARIAL]
⏰ Tipo: [CLT/PJ/ESTÁGIO]

📋 Descrição:
[RESUMO DA VAGA]

📝 Requisitos:
[PRINCIPAIS REQUISITOS]

👆 Clique no link para se candidatar:
[LINK DA VAGA]

#vagas #emprego #[CATEGORIA]
\`\`\`

**Personalização por Plataforma:**
- **WhatsApp**: Formato mais conciso
- **Facebook**: Inclui hashtags relevantes
- **Telegram**: Formato expandido com mais detalhes

### Agendamento Inteligente

**Horários Otimizados:**
- **Manhã**: 8h às 10h (maior atividade)
- **Almoço**: 12h às 14h (pausa para busca)
- **Tarde**: 17h às 19h (fim do expediente)

**Distribuição por Dia:**
- Segunda-feira: Foco em vagas de TI
- Terça-feira: Vagas comerciais
- Quarta-feira: Mix geral
- Quinta-feira: Vagas especializadas
- Sexta-feira: Oportunidades de fim de semana

### Métricas e Analytics

**KPIs Principais:**
- Vagas coletadas por dia
- Taxa de aprovação (filtros)
- Cliques por vaga
- Taxa de conversão
- Engajamento por categoria

**Relatórios Disponíveis:**
- Performance por fonte
- Vagas mais populares
- Tendências salariais
- Análise geográfica
- ROI por categoria

### Configurações Avançadas

**Palavras-chave Personalizadas:**
- Inclua termos específicos
- Exclua palavras indesejadas
- Use operadores booleanos
- Configure sinônimos

**Filtros de Empresa:**
- Whitelist de empresas preferidas
- Blacklist de empresas indesejadas
- Filtro por porte da empresa
- Filtro por setor de atuação

**Configurações de Frequência:**
- Máximo de vagas por hora
- Intervalo entre publicações
- Limite diário por grupo
- Pausas programadas

### Integração com CRM

**Tracking de Candidatos:**
- Acompanhe cliques em vagas
- Identifique candidatos interessados
- Crie relatórios de conversão
- Integre com sistemas externos

**Lead Generation:**
- Capture dados de interessados
- Crie listas de candidatos
- Segmente por perfil profissional
- Automatize follow-up

### Compliance Legal

**LGPD (Lei Geral de Proteção de Dados):**
- Não coletamos dados pessoais
- Links direcionam para sites originais
- Respeitamos opt-out de usuários
- Mantemos logs de atividade

**Direitos Autorais:**
- Usamos apenas resumos de vagas
- Sempre linkamos para fonte original
- Respeitamos robots.txt dos sites
- Seguimos fair use guidelines

### Monetização de Vagas

**Modelos Disponíveis:**
1. **AdSense**: Anúncios na página intermediária
2. **Afiliação**: Links de cursos relacionados
3. **Premium**: Destaque para vagas pagas
4. **Consultoria**: Serviços de RH

**Configuração de Monetização:**
- Ative AdSense nas configurações
- Configure tempo de exibição
- Defina categorias monetizáveis
- Monitore performance financeira

### Solução de Problemas

**Poucas Vagas Coletadas:**
1. Amplie filtros geográficos
2. Inclua mais categorias
3. Reduza filtro salarial mínimo
4. Verifique conectividade com APIs

**Vagas de Baixa Qualidade:**
1. Ajuste filtros anti-spam
2. Aumente critérios de qualidade
3. Use IA para melhor filtragem
4. Mantenha blacklist atualizada

**Baixo Engajamento:**
1. Teste diferentes formatos
2. Ajuste horários de publicação
3. Varie tipos de vaga
4. Analise feedback da audiência

**Problemas de API:**
1. Verifique limites de rate
2. Confirme chaves de API
3. Monitore status dos serviços
4. Implemente fallbacks
      `
    },
    {
      id: 'analytics',
      title: 'Analytics e Relatórios',
      icon: BarChart3,
      description: 'Como usar o sistema de analytics',
      content: `
## Analytics e Relatórios

O sistema de analytics do Atual.bot fornece insights detalhados sobre o desempenho das suas publicações, engajamento da audiência e retorno sobre investimento.

### Dashboard Principal

**KPIs em Tempo Real:**
- Total de cliques
- Visualizações
- Taxa de conversão
- Engajamento médio
- Ganhos do AdSense

**Gráficos Interativos:**
- Performance ao longo do tempo
- Distribuição por tipo de conteúdo
- Comparativo entre plataformas
- Ranking de grupos por engajamento

### Métricas Detalhadas

**Métricas de Conteúdo:**
- **Impressões**: Quantas vezes o conteúdo foi visto
- **Cliques**: Número de cliques nos links
- **CTR (Click-Through Rate)**: Taxa de cliques por impressão
- **Tempo de Permanência**: Tempo médio na página de destino
- **Taxa de Rejeição**: Porcentagem que sai imediatamente

**Métricas de Engajamento:**
- **Likes/Reações**: Curtidas e reações
- **Comentários**: Número de comentários
- **Compartilhamentos**: Vezes que foi compartilhado
- **Saves**: Salvamentos (quando disponível)
- **Engagement Rate**: Taxa geral de engajamento

**Métricas de Conversão:**
- **Leads Gerados**: Contatos capturados
- **Candidaturas**: Aplicações para vagas
- **Downloads**: Downloads de materiais
- **Cadastros**: Registros em plataformas

### Relatórios por Período

**Filtros Temporais:**
- Últimas 24 horas
- Últimos 7 dias
- Últimos 30 dias
- Últimos 90 dias
- Período customizado

**Comparativos:**
- Período atual vs anterior
- Crescimento percentual
- Tendências de longo prazo
- Sazonalidade

### Analytics por Plataforma

**WhatsApp:**
- Mensagens entregues
- Mensagens lidas
- Respostas recebidas
- Grupos mais ativos

**Facebook:**
- Alcance orgânico
- Engajamento por post
- Demografia da audiência
- Horários de maior atividade

**Telegram:**
- Visualizações de canal
- Forwards (encaminhamentos)
- Cliques em links
- Crescimento de seguidores

### Análise de Grupos

**Performance Individual:**
Cada grupo é analisado separadamente:
- Número de membros
- Taxa de engajamento
- Cliques gerados
- Conversões
- ROI específico

**Ranking de Performance:**
- Grupos ordenados por engajamento
- Identificação de top performers
- Grupos com potencial de melhoria
- Grupos com baixa performance

**Insights Automatizados:**
- Melhores horários para cada grupo
- Tipos de conteúdo preferidos
- Frequência ideal de postagem
- Sugestões de otimização

### Análise de Conteúdo

**Performance por Categoria:**
- Vagas de TI vs outras áreas
- Notícias vs vagas
- Conteúdo local vs nacional
- Posts com imagem vs texto

**Análise de Títulos:**
- Palavras que geram mais cliques
- Tamanho ideal de título
- Uso de emojis
- Call-to-actions efetivos

**Análise Temporal:**
- Melhor dia da semana
- Melhor horário do dia
- Sazonalidade por categoria
- Tendências mensais

### Relatórios de Monetização

**AdSense Performance:**
- Receita diária/mensal
- RPM (Revenue per Mille)
- CTR dos anúncios
- Páginas com melhor performance

**Análise de Tráfego:**
- Fontes de tráfego
- Páginas mais visitadas
- Tempo de permanência
- Taxa de rejeição

**ROI Calculation:**
- Investimento em IA
- Custos de hospedagem
- Receita gerada
- Lucro líquido

### Exportação de Dados

**Formatos Disponíveis:**
- PDF (relatórios formatados)
- CSV (dados brutos)
- Excel (planilhas)
- JSON (integração com outras ferramentas)

**Relatórios Automáticos:**
- Relatório semanal por email
- Relatório mensal detalhado
- Alertas de performance
- Notificações de metas

### Configuração de Metas

**KPIs Personalizados:**
- Meta de cliques mensais
- Meta de engajamento
- Meta de receita
- Meta de crescimento

**Alertas Inteligentes:**
- Queda de performance
- Picos de tráfego
- Metas atingidas
- Problemas técnicos

### Integração com Google Analytics

**Configuração:**
1. Crie uma propriedade no Google Analytics
2. Obtenha o código de tracking
3. Configure no painel do Atual.bot
4. Aguarde 24h para dados aparecerem

**Benefícios:**
- Análise mais profunda
- Funis de conversão
- Segmentação avançada
- Integração com Google Ads

### Análise Competitiva

**Benchmarking:**
- Compare com médias do setor
- Identifique oportunidades
- Analise tendências do mercado
- Ajuste estratégias

**Insights de Mercado:**
- Vagas mais procuradas
- Salários em alta
- Regiões com mais oportunidades
- Empresas que mais contratam

### Otimização Baseada em Dados

**Recomendações Automáticas:**
- Melhores horários para postar
- Tipos de conteúdo para priorizar
- Grupos para focar esforços
- Ajustes de frequência

**Testes A/B:**
- Teste diferentes formatos
- Compare horários de publicação
- Teste variações de título
- Analise resultados automaticamente

### Relatórios Executivos

**Dashboard Executivo:**
- Visão geral de alto nível
- Principais KPIs
- Tendências importantes
- Recomendações estratégicas

**Relatório Mensal:**
- Resumo de performance
- Comparativo com mês anterior
- Insights principais
- Plano de ação para próximo mês

### APIs e Integrações

**Webhook de Dados:**
- Envie dados para sistemas externos
- Integre com CRM
- Conecte com ferramentas de BI
- Automatize relatórios

**API de Analytics:**
- Acesse dados programaticamente
- Crie dashboards customizados
- Integre com outras ferramentas
- Desenvolva aplicações próprias

### Privacidade e LGPD

**Dados Coletados:**
- Apenas métricas agregadas
- Sem dados pessoais identificáveis
- Conformidade com LGPD
- Opção de opt-out

**Retenção de Dados:**
- Dados mantidos por 2 anos
- Possibilidade de exclusão
- Backup seguro
- Acesso controlado
      `
    },
    {
      id: 'monetization',
      title: 'Sistema de Monetização',
      icon: DollarSign,
      description: 'Como configurar e otimizar a monetização',
      content: `
## Sistema de Monetização

O Atual.bot oferece múltiplas formas de monetizar seu tráfego e audiência, com foco principal no Google AdSense e outras estratégias complementares.

### Google AdSense

**Configuração Inicial:**
1. **Criar Conta AdSense:**
   - Acesse https://www.google.com/adsense
   - Crie uma conta ou use existente
   - Adicione seu site/domínio
   - Aguarde aprovação (pode levar dias/semanas)

2. **Obter Credenciais:**
   - Publisher ID: pub-xxxxxxxxxxxxxxxxx
   - Ad Client ID: ca-pub-xxxxxxxxxxxxxxxxx
   - Ad Slot ID: xxxxxxxxxx (opcional)

3. **Configurar no Atual.bot:**
   - Acesse menu "AdSense"
   - Insira as credenciais
   - Teste a conexão
   - Ative o sistema

### Como Funciona a Monetização

**Fluxo do Usuário:**
1. Usuário clica em vaga/notícia no grupo
2. É redirecionado para página intermediária
3. Vê anúncio do AdSense por X segundos
4. Pode pular após delay configurado
5. É direcionado para vaga/notícia original

**Configurações de Exibição:**
- **Tempo de Exibição**: 3-30 segundos
- **Delay do Botão Pular**: 0-10 segundos
- **Tipos de Conteúdo**: Vagas, notícias ou ambos
- **Frequência**: Todos os cliques ou percentual

### Otimização de Receita

**Melhores Práticas:**
- **Tempo Ideal**: 5-8 segundos de exibição
- **Delay Recomendado**: 3-5 segundos
- **Posicionamento**: Anúncios acima da dobra
- **Responsividade**: Anúncios adaptáveis

**Tipos de Anúncio Mais Rentáveis:**
- Display responsivo
- Anúncios nativos
- Anúncios de vídeo
- Anúncios de pesquisa

### Estimativas de Ganhos

**Fatores que Influenciam:**
- **Nicho**: TI paga mais que geral
- **Geografia**: Grandes centros pagam mais
- **Qualidade do Tráfego**: Usuários engajados
- **Sazonalidade**: Variações mensais

**Estimativas por Clique:**
- **Vagas de TI**: $0.50 - $2.00
- **Vagas Gerais**: $0.20 - $0.80
- **Notícias**: $0.10 - $0.50
- **Conteúdo Local**: $0.15 - $0.60

**Projeções Mensais:**
- **1.000 cliques/mês**: $50 - $200
- **5.000 cliques/mês**: $250 - $1.000
- **10.000 cliques/mês**: $500 - $2.000
- **50.000 cliques/mês**: $2.500 - $10.000

### Estratégias Complementares

**Marketing de Afiliação:**
- Cursos profissionalizantes
- Ferramentas de produtividade
- Serviços de RH
- Plataformas de emprego

**Produtos Próprios:**
- E-books sobre carreira
- Cursos online
- Consultoria em RH
- Templates de currículo

**Serviços Premium:**
- Destaque de vagas
- Publicação prioritária
- Análises personalizadas
- Suporte dedicado

### Configurações Avançadas

**Segmentação de Anúncios:**
- Por categoria de vaga
- Por localização
- Por horário do dia
- Por dispositivo (mobile/desktop)

**Testes A/B:**
- Diferentes tempos de exibição
- Variações de layout
- Posicionamento de anúncios
- Cores e estilos

**Otimização Automática:**
- Ajuste baseado em performance
- Rotação de formatos
- Otimização por horário
- Personalização por usuário

### Compliance e Políticas

**Políticas do AdSense:**
- Não clique em próprios anúncios
- Não incentive cliques
- Conteúdo deve ser original
- Respeite diretrizes de conteúdo

**Práticas Proibidas:**
- Cliques artificiais
- Tráfego comprado
- Conteúdo adulto
- Violação de direitos autorais

**Manutenção da Conta:**
- Monitore métricas regularmente
- Mantenha CTR saudável (1-5%)
- Evite picos suspeitos
- Responda rapidamente a avisos

### Análise de Performance

**Métricas Principais:**
- **RPM**: Receita por mil impressões
- **CTR**: Taxa de cliques nos anúncios
- **CPC**: Custo por clique médio
- **Viewability**: Porcentagem de anúncios vistos

**Otimização Baseada em Dados:**
- Identifique páginas mais rentáveis
- Ajuste posicionamento de anúncios
- Otimize para dispositivos móveis
- Teste novos formatos

### Diversificação de Receita

**Múltiplas Fontes:**
1. **AdSense**: Base principal
2. **Afiliação**: Comissões por vendas
3. **Produtos**: Criação própria
4. **Serviços**: Consultoria e suporte
5. **Parcerias**: Colaborações estratégicas

**Estratégia 80/20:**
- 80% do foco no AdSense
- 20% em outras fontes
- Gradualmente diversifique
- Mantenha qualidade do conteúdo

### Escalabilidade

**Crescimento Sustentável:**
- Aumente tráfego organicamente
- Melhore qualidade do conteúdo
- Otimize experiência do usuário
- Invista em SEO e marketing

**Automação Inteligente:**
- Use IA para otimizar anúncios
- Automatize testes A/B
- Implemente machine learning
- Personalize experiência

### Aspectos Legais

**Tributação:**
- Declare receitas do AdSense
- Mantenha registros organizados
- Consulte contador especializado
- Considere MEI ou empresa

**Contratos e Termos:**
- Leia termos do AdSense
- Entenda políticas de pagamento
- Mantenha conformidade
- Documente todas as atividades

### Solução de Problemas

**Receita Baixa:**
1. Verifique posicionamento dos anúncios
2. Analise qualidade do tráfego
3. Teste diferentes formatos
4. Otimize para mobile

**Conta Suspensa:**
1. Revise políticas violadas
2. Corrija problemas identificados
3. Envie apelação detalhada
4. Aguarde resposta do Google

**CTR Muito Alto/Baixo:**
- CTR > 10%: Pode indicar cliques inválidos
- CTR < 0.5%: Anúncios mal posicionados
- Monitore e ajuste conforme necessário
- Mantenha entre 1-5% idealmente

### Ferramentas de Apoio

**Google Analytics:**
- Integre com AdSense
- Analise comportamento do usuário
- Identifique páginas mais rentáveis
- Otimize funis de conversão

**Google Search Console:**
- Monitore tráfego orgânico
- Identifique oportunidades SEO
- Corrija problemas técnicos
- Acompanhe indexação

**Ferramentas de Terceiros:**
- Ezoic (otimização automática)
- MonetizeMore (consultoria)
- AdThrive (rede premium)
- Mediavine (alternativa ao AdSense)
      `
    },
    {
      id: 'troubleshooting',
      title: 'Solução de Problemas',
      icon: HelpCircle,
      description: 'Guia de solução de problemas comuns',
      content: `
## Solução de Problemas

Este guia aborda os problemas mais comuns encontrados no uso do Atual.bot e suas respectivas soluções.

### Problemas de Instalação

**Erro: "Python não encontrado"**
- **Causa**: Python não instalado ou não no PATH
- **Solução**:
  \`\`\`bash
  # Windows
  # Baixe Python de python.org
  # Marque "Add to PATH" durante instalação
  
  # Linux
  sudo apt install python3.11 python3.11-pip
  
  # Verificar instalação
  python --version
  \`\`\`

**Erro: "pip install falhou"**
- **Causa**: Dependências conflitantes ou pip desatualizado
- **Solução**:
  \`\`\`bash
  # Atualizar pip
  python -m pip install --upgrade pip
  
  # Instalar em ambiente virtual
  python -m venv venv
  source venv/bin/activate  # Linux/Mac
  venv\\Scripts\\activate   # Windows
  pip install -r requirements.txt
  \`\`\`

**Erro: "npm install falhou"**
- **Causa**: Node.js desatualizado ou cache corrompido
- **Solução**:
  \`\`\`bash
  # Limpar cache
  npm cache clean --force
  
  # Deletar node_modules e reinstalar
  rm -rf node_modules package-lock.json
  npm install
  
  # Usar versão específica do Node
  nvm use 20  # Se usando nvm
  \`\`\`

### Problemas de Conexão

**IA não conecta**
- **Verificações**:
  1. Chave API está correta?
  2. Há créditos na conta?
  3. API está ativa?
  4. Firewall bloqueando?

- **Soluções**:
  \`\`\`bash
  # Testar conexão manual
  curl -H "Authorization: Bearer sua_chave" \\
       https://api.openai.com/v1/models
  
  # Verificar logs
  tail -f logs/app.log
  \`\`\`

**Grupos não aparecem**
- **WhatsApp**:
  1. Reescaneie QR Code
  2. Verifique se WhatsApp Web está ativo
  3. Aguarde até 30 minutos para sincronização

- **Facebook**:
  1. Reconecte a conta
  2. Verifique permissões concedidas
  3. Confirme se está em grupos públicos

- **Telegram**:
  1. Verifique token do bot
  2. Confirme se bot foi adicionado aos grupos
  3. Teste comando /start no bot

### Problemas de Performance

**Sistema lento**
- **Diagnóstico**:
  \`\`\`bash
  # Verificar uso de CPU/RAM
  top
  htop
  
  # Verificar espaço em disco
  df -h
  
  # Verificar logs de erro
  tail -f logs/error.log
  \`\`\`

- **Soluções**:
  1. Aumentar recursos do servidor
  2. Otimizar filtros de busca
  3. Reduzir frequência de coleta
  4. Limpar cache e logs antigos

**Muita memória sendo usada**
- **Causas Comuns**:
  - Cache muito grande
  - Logs não rotacionados
  - Vazamentos de memória
  - Muitas conexões simultâneas

- **Soluções**:
  \`\`\`bash
  # Limpar cache
  rm -rf cache/*
  
  # Rotacionar logs
  logrotate /etc/logrotate.d/atual-bot
  
  # Reiniciar serviços
  systemctl restart atual-bot-backend
  \`\`\`

### Problemas de Coleta de Vagas

**Poucas vagas sendo coletadas**
- **Verificações**:
  1. Filtros muito restritivos?
  2. APIs funcionando?
  3. Rate limits atingidos?
  4. Conexão com internet estável?

- **Soluções**:
  1. Ampliar filtros geográficos
  2. Incluir mais categorias
  3. Reduzir salário mínimo
  4. Verificar status das APIs

**Vagas duplicadas**
- **Causa**: Falha no sistema de deduplicação
- **Solução**:
  \`\`\`python
  # Executar limpeza manual
  python scripts/remove_duplicates.py
  
  # Verificar configuração de hash
  # Em config/settings.py
  DEDUPLICATION_FIELDS = ['title', 'company', 'location']
  \`\`\`

**Vagas de baixa qualidade**
- **Ajustes**:
  1. Aumentar critérios de qualidade
  2. Atualizar blacklist de empresas
  3. Ativar filtros de IA
  4. Revisar palavras-chave

### Problemas de Publicação

**Posts não sendo publicados**
- **WhatsApp**:
  \`\`\`bash
  # Verificar status da sessão
  curl http://localhost:5000/api/whatsapp/status
  
  # Reconectar se necessário
  curl -X POST http://localhost:5000/api/whatsapp/reconnect
  \`\`\`

- **Facebook**:
  1. Verificar token de acesso
  2. Confirmar permissões
  3. Checar limites de rate
  4. Verificar se grupos ainda existem

- **Telegram**:
  1. Testar bot manualmente
  2. Verificar se bot é admin
  3. Confirmar token válido
  4. Checar logs de erro

**Conta bloqueada/suspensa**
- **Prevenção**:
  1. Reduzir frequência de posts
  2. Variar conteúdo
  3. Evitar spam
  4. Respeitar limites das plataformas

- **Recuperação**:
  1. Entrar em contato com suporte
  2. Aguardar período de suspensão
  3. Revisar práticas de uso
  4. Implementar medidas preventivas

### Problemas de AdSense

**Anúncios não aparecem**
- **Verificações**:
  1. Credenciais corretas?
  2. Conta aprovada?
  3. Site adicionado no AdSense?
  4. Código implementado corretamente?

- **Soluções**:
  \`\`\`html
  <!-- Verificar se código está presente -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxx"></script>
  
  <!-- Testar com anúncios de teste -->
  <ins class="adsbygoogle"
       data-ad-client="ca-pub-xxxxxxxxx"
       data-ad-slot="xxxxxxxxx"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  \`\`\`

**Receita muito baixa**
- **Otimizações**:
  1. Melhorar posicionamento dos anúncios
  2. Testar diferentes formatos
  3. Otimizar para mobile
  4. Aumentar tempo de permanência

**Conta suspensa**
- **Causas Comuns**:
  - Cliques inválidos
  - Tráfego de baixa qualidade
  - Violação de políticas
  - Conteúdo inadequado

- **Ações**:
  1. Revisar políticas violadas
  2. Corrigir problemas identificados
  3. Enviar apelação detalhada
  4. Aguardar resposta (pode levar semanas)

### Problemas de Analytics

**Dados não aparecem**
- **Verificações**:
  1. Google Analytics configurado?
  2. Código de tracking presente?
  3. Aguardou 24-48h?
  4. Filtros aplicados?

- **Soluções**:
  \`\`\`javascript
  // Verificar se GA está carregando
  console.log(typeof gtag);
  
  // Testar evento manual
  gtag('event', 'test', {
    'event_category': 'engagement',
    'event_label': 'manual_test'
  });
  \`\`\`

**Métricas inconsistentes**
- **Causas**:
  - Múltiplos códigos de tracking
  - Filtros incorretos
  - Bot traffic
  - Timezone diferente

- **Soluções**:
  1. Verificar implementação única
  2. Configurar filtros de bot
  3. Ajustar timezone
  4. Validar com outras ferramentas

### Problemas de Banco de Dados

**Erro de conexão com BD**
- **SQLite**:
  \`\`\`bash
  # Verificar permissões
  ls -la atual_bot.db
  chmod 664 atual_bot.db
  
  # Verificar integridade
  sqlite3 atual_bot.db "PRAGMA integrity_check;"
  \`\`\`

- **PostgreSQL/MySQL**:
  \`\`\`bash
  # Testar conexão
  psql -h localhost -U usuario -d atual_bot
  
  # Verificar logs
  tail -f /var/log/postgresql/postgresql.log
  \`\`\`

**Banco corrompido**
- **Backup e Restauração**:
  \`\`\`bash
  # Backup
  cp atual_bot.db atual_bot.db.backup
  
  # Restaurar de backup
  cp atual_bot.db.backup atual_bot.db
  
  # Reconstruir se necessário
  python scripts/rebuild_database.py
  \`\`\`

### Problemas de Segurança

**Acesso não autorizado**
- **Medidas Imediatas**:
  1. Trocar todas as senhas
  2. Revogar tokens de API
  3. Verificar logs de acesso
  4. Implementar 2FA

- **Prevenção**:
  \`\`\`bash
  # Configurar firewall
  ufw enable
  ufw allow 22/tcp
  ufw allow 80/tcp
  ufw allow 443/tcp
  
  # Configurar fail2ban
  apt install fail2ban
  systemctl enable fail2ban
  \`\`\`

**Dados vazados**
- **Ações**:
  1. Identificar escopo do vazamento
  2. Notificar usuários afetados
  3. Corrigir vulnerabilidade
  4. Implementar monitoramento

### Logs e Monitoramento

**Localização dos Logs**:
\`\`\`bash
# Logs da aplicação
tail -f logs/app.log
tail -f logs/error.log

# Logs do sistema
journalctl -u atual-bot-backend -f
journalctl -u atual-bot-frontend -f

# Logs do Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
\`\`\`

**Monitoramento Proativo**:
\`\`\`bash
# Script de monitoramento
#!/bin/bash
# monitor.sh

# Verificar se serviços estão rodando
systemctl is-active atual-bot-backend
systemctl is-active atual-bot-frontend

# Verificar uso de recursos
df -h | grep -E "9[0-9]%"  # Disco > 90%
free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2}'  # RAM

# Verificar conectividade
curl -f http://localhost:5000/health || echo "Backend down"
curl -f http://localhost:3000 || echo "Frontend down"
\`\`\`

### Contato para Suporte

**Canais Disponíveis**:
- **WhatsApp**: +55 41 99777-1355
- **Email**: suporte@atual.bot
- **Documentação**: Menu "Ajuda" da ferramenta
- **Assistente**: Chat integrado na plataforma

**Informações para Incluir**:
1. Versão do sistema
2. Sistema operacional
3. Logs de erro relevantes
4. Passos para reproduzir o problema
5. Screenshots se aplicável

**Horário de Atendimento**:
- Segunda a Sexta: 9h às 18h (Brasília)
- Tempo de resposta: Até 24 horas
- Emergências: WhatsApp (resposta mais rápida)
      `
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 cyber-gradient rounded-xl">
            <Book className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Documentação</h1>
            <p className="text-muted-foreground">
              Guia completo para usar o Atual.bot
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="cyber-border"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          <Button
            variant="outline"
            className="cyber-border"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Versão Online
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="glass cyber-border">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar na documentação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 cyber-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle>Navegação Rápida</CardTitle>
          <CardDescription>
            Acesse rapidamente as seções mais importantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {documentationSections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant="outline"
                  onClick={() => toggleSection(section.id)}
                  className="h-auto p-4 flex flex-col items-center space-y-2 cyber-border hover:border-primary/50"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{section.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Sections */}
      <div className="space-y-4">
        {filteredSections.map((section, index) => {
          const Icon = section.icon;
          const isExpanded = expandedSections[section.id];
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass cyber-border">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 cyber-gradient rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {section.content.split('\n').length} linhas
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CardContent>
                      <div className="prose prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {section.content}
                        </pre>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredSections.length === 0 && (
        <Card className="glass cyber-border">
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar com termos diferentes ou navegue pelas seções acima.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documentation;

