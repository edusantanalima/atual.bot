import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Search,
  Plus,
  Settings,
  Eye,
  Star,
  Activity,
  Smartphone,
  Facebook,
  Send,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const GroupsManagement = () => {
  const [connectedGroups, setConnectedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Simular dados de grupos conectados
    setConnectedGroups([
      {
        id: 1,
        name: 'Vagas TI Curitiba',
        platform: 'whatsapp',
        members: 1247,
        engagement: 85,
        messagesPerDay: 45,
        lastActivity: '2 min atrás',
        status: 'active',
        ranking: 1,
        description: 'Grupo focado em vagas de tecnologia em Curitiba e região'
      },
      {
        id: 2,
        name: 'Empregos São Paulo',
        platform: 'facebook',
        members: 3421,
        engagement: 72,
        messagesPerDay: 89,
        lastActivity: '15 min atrás',
        status: 'active',
        ranking: 2,
        description: 'Grupo geral de empregos na cidade de São Paulo'
      },
      {
        id: 3,
        name: 'Oportunidades RJ',
        platform: 'telegram',
        members: 892,
        engagement: 91,
        messagesPerDay: 23,
        lastActivity: '1 hora atrás',
        status: 'active',
        ranking: 3,
        description: 'Canal de oportunidades profissionais no Rio de Janeiro'
      },
      {
        id: 4,
        name: 'Freelancers Brasil',
        platform: 'whatsapp',
        members: 567,
        engagement: 45,
        messagesPerDay: 12,
        lastActivity: '3 horas atrás',
        status: 'low_activity',
        ranking: 4,
        description: 'Grupo para freelancers de diversas áreas'
      },
      {
        id: 5,
        name: 'Vagas Remotas',
        platform: 'telegram',
        members: 2156,
        engagement: 88,
        messagesPerDay: 67,
        lastActivity: '30 min atrás',
        status: 'active',
        ranking: 5,
        description: 'Canal especializado em vagas de trabalho remoto'
      }
    ]);
  }, []);

  const handleScanGroups = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert('Varredura concluída! 3 novos grupos encontrados.');
    }, 3000);
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'whatsapp': return <Smartphone className="w-5 h-5 text-green-500" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-500" />;
      case 'telegram': return <Send className="w-5 h-5 text-blue-400" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'low_activity': return 'text-yellow-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return 'text-green-500';
    if (engagement >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRankingBadge = (ranking) => {
    if (ranking <= 3) return 'cyber-gradient';
    if (ranking <= 5) return 'cyber-gradient-orange';
    return 'bg-gray-500';
  };

  const filteredGroups = connectedGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 cyber-gradient rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de Grupos</h1>
            <p className="text-muted-foreground">
              Gerencie grupos conectados e descubra novos com IA
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={handleScanGroups}
            disabled={isScanning}
            className="cyber-gradient hover-glow"
          >
            {isScanning ? (
              <>
                <Search className="w-4 h-4 mr-2 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Descobrir Grupos
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: 'Grupos Conectados', 
            value: connectedGroups.length, 
            icon: Users, 
            color: 'cyber-gradient',
            description: 'Total de grupos ativos'
          },
          { 
            title: 'Membros Totais', 
            value: connectedGroups.reduce((sum, group) => sum + group.members, 0).toLocaleString(), 
            icon: TrendingUp, 
            color: 'cyber-gradient-green',
            description: 'Alcance total'
          },
          { 
            title: 'Engajamento Médio', 
            value: Math.round(connectedGroups.reduce((sum, group) => sum + group.engagement, 0) / connectedGroups.length) + '%', 
            icon: Activity, 
            color: 'cyber-gradient-orange',
            description: 'Taxa de interação'
          },
          { 
            title: 'Mensagens/Dia', 
            value: connectedGroups.reduce((sum, group) => sum + group.messagesPerDay, 0), 
            icon: MessageSquare, 
            color: 'cyber-gradient',
            description: 'Volume de mensagens'
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
                    <Badge variant="outline">{stat.description}</Badge>
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

      {/* Search and Filters */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Buscar Grupos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 cyber-border"
            />
            <Button variant="outline" className="cyber-border">
              <Settings className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups List */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Ranking de Grupos por Engajamento</span>
          </CardTitle>
          <CardDescription>
            Grupos ordenados por performance e qualidade de engajamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={getRankingBadge(group.ranking)}>
                      #{group.ranking}
                    </Badge>
                    {getPlatformIcon(group.platform)}
                    <div>
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {group.status === 'active' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{group.members.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Membros</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getEngagementColor(group.engagement)}`}>
                      {group.engagement}%
                    </p>
                    <p className="text-xs text-muted-foreground">Engajamento</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{group.messagesPerDay}</p>
                    <p className="text-xs text-muted-foreground">Msgs/Dia</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{group.lastActivity}</p>
                    <p className="text-xs text-muted-foreground">Última atividade</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Qualidade do Grupo</span>
                    <span className={getEngagementColor(group.engagement)}>
                      {group.engagement >= 80 ? 'Excelente' : 
                       group.engagement >= 60 ? 'Boa' : 'Regular'}
                    </span>
                  </div>
                  <Progress value={group.engagement} className="h-2" />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="cyber-border">
                    <Eye className="w-4 h-4 mr-2" />
                    Detalhes
                  </Button>
                  <Button variant="outline" size="sm" className="cyber-border">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupsManagement;

