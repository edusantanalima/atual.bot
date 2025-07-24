import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  Minimize2,
  Maximize2,
  HelpCircle,
  Settings,
  Zap,
  Book,
  Code,
  Server,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState(false); // false = base de conhecimento, true = IA
  const messagesEndRef = useRef(null);

  // Base de conhecimento embarcada
  const knowledgeBase = {
    'configuração': {
      title: 'Configuração da Ferramenta',
      content: `Para configurar o Atual.bot, siga estes passos:

1. **Configuração de IA**: Acesse o menu "IA" e selecione seu provedor preferido (ChatGPT, Gemini, Claude, etc.). Insira sua chave API e teste a conexão.

2. **Configuração de Vagas**: No menu "Vagas", configure os filtros de coleta (estado, cidade, salário mínimo, categoria). Todos os 27 estados do Brasil estão disponíveis.

3. **Configuração de Grupos**: O sistema detecta automaticamente os grupos onde você está conectado. Use o menu "Grupos" para gerenciar e descobrir novos grupos.

4. **Configuração do AdSense**: No menu "AdSense", configure suas credenciais para monetização (Publisher ID, Ad Client ID).`,
      tags: ['configuração', 'setup', 'inicial']
    },
    'instalação': {
      title: 'Instalação e Deploy',
      content: `**Requisitos do Sistema:**
- Python 3.11+
- Node.js 20+
- 2GB RAM mínimo
- 10GB espaço em disco

**Instalação Local:**
1. Extraia o arquivo ZIP
2. Execute: \`cd atual-bot-backend && pip install -r requirements.txt\`
3. Execute: \`cd atual-bot-frontend && npm install\`
4. Inicie o backend: \`python src/main.py\`
5. Inicie o frontend: \`npm run dev\`

**Deploy em Produção:**
- **VPS Recomendadas**: DigitalOcean, Linode, AWS EC2
- **Configuração mínima**: 2GB RAM, 2 vCPUs
- **Portas necessárias**: 5000 (backend), 3000 (frontend)
- **SSL**: Configure certificado SSL para HTTPS`,
      tags: ['instalação', 'deploy', 'servidor', 'vps']
    },
    'grupos': {
      title: 'Gerenciamento de Grupos',
      content: `**Como Funciona:**
O sistema detecta automaticamente todos os grupos onde sua conta está conectada (WhatsApp, Facebook, Telegram).

**Recursos Disponíveis:**
- Ranking automático por engajamento
- Análise de qualidade dos grupos
- Descoberta de novos grupos com IA
- Métricas detalhadas (membros, mensagens/dia)

**Conectar Contas:**
1. WhatsApp: Escaneie o QR Code
2. Facebook: Faça login via OAuth
3. Telegram: Use o Bot Token

**Dicas:**
- Grupos com 80%+ de engajamento são considerados excelentes
- O sistema prioriza grupos com mais atividade
- Use a busca inteligente para encontrar grupos relevantes`,
      tags: ['grupos', 'whatsapp', 'facebook', 'telegram']
    },
    'vagas': {
      title: 'Sistema de Vagas',
      content: `**Coleta Automática:**
O sistema coleta vagas automaticamente baseado nos filtros configurados.

**Filtros Disponíveis:**
- Estado: Todos os 27 estados do Brasil
- Cidade: Qualquer cidade brasileira
- Salário: Faixas de R$ 1.000 a R$ 10.000+
- Categoria: 15+ categorias profissionais
- Palavras-chave: Termos específicos

**Funcionamento:**
1. Configure os filtros desejados
2. Clique em "Iniciar Coleta"
3. O sistema busca vagas 24/7
4. Vagas são publicadas automaticamente nos grupos
5. Acompanhe o desempenho no Analytics

**Com IA Ativa:**
- Análise inteligente de qualidade das vagas
- Filtragem automática de spam
- Otimização de horários de postagem`,
      tags: ['vagas', 'coleta', 'filtros', 'automação']
    },
    'monetização': {
      title: 'Sistema de Monetização',
      content: `**Google AdSense:**
Configure suas credenciais do AdSense para monetizar o tráfego.

**Configuração:**
1. Publisher ID: Seu ID do AdSense (pub-xxxxxxxxx)
2. Ad Client ID: ID do cliente (ca-pub-xxxxxxxxx)
3. Ad Slot ID: ID do slot (opcional)

**Como Funciona:**
- Quando alguém clica em uma vaga/notícia
- Uma página intermediária com anúncio é exibida
- Após alguns segundos, o usuário pode prosseguir
- Você ganha por cada visualização/clique

**Configurações:**
- Tempo de exibição: 3-30 segundos
- Delay do botão pular: 0-10 segundos
- Ativar/desativar por tipo de conteúdo

**Ganhos Esperados:**
- Depende do tráfego e nicho
- CTR médio: 1-5%
- RPM: $0.50-$5.00`,
      tags: ['monetização', 'adsense', 'ganhos', 'anúncios']
    },
    'analytics': {
      title: 'Analytics e Relatórios',
      content: `**Métricas Disponíveis:**
- Total de cliques e visualizações
- Taxa de conversão
- Engajamento por grupo
- Performance por plataforma
- Ganhos do AdSense

**Gráficos:**
- Performance ao longo do tempo
- Distribuição por tipo de conteúdo
- Ranking de grupos
- Comparativo entre plataformas

**Exportação:**
- Relatórios em PDF
- Dados em CSV
- Gráficos em PNG

**Filtros:**
- Últimas 24h, 7 dias, 30 dias, 90 dias
- Por grupo específico
- Por tipo de conteúdo
- Por plataforma`,
      tags: ['analytics', 'relatórios', 'métricas', 'gráficos']
    },
    'ia': {
      title: 'Inteligência Artificial',
      content: `**Provedores Suportados:**
- ChatGPT (3.5, 4, 4o)
- Gemini (1.5 Pro, Flash)
- Claude (3 Opus, Sonnet, Haiku)
- Llama 3, Mistral, Qwen
- Manus, Perplexity, Command R+

**Funcionalidades com IA:**
- Análise inteligente de grupos
- Otimização de conteúdo
- Filtragem automática de spam
- Sugestões de melhoria
- Análise de sentimento

**Modo Dual:**
- **Sem IA**: Funciona como script básico
- **Com IA**: Recursos avançados ativados

**Configuração:**
1. Selecione o provedor
2. Insira a chave API
3. Teste a conexão
4. Salve a configuração

**Custos:**
- Varia por provedor
- Uso moderado: $5-20/mês
- Uso intenso: $20-100/mês`,
      tags: ['ia', 'chatgpt', 'gemini', 'claude', 'api']
    },
    'troubleshooting': {
      title: 'Solução de Problemas',
      content: `**Problemas Comuns:**

**1. Erro de Conexão com IA:**
- Verifique se a chave API está correta
- Confirme se há créditos na conta
- Teste com outro provedor

**2. Grupos Não Aparecem:**
- Verifique se está logado nas contas
- Reescaneie o QR Code do WhatsApp
- Reconecte as contas sociais

**3. Vagas Não São Coletadas:**
- Verifique os filtros configurados
- Confirme se a coleta está ativa
- Verifique a conexão com internet

**4. AdSense Não Funciona:**
- Confirme as credenciais
- Verifique se a conta está aprovada
- Teste com anúncios de teste

**5. Performance Lenta:**
- Verifique recursos do servidor
- Otimize os filtros de busca
- Considere upgrade do plano`,
      tags: ['problemas', 'erro', 'troubleshooting', 'suporte']
    }
  };

  const quickActions = [
    { icon: Settings, label: 'Configuração Inicial', query: 'configuração' },
    { icon: Server, label: 'Como Instalar', query: 'instalação' },
    { icon: Smartphone, label: 'Conectar Grupos', query: 'grupos' },
    { icon: Zap, label: 'Configurar IA', query: 'ia' },
    { icon: HelpCircle, label: 'Problemas', query: 'troubleshooting' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: `Olá! 👋 Sou o assistente do Atual.bot.

Posso ajudar você com:
• Configuração da ferramenta
• Instalação e deploy
• Gerenciamento de grupos
• Sistema de IA e monetização
• Solução de problemas

${aiMode ? '🤖 **Modo IA Ativo** - Respostas inteligentes' : '📚 **Modo Base de Conhecimento** - Respostas rápidas'}

Como posso ajudar você hoje?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, aiMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular resposta do assistente
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Buscar na base de conhecimento
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.tags.some(tag => lowerQuery.includes(tag)) || lowerQuery.includes(key)) {
        return `**${data.title}**\n\n${data.content}`;
      }
    }

    // Respostas para perguntas específicas
    if (lowerQuery.includes('preço') || lowerQuery.includes('custo')) {
      return `**Custos do Atual.bot:**

• **Ferramenta**: Licença única (consulte o desenvolvedor)
• **Hospedagem**: $10-50/mês (VPS)
• **IA**: $5-100/mês (dependendo do uso)
• **AdSense**: Gratuito (Google)

**ROI Esperado:**
Com boa configuração, a ferramenta pode se pagar em 1-3 meses através da monetização.`;
    }

    if (lowerQuery.includes('suporte') || lowerQuery.includes('ajuda')) {
      return `**Canais de Suporte:**

• **WhatsApp**: +55 41 99777-1355 (Edu Lima)
• **Documentação**: Menu "Ajuda" da ferramenta
• **Este Assistente**: Disponível 24/7

**Horário de Atendimento:**
Segunda a Sexta: 9h às 18h (horário de Brasília)

**Tempo de Resposta:**
• WhatsApp: Até 2 horas
• Email: Até 24 horas`;
    }

    // Resposta padrão
    return `Desculpe, não encontrei informações específicas sobre "${query}".

**Tópicos que posso ajudar:**
• Configuração e instalação
• Gerenciamento de grupos
• Sistema de IA
• Monetização com AdSense
• Analytics e relatórios
• Solução de problemas

Ou entre em contato via WhatsApp: +55 41 99777-1355`;
  };

  const handleQuickAction = (query) => {
    setInputMessage(query);
    handleSendMessage();
  };

  const toggleAiMode = () => {
    setAiMode(!aiMode);
    const modeMessage = {
      id: Date.now(),
      type: 'system',
      content: `Modo ${!aiMode ? 'IA' : 'Base de Conhecimento'} ativado!`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, modeMessage]);
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full cyber-gradient hover-glow shadow-lg"
          title="Assistente de Suporte"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-6 left-6 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      } bg-background border border-border rounded-lg shadow-2xl glass cyber-border`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 cyber-gradient rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Atual.bot</h3>
            <div className="flex items-center space-x-2">
              <Badge variant={aiMode ? 'default' : 'outline'} className="text-xs">
                {aiMode ? '🤖 IA' : '📚 KB'}
              </Badge>
              <span className="text-xs text-green-500">● Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAiMode}
            title={`Alternar para modo ${aiMode ? 'Base de Conhecimento' : 'IA'}`}
          >
            <Zap className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.query)}
                    className="justify-start text-xs cyber-border"
                  >
                    <Icon className="w-3 h-3 mr-2" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'cyber-gradient text-white'
                        : message.type === 'system'
                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua pergunta..."
                className="flex-1 cyber-border"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="cyber-gradient hover-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChatAssistant;

