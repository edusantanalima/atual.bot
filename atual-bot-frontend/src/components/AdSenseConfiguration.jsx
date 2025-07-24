import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Key,
  TrendingUp,
  Eye,
  MousePointer,
  AlertTriangle,
  Info,
  Zap,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdSenseConfiguration = () => {
  const [config, setConfig] = useState({
    publisherId: '',
    adClientId: '',
    adSlotId: '',
    isEnabled: false,
    showAdsOnJobs: true,
    showAdsOnNews: true,
    adDisplayTime: 5,
    skipButtonDelay: 3
  });

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [earnings, setEarnings] = useState({
    today: 0,
    thisMonth: 0,
    totalClicks: 0,
    ctr: 0
  });

  useEffect(() => {
    // Simular dados de ganhos
    setEarnings({
      today: 12.45,
      thisMonth: 387.92,
      totalClicks: 1247,
      ctr: 2.8
    });
  }, []);

  const handleTestConnection = async () => {
    if (!config.publisherId || !config.adClientId) {
      alert('Preencha o Publisher ID e Ad Client ID');
      return;
    }

    setIsLoading(true);
    
    // Simular teste de conexão
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      alert('Conexão com AdSense estabelecida com sucesso!');
    }, 2000);
  };

  const handleSaveConfiguration = async () => {
    if (!isConnected) {
      alert('Teste a conexão primeiro');
      return;
    }

    // Aqui salvaria a configuração via API
    alert('Configuração do AdSense salva com sucesso!');
  };

  const handleToggleAds = (enabled) => {
    setConfig({ ...config, isEnabled: enabled });
    if (enabled && isConnected) {
      alert('Sistema de anúncios ativado!');
    } else if (!enabled) {
      alert('Sistema de anúncios desativado!');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-3 cyber-gradient rounded-xl">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configuração AdSense</h1>
          <p className="text-muted-foreground">
            Configure a monetização com Google AdSense
          </p>
        </div>
      </div>

      {/* Status e Ganhos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: 'Ganhos Hoje', 
            value: formatCurrency(earnings.today), 
            icon: TrendingUp, 
            color: 'cyber-gradient-green',
            change: '+15.2%'
          },
          { 
            title: 'Ganhos do Mês', 
            value: formatCurrency(earnings.thisMonth), 
            icon: DollarSign, 
            color: 'cyber-gradient',
            change: '+23.8%'
          },
          { 
            title: 'Total de Cliques', 
            value: earnings.totalClicks.toLocaleString(), 
            icon: MousePointer, 
            color: 'cyber-gradient-orange',
            change: '+8.5%'
          },
          { 
            title: 'CTR Médio', 
            value: `${earnings.ctr}%`, 
            icon: Eye, 
            color: 'cyber-gradient',
            change: '+2.1%'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-glow hover-scale glass cyber-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuração Principal */}
        <Card className="lg:col-span-2 glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configuração do AdSense</span>
            </CardTitle>
            <CardDescription>
              Configure suas credenciais do Google AdSense
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Estas configurações são específicas para sua conta. Mantenha suas credenciais seguras.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publisher-id">Publisher ID</Label>
                <Input
                  id="publisher-id"
                  placeholder="pub-1234567890123456"
                  value={config.publisherId}
                  onChange={(e) => setConfig({...config, publisherId: e.target.value})}
                  className="cyber-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-client-id">Ad Client ID</Label>
                <Input
                  id="ad-client-id"
                  placeholder="ca-pub-1234567890123456"
                  value={config.adClientId}
                  onChange={(e) => setConfig({...config, adClientId: e.target.value})}
                  className="cyber-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ad-slot-id">Ad Slot ID (Opcional)</Label>
              <Input
                id="ad-slot-id"
                placeholder="1234567890"
                value={config.adSlotId}
                onChange={(e) => setConfig({...config, adSlotId: e.target.value})}
                className="cyber-border"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleTestConnection}
                disabled={isLoading || !config.publisherId || !config.adClientId}
                className="cyber-gradient hover-glow"
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
                <Button
                  onClick={handleSaveConfiguration}
                  className="cyber-gradient-green hover-glow"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Salvar Configuração
                </Button>
              )}
            </div>

            {isConnected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 p-3 rounded-lg bg-green-500/20 text-green-500"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">AdSense conectado com sucesso!</span>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Configurações de Exibição */}
        <Card className="glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Configurações de Exibição</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-ads">Ativar Anúncios</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar sistema de monetização
                </p>
              </div>
              <Switch
                id="enable-ads"
                checked={config.isEnabled}
                onCheckedChange={handleToggleAds}
                disabled={!isConnected}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ads-jobs">Anúncios em Vagas</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar anúncios ao clicar em vagas
                </p>
              </div>
              <Switch
                id="ads-jobs"
                checked={config.showAdsOnJobs}
                onCheckedChange={(checked) => setConfig({...config, showAdsOnJobs: checked})}
                disabled={!config.isEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ads-news">Anúncios em Notícias</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar anúncios ao clicar em notícias
                </p>
              </div>
              <Switch
                id="ads-news"
                checked={config.showAdsOnNews}
                onCheckedChange={(checked) => setConfig({...config, showAdsOnNews: checked})}
                disabled={!config.isEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display-time">Tempo de Exibição (segundos)</Label>
              <Input
                id="display-time"
                type="number"
                min="3"
                max="30"
                value={config.adDisplayTime}
                onChange={(e) => setConfig({...config, adDisplayTime: parseInt(e.target.value)})}
                className="cyber-border"
                disabled={!config.isEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skip-delay">Delay do Botão Pular (segundos)</Label>
              <Input
                id="skip-delay"
                type="number"
                min="0"
                max="10"
                value={config.skipButtonDelay}
                onChange={(e) => setConfig({...config, skipButtonDelay: parseInt(e.target.value)})}
                className="cyber-border"
                disabled={!config.isEnabled}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status do Sistema */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Status do Sistema de Monetização</span>
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
                <p className="font-medium">Conexão AdSense</p>
                <p className="text-sm text-muted-foreground">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              {config.isEnabled ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className="font-medium">Sistema de Anúncios</p>
                <p className="text-sm text-muted-foreground">
                  {config.isEnabled ? 'Ativo' : 'Inativo'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-medium">Monetização</p>
                <p className="text-sm text-muted-foreground">
                  {config.isEnabled && isConnected ? 'Funcionando' : 'Pausada'}
                </p>
              </div>
            </div>
          </div>

          {!isConnected && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Configure suas credenciais do AdSense para começar a monetizar seu conteúdo.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdSenseConfiguration;

