import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Filter,
  Search,
  Plus,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const JobsManagement = () => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [filters, setFilters] = useState({
    estado: '',
    cidade: '',
    salarioMinimo: '',
    categoria: '',
    palavrasChave: ''
  });

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    pending: 0,
    clicks: 0
  });

  const estadosBrasil = [
    'AC - Acre', 'AL - Alagoas', 'AP - Amapá', 'AM - Amazonas',
    'BA - Bahia', 'CE - Ceará', 'DF - Distrito Federal', 'ES - Espírito Santo',
    'GO - Goiás', 'MA - Maranhão', 'MT - Mato Grosso', 'MS - Mato Grosso do Sul',
    'MG - Minas Gerais', 'PA - Pará', 'PB - Paraíba', 'PR - Paraná',
    'PE - Pernambuco', 'PI - Piauí', 'RJ - Rio de Janeiro', 'RN - Rio Grande do Norte',
    'RS - Rio Grande do Sul', 'RO - Rondônia', 'RR - Roraima', 'SC - Santa Catarina',
    'SP - São Paulo', 'SE - Sergipe', 'TO - Tocantins'
  ];

  const categorias = [
    'Tecnologia', 'Vendas', 'Marketing', 'Administração', 'Recursos Humanos',
    'Financeiro', 'Engenharia', 'Saúde', 'Educação', 'Jurídico',
    'Design', 'Logística', 'Produção', 'Atendimento', 'Outros'
  ];

  const salarioOptions = [
    { value: '1000', label: 'Acima de R$ 1.000' },
    { value: '1500', label: 'Acima de R$ 1.500' },
    { value: '2000', label: 'Acima de R$ 2.000' },
    { value: '2500', label: 'Acima de R$ 2.500' },
    { value: '3000', label: 'Acima de R$ 3.000' },
    { value: '4000', label: 'Acima de R$ 4.000' },
    { value: '5000', label: 'Acima de R$ 5.000' },
    { value: '7500', label: 'Acima de R$ 7.500' },
    { value: '10000', label: 'Acima de R$ 10.000' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setStats({
      total: 156,
      published: 89,
      pending: 67,
      clicks: 2847
    });

    setJobs([
      {
        id: 1,
        title: 'Desenvolvedor React Senior',
        company: 'Tech Solutions',
        location: 'Curitiba, PR',
        salary: 'R$ 8.000 - R$ 12.000',
        category: 'Tecnologia',
        status: 'published',
        clicks: 45,
        publishedAt: '2024-01-20'
      },
      {
        id: 2,
        title: 'Designer UX/UI',
        company: 'Creative Agency',
        location: 'São Paulo, SP',
        salary: 'R$ 6.000 - R$ 9.000',
        category: 'Design',
        status: 'pending',
        clicks: 23,
        publishedAt: '2024-01-19'
      },
      {
        id: 3,
        title: 'Analista de Marketing Digital',
        company: 'Marketing Pro',
        location: 'Rio de Janeiro, RJ',
        salary: 'R$ 4.500 - R$ 7.000',
        category: 'Marketing',
        status: 'published',
        clicks: 67,
        publishedAt: '2024-01-18'
      }
    ]);
  }, []);

  const handleStartCollection = () => {
    setIsCollecting(true);
    // Simular coleta
    setTimeout(() => {
      setIsCollecting(false);
      alert('Coleta de vagas iniciada! Novas vagas serão adicionadas automaticamente.');
    }, 3000);
  };

  const handleSaveFilters = () => {
    alert('Filtros salvos com sucesso!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Publicada';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitada';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 cyber-gradient rounded-xl">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de Vagas</h1>
            <p className="text-muted-foreground">
              Configure filtros e gerencie a coleta automática de vagas
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={handleStartCollection}
            disabled={isCollecting}
            className={`${isCollecting ? 'cyber-gradient-orange' : 'cyber-gradient'} hover-glow`}
          >
            {isCollecting ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Coletando...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar Coleta
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total de Vagas', value: stats.total, icon: Briefcase, color: 'cyber-gradient' },
          { title: 'Publicadas', value: stats.published, icon: TrendingUp, color: 'cyber-gradient-green' },
          { title: 'Pendentes', value: stats.pending, icon: Clock, color: 'cyber-gradient-orange' },
          { title: 'Total de Cliques', value: stats.clicks, icon: Users, color: 'cyber-gradient' }
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filtros de Vagas */}
        <Card className="lg:col-span-1 glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros de Coleta</span>
            </CardTitle>
            <CardDescription>
              Configure os critérios para coleta automática de vagas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={filters.estado} onValueChange={(value) => setFilters({...filters, estado: value})}>
                <SelectTrigger className="cyber-border">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosBrasil.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                placeholder="Ex: Curitiba"
                value={filters.cidade}
                onChange={(e) => setFilters({...filters, cidade: e.target.value})}
                className="cyber-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salario">Salário Mínimo</Label>
              <Select value={filters.salarioMinimo} onValueChange={(value) => setFilters({...filters, salarioMinimo: value})}>
                <SelectTrigger className="cyber-border">
                  <SelectValue placeholder="Selecione o salário mínimo" />
                </SelectTrigger>
                <SelectContent>
                  {salarioOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={filters.categoria} onValueChange={(value) => setFilters({...filters, categoria: value})}>
                <SelectTrigger className="cyber-border">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="palavras-chave">Palavras-chave</Label>
              <Input
                id="palavras-chave"
                placeholder="Ex: react, javascript, remoto"
                value={filters.palavrasChave}
                onChange={(e) => setFilters({...filters, palavrasChave: e.target.value})}
                className="cyber-border"
              />
            </div>

            <Button onClick={handleSaveFilters} className="w-full cyber-gradient hover-glow">
              <Settings className="w-4 h-4 mr-2" />
              Salvar Filtros
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Vagas */}
        <Card className="lg:col-span-2 glass cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Vagas Coletadas</span>
            </CardTitle>
            <CardDescription>
              Últimas vagas encontradas pelos filtros configurados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusText(job.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{job.clicks} cliques</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{job.publishedAt}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobsManagement;

