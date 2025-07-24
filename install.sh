#!/bin/bash

# Atual.bot v2.0 Pro - Script de Instalação Automática
# Desenvolvido por Edu Lima - Eco Hub Center
# WhatsApp: +55 41 99777-1355

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para imprimir com cores
print_color() {
    printf "${1}${2}${NC}\n"
}

# Função para imprimir header
print_header() {
    echo ""
    print_color $CYAN "=================================="
    print_color $CYAN "    ATUAL.BOT v2.0 PRO INSTALLER"
    print_color $CYAN "=================================="
    print_color $YELLOW "Desenvolvido por Edu Lima - Eco Hub Center"
    print_color $YELLOW "WhatsApp: +55 41 99777-1355"
    echo ""
}

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Função para detectar OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command_exists apt; then
            OS="ubuntu"
        elif command_exists yum; then
            OS="centos"
        else
            OS="linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        OS="windows"
    else
        OS="unknown"
    fi
}

# Função para instalar dependências no Ubuntu/Debian
install_ubuntu_deps() {
    print_color $BLUE "Instalando dependências no Ubuntu/Debian..."
    
    sudo apt update
    sudo apt install -y curl wget git
    
    # Instalar Python 3.11
    if ! command_exists python3.11; then
        print_color $YELLOW "Instalando Python 3.11..."
        sudo apt install -y software-properties-common
        sudo add-apt-repository -y ppa:deadsnakes/ppa
        sudo apt update
        sudo apt install -y python3.11 python3.11-pip python3.11-venv python3.11-dev
    fi
    
    # Instalar Node.js 20
    if ! command_exists node || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 20 ]]; then
        print_color $YELLOW "Instalando Node.js 20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt install -y nodejs
    fi
}

# Função para instalar dependências no CentOS/RHEL
install_centos_deps() {
    print_color $BLUE "Instalando dependências no CentOS/RHEL..."
    
    sudo yum update -y
    sudo yum install -y curl wget git
    
    # Instalar Python 3.11
    if ! command_exists python3.11; then
        print_color $YELLOW "Instalando Python 3.11..."
        sudo yum install -y python3.11 python3.11-pip python3.11-devel
    fi
    
    # Instalar Node.js 20
    if ! command_exists node; then
        print_color $YELLOW "Instalando Node.js 20..."
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo yum install -y nodejs
    fi
}

# Função para instalar dependências no macOS
install_macos_deps() {
    print_color $BLUE "Instalando dependências no macOS..."
    
    # Verificar se Homebrew está instalado
    if ! command_exists brew; then
        print_color $YELLOW "Instalando Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Instalar Python 3.11
    if ! command_exists python3.11; then
        print_color $YELLOW "Instalando Python 3.11..."
        brew install python@3.11
    fi
    
    # Instalar Node.js 20
    if ! command_exists node; then
        print_color $YELLOW "Instalando Node.js 20..."
        brew install node@20
    fi
}

# Função para verificar instalações
verify_installations() {
    print_color $BLUE "Verificando instalações..."
    
    if command_exists python3.11; then
        PYTHON_VERSION=$(python3.11 --version)
        print_color $GREEN "✓ $PYTHON_VERSION"
    else
        print_color $RED "✗ Python 3.11 não encontrado"
        exit 1
    fi
    
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_color $GREEN "✓ Node.js $NODE_VERSION"
    else
        print_color $RED "✗ Node.js não encontrado"
        exit 1
    fi
    
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_color $GREEN "✓ npm $NPM_VERSION"
    else
        print_color $RED "✗ npm não encontrado"
        exit 1
    fi
}

# Função para instalar backend
install_backend() {
    print_color $BLUE "Configurando backend..."
    
    cd atual-bot-backend
    
    # Criar ambiente virtual
    print_color $YELLOW "Criando ambiente virtual..."
    python3.11 -m venv venv
    
    # Ativar ambiente virtual
    source venv/bin/activate
    
    # Atualizar pip
    pip install --upgrade pip
    
    # Instalar dependências
    print_color $YELLOW "Instalando dependências Python..."
    pip install -r requirements.txt
    
    # Criar arquivo .env se não existir
    if [ ! -f .env ]; then
        print_color $YELLOW "Criando arquivo .env..."
        cat > .env << EOF
# Configurações do Flask
FLASK_ENV=development
SECRET_KEY=$(python3.11 -c "import secrets; print(secrets.token_hex(32))")

# Configurações do Banco de Dados
DATABASE_URL=sqlite:///atual_bot.db

# Configurações de CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174

# Configurações de API (opcional)
# OPENAI_API_KEY=sua_chave_openai
# GOOGLE_API_KEY=sua_chave_google
EOF
    fi
    
    cd ..
    print_color $GREEN "✓ Backend configurado com sucesso!"
}

# Função para instalar frontend
install_frontend() {
    print_color $BLUE "Configurando frontend..."
    
    cd atual-bot-frontend
    
    # Instalar dependências
    print_color $YELLOW "Instalando dependências Node.js..."
    npm install
    
    cd ..
    print_color $GREEN "✓ Frontend configurado com sucesso!"
}

