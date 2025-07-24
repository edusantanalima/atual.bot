import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Users, 
  Briefcase, 
  Newspaper, 
  BarChart3, 
  Zap, 
  HelpCircle,
  Menu,
  X,
  Bot,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Vagas', icon: Briefcase },
    { id: 'news', label: 'Notícias', icon: Newspaper },
    { id: 'groups', label: 'Grupos', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai', label: 'IA', icon: Bot },
    { id: 'adsense', label: 'AdSense', icon: DollarSign },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border glass flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 cyber-gradient rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold cyber-gradient bg-clip-text text-transparent">
                    Atual.bot
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    v2.0 Pro
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover-glow"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive 
                    ? 'cyber-gradient text-white shadow-lg' 
                    : 'hover:bg-sidebar-accent'
                } ${isCollapsed ? 'px-3' : 'px-4'}`}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-muted-foreground"
              >
                <p>Desenvolvido por</p>
                <p className="font-semibold">Edu Lima - Eco Hub Center</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

