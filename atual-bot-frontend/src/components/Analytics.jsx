import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  MessageSquare,
  Target,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({});

  // Dados simulados para demonstração
  const clicksData = [
    { date: '2024-01-14', clicks: 45, views: 120, conversions: 8 },
    { date: '2024-01-15', clicks: 52, views: 135, conversions: 12 },
    { date: '2024-01-16', clicks: 38, views: 98, conversions: 6 },
    { date: '2024-01-17', clicks: 67, views: 178, conversions: 15 },
    { date: '2024-01-18', clicks: 71, views: 189, conversions: 18 },
    { date: '2024-01-19', clicks: 58, views: 156, conversions: 11 },
    { date: '2024-01-20', clicks: 84, views: 234, conversions: 22 }
  ];

  const groupPerformance = [
    { name: 'Vagas TI Curitiba', clicks: 234, engagement: 85, members: 1247 },
    { name: 'Empregos São Paulo', clicks: 189, engagement: 72, members: 3421 },
    { name: 'Oportunidades RJ', clicks: 156, engagement: 91, members: 892 },
    { name: 'Freelancers Brasil', clicks: 98, engagement: 45, members: 567 },
    { name: 'Vagas Remotas', clicks: 267, engagement: 88, members: 2156 }
  ];

  const contentTypeData = [
    { name: 'Vagas de TI', value: 45, color: '#00d4ff' },
    { name: 'Vagas Gerais', value: 30, color: '#ff6b35' },
    { name: 'Notícias Tech', value: 15, color: '#10b981' },
    { name: 'Notícias Gerais', value: 10, color: '#8b5cf6' }
  ];

  const platformData = [
    { platform: 'WhatsApp', posts: 45, clicks: 234, engagement: 5.2 },
    { platform: 'Facebook', posts: 32, clicks: 189, engagement: 5.9 },
    { platform: 'Telegram', posts: 28, clicks: 156, engagement: 5.6 }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setAnalyticsData({
      totalClicks: 2847,
      totalViews: 8234,
      avgEngagement: 5.6,
      conversionRate: 12.3,
      topPerformingGroup: 'Vagas TI Curitiba',
      growthRate: 23.5
    });
  }, [timeRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Dados atualizados!');
    }, 2000);
  };

  const handleExport = () => {
    alert('Relatório exportado com sucesso!');
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return 'text-green-500';
    if (engagement >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 cyber-gradient rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Analytics e Relatórios</h1>
            <p className="text-muted-foreground">
              Acompanhe o desempenho das suas publicações e grupos
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 cyber-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            className="cyber-border"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>

          <Button onClick={handleExport} className="cyber-gradient hover-glow">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total de Cliques', 
            value: formatNumber(analyticsData.totalClicks || 0), 
            change: '+23.5%',
            icon: MousePointer, 
            color: 'cyber-gradient',
            trend: 'up'
          },
          { 
            title: 'Visualizações', 
            value: formatNumber(analyticsData.totalViews || 0), 
            change: '+18.2%',
            icon: Eye, 
            color: 'cyber-gradient-green',
            trend: 'up'
          },
          { 
            title: 'Taxa de Conversão', 
            value: `${analyticsData.conversionRate || 0}%`, 
            change: '+5.1%',
            icon: Target, 
            color: 'cyber-gradient-orange',
            trend: 'up'
          },
          { 
            title: 'Engajamento Médio', 
            value: `${analyticsData.avgEngagement || 0}%`, 
            change: '+12.8%',
            icon: TrendingUp, 
            color: 'cyber-gradient',
            trend: 'up'
          }
        ].map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-glow hover-scale glass cyber-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${kpi.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Cliques ao Longo do Tempo */}
        <Card className="glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance ao Longo do Tempo</span>
            </CardTitle>
            <CardDescription>
              Cliques, visualizações e conversões nos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={clicksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  name="Visualizações"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stackId="1"
                  stroke="#00d4ff"
                  fill="#00d4ff"
                  fillOpacity={0.6}
                  name="Cliques"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.8}
                  name="Conversões"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Tipo de Conteúdo */}
        <Card className="glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Distribuição por Tipo de Conteúdo</span>
            </CardTitle>
            <CardDescription>
              Performance por categoria de publicação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance por Grupo */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Performance por Grupo</span>
          </CardTitle>
          <CardDescription>
            Ranking dos grupos com melhor desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupPerformance.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Badge className="cyber-gradient">
                    #{index + 1}
                  </Badge>
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(group.members)} membros
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{group.clicks}</p>
                    <p className="text-xs text-muted-foreground">Cliques</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getEngagementColor(group.engagement)}`}>
                      {group.engagement}%
                    </p>
                    <p className="text-xs text-muted-foreground">Engajamento</p>
                  </div>
                  <div className="w-32">
                    <Progress value={group.engagement} className="h-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance por Plataforma */}
      <Card className="glass cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Performance por Plataforma</span>
          </CardTitle>
          <CardDescription>
            Comparativo de desempenho entre redes sociais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="platform" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="posts" fill="#8b5cf6" name="Publicações" />
              <Bar dataKey="clicks" fill="#00d4ff" name="Cliques" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