# Função para criar scripts de execução
create_run_scripts() {
    print_color $BLUE "Criando scripts de execução..."
    
    # Script para iniciar backend
    cat > start-backend.sh << 'EOF'
#!/bin/bash
cd atual-bot-backend
source venv/bin/activate
python src/main.py
EOF
    chmod +x start-backend.sh
    
    # Script para iniciar frontend
    cat > start-frontend.sh << 'EOF'
#!/bin/bash
cd atual-bot-frontend
npm run dev
EOF
    chmod +x start-frontend.sh
    
    # Script para iniciar ambos
    cat > start-all.sh << 'EOF'
#!/bin/bash

# Função para cleanup
cleanup() {
    echo "Parando serviços..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap para cleanup
trap cleanup SIGINT SIGTERM

echo "Iniciando Atual.bot v2.0 Pro..."

# Iniciar backend
echo "Iniciando backend..."
cd atual-bot-backend
source venv/bin/activate
python src/main.py &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
sleep 5

# Iniciar frontend
echo "Iniciando frontend..."
cd atual-bot-frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=================================="
echo "    ATUAL.BOT v2.0 PRO INICIADO"
echo "=================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Pressione Ctrl+C para parar"

# Aguardar
wait
EOF
    chmod +x start-all.sh
    
    # Script para Windows
    cat > start-all.bat << 'EOF'
@echo off
echo Iniciando Atual.bot v2.0 Pro...

echo Iniciando backend...
start cmd /k "cd atual-bot-backend && venv\Scripts\activate && python src/main.py"

timeout /t 5 /nobreak >nul

echo Iniciando frontend...
start cmd /k "cd atual-bot-frontend && npm run dev"

echo.
echo ==================================
echo     ATUAL.BOT v2.0 PRO INICIADO
echo ==================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Pressione qualquer tecla para continuar...
pause >nul
EOF
    
    print_color $GREEN "✓ Scripts de execução criados!"
}

# Função para mostrar instruções finais
show_final_instructions() {
    echo ""
    print_color $CYAN "=================================="
    print_color $CYAN "    INSTALAÇÃO CONCLUÍDA!"
    print_color $CYAN "=================================="
    echo ""
    print_color $GREEN "✓ Atual.bot v2.0 Pro instalado com sucesso!"
    echo ""
    print_color $YELLOW "Para iniciar a aplicação:"
    echo ""
    print_color $BLUE "Opção 1 - Iniciar tudo automaticamente:"
    print_color $WHITE "  ./start-all.sh"
    echo ""
    print_color $BLUE "Opção 2 - Iniciar manualmente:"
    print_color $WHITE "  Terminal 1: ./start-backend.sh"
    print_color $WHITE "  Terminal 2: ./start-frontend.sh"
    echo ""
    print_color $YELLOW "Acesse a aplicação em:"
    print_color $WHITE "  Frontend: http://localhost:3000"
    print_color $WHITE "  Backend:  http://localhost:5000"
    echo ""
    print_color $PURPLE "Suporte:"
    print_color $WHITE "  WhatsApp: +55 41 99777-1355 (Edu Lima)"
    print_color $WHITE "  Assistente: Chat integrado na plataforma"
    echo ""
    print_color $CYAN "Desenvolvido por Edu Lima - Eco Hub Center"
    print_color $CYAN "=================================="
    echo ""
}

# Função principal
main() {
    print_header
    
    # Detectar OS
    detect_os
    print_color $BLUE "Sistema detectado: $OS"
    
    # Verificar se estamos no diretório correto
    if [ ! -d "atual-bot-backend" ] || [ ! -d "atual-bot-frontend" ]; then
        print_color $RED "Erro: Diretórios do projeto não encontrados!"
        print_color $YELLOW "Certifique-se de estar no diretório raiz do projeto."
        exit 1
    fi
    
    # Instalar dependências baseado no OS
    case $OS in
        "ubuntu")
            install_ubuntu_deps
            ;;
        "centos")
            install_centos_deps
            ;;
        "macos")
            install_macos_deps
            ;;
        "windows")
            print_color $YELLOW "Para Windows, use o WSL ou instale manualmente:"
            print_color $WHITE "1. Python 3.11+ de https://python.org"
            print_color $WHITE "2. Node.js 20+ de https://nodejs.org"
            print_color $WHITE "3. Execute: pip install -r atual-bot-backend/requirements.txt"
            print_color $WHITE "4. Execute: cd atual-bot-frontend && npm install"
            exit 0
            ;;
        *)
            print_color $RED "Sistema operacional não suportado: $OSTYPE"
            print_color $YELLOW "Instale manualmente Python 3.11+ e Node.js 20+"
            exit 1
            ;;
    esac
    
    # Verificar instalações
    verify_installations
    
    # Instalar backend
    install_backend
    
    # Instalar frontend
    install_frontend
    
    # Criar scripts de execução
    create_run_scripts
    
    # Mostrar instruções finais
    show_final_instructions
}

# Executar função principal
main "$@"

