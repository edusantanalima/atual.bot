import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Key, 
  CheckCircle, 
  XCircle, 
  Settings,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AIConfiguration = () => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const aiProviders = [
    { 
      id: 'chatgpt-4o', 
      name: 'ChatGPT-4o', 
      description: 'Modelo mais avançado da OpenAI',
      icon: '🤖',
      tier: 'Premium'
    },
    { 
      id: 'chatgpt-4-turbo', 
      name: 'ChatGPT-4 Turbo', 
      description: 'Versão otimizada do GPT-4',
      icon: '⚡',
      tier: 'Premium'
    },
    { 
      id: 'chatgpt-3.5-turbo', 
      name: 'ChatGPT-3.5 Turbo', 
      description: 'Modelo rápido e eficiente',
      icon: '🚀',
      tier: 'Standard'
    },
    { 
      id: 'gemini-1.5-pro', 
      name: 'Gemini 1.5 Pro', 
      description: 'IA avançada do Google',
      icon: '💎',
      tier: 'Premium'
    },
    { 
      id: 'gemini-1.5-flash', 
      name: 'Gemini 1.5 Flash', 
      description: 'Versão rápida do Gemini',
      icon: '⚡',
      tier: 'Standard'
    },
    { 
      id: 'claude-3-opus', 
      name: 'Claude 3 Opus', 
      description: 'IA da Anthropic - Mais poderosa',
      icon: '🎭',
      tier: 'Premium'
    },
    { 
      id: 'claude-3-sonnet', 
      name: 'Claude 3 Sonnet', 
      description: 'Equilibrio entre performance e custo',
      icon: '🎵',
      tier: 'Standard'
    },
    { 
      id: 'claude-3-haiku', 
      name: 'Claude 3 Haiku', 
      description: 'Versão rápida e econômica',
      icon: '🌸',
      tier: 'Basic'
    },
    { 
      id: 'llama-3', 
      name: 'Llama 3', 
      description: 'IA open-source da Meta',
      icon: '🦙',
      tier: 'Standard'
    },
    { 
      id: 'mistral-large', 
      name: 'Mistral Large', 
      description: 'IA europeia de alta performance',
      icon: '🌪️',
      tier: 'Premium'
    },
    { 
      id: 'qwen', 
      name: 'Qwen (Tongyi Qianwen)', 
      description: 'IA da Alibaba Cloud',
      icon: '🐉',
      tier: 'Standard'
    },
    { 
      id: 'command-r-plus', 
      name: 'Command R+', 
      description: 'IA da Cohere para empresas',
      icon: '⚔️',
      tier: 'Premium'
    },
    { 
      id: 'perplexity-online', 
      name: 'Perplexity Online', 
      description: 'IA com acesso à internet',
      icon: '🔍',
      tier: 'Premium'
    },
    { 
      id: 'manus', 
      name: 'Manus', 
      description: 'IA especializada em automação',
      icon: '🤖',
      tier: 'Premium'
    }
  ];

  const handleTestConnection = async () => {
    if (!selectedProvider || !apiKey) {
      alert('Selecione um provedor e insira a chave API');
      return;
    }

    setIsLoading(true);
    
    // Simular teste de conexão
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleSaveConfiguration = async () => {
    if (!isConnected) {
      alert('Teste a conexão primeiro');
      return;
    }

    // Aqui salvaria a configuração via API
    alert('Configuração salva com sucesso!');
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Premium': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Standard': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Basic': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 cyber-gradient rounded-xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configuração de IA</h1>
          <p className="text-muted-foreground">
            Configure o provedor de inteligência artificial para o seu bot
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seleção de Provedor */}
        <Card className="lg:col-span-2 glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Selecionar Provedor de IA</span>
            </CardTitle>
            <CardDescription>
              Escolha o provedor de IA que melhor atende às suas necessidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiProviders.map((provider) => (
                <motion.div
                  key={provider.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProvider === provider.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getTierColor(provider.tier)}>
                      {provider.tier}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuração */}
        <Card className="glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configuração</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProvider && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">
                      {aiProviders.find(p => p.id === selectedProvider)?.icon}
                    </span>
                    <span className="font-medium">
                      {aiProviders.find(p => p.id === selectedProvider)?.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {aiProviders.find(p => p.id === selectedProvider)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">Chave API</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Insira sua chave API"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="cyber-border"
                  />
                </div>

                <Button
                  onClick={handleTestConnection}
                  disabled={isLoading || !apiKey}
                  className="w-full cyber-gradient hover-glow"
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Testando...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      Testar Conexão
                    </>
                  )}
                </Button>

                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/20 text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Conexão estabelecida!</span>
                  </motion.div>
                )}

                {isConnected && (
                  <Button
                    onClick={handleSaveConfiguration}
                    className="w-full cyber-gradient-green hover-glow"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Salvar Configuração
                  </Button>
                )}
              </motion.div>
            )}

            {!selectedProvider && (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecione um provedor de IA para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status da IA */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Status da Inteligência Artificial</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              {isConnected ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className="font-medium">Conexão</p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'Ativa' : 'Inativa'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Bot className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-medium">Modo</p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'IA Ativa' : 'Script Básico'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-medium">Recursos</p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'Avançados' : 'Básicos'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConfiguration;

