import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Newspaper,
  Activity,
  Zap,
  MessageSquare,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RotatingBanner from './RotatingBanner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalNews: 0,
    totalGroups: 0,
    totalClicks: 0,
    activeAI: false,
    activeSocial: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simular carregamento de dados
    const loadDashboardData = async () => {
      // Em produção, isso viria das APIs
      setStats({
        totalJobs: 156,
        totalNews: 89,
        totalGroups: 12,
        totalClicks: 2847,
        activeAI: true,
        activeSocial: 2
      });

      setRecentActivity([
        { id: 1, type: 'job', title: 'Nova vaga publicada: Desenvolvedor React', time: '2 min atrás' },
        { id: 2, type: 'click', title: '15 cliques na vaga de Designer UX', time: '5 min atrás' },
        { id: 3, type: 'news', title: 'Notícia publicada: Tecnologia em 2024', time: '10 min atrás' },
        { id: 4, type: 'group', title: 'Novo grupo adicionado: TI Curitiba', time: '1 hora atrás' },
      ]);
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: "Vagas Ativas",
      value: stats.totalJobs,
      description: "Vagas publicadas este mês",
      icon: Briefcase,
      color: "text-blue-500",
      gradient: "cyber-gradient"
    },
    {
      title: "Notícias",
      value: stats.totalNews,
      description: "Notícias compartilhadas",
      icon: Newspaper,
      color: "text-green-500",
      gradient: "cyber-gradient-green"
    },
    {
      title: "Grupos Ativos",
      value: stats.totalGroups,
      description: "Grupos conectados",
      icon: Users,
      color: "text-purple-500",
      gradient: "cyber-gradient"
    },
    {
      title: "Total de Cliques",
      value: stats.totalClicks.toLocaleString(),
      description: "Engajamento total",
      icon: Eye,
      color: "text-orange-500",
      gradient: "cyber-gradient-orange"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'job': return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'news': return <Newspaper className="w-4 h-4 text-green-500" />;
      case 'click': return <Eye className="w-4 h-4 text-orange-500" />;
      case 'group': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel de controle do Atual.bot
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            stats.activeAI ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}>
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              IA {stats.activeAI ? 'Ativa' : 'Inativa'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-500">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">
              {stats.activeSocial} Redes Conectadas
            </span>
          </div>
        </div>
      </div>

      {/* Banner Rotativo */}
      <RotatingBanner />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-glow hover-scale glass cyber-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.gradient}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atividade Recente */}
        <Card className="lg:col-span-2 glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Últimas ações realizadas pelo sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status do Sistema */}
        <Card className="glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Status do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Coleta de Vagas</span>
                <div className="w-2 h-2 bg-green-500 rounded-full cyber-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Coleta de Notícias</span>
                <div className="w-2 h-2 bg-green-500 rounded-full cyber-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">WhatsApp</span>
                <div className="w-2 h-2 bg-green-500 rounded-full cyber-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Facebook</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full cyber-pulse"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Telegram</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            
            <Button className="w-full cyber-gradient hover-glow">
              Verificar Conexões
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

