import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Automação WhatsApp",
      subtitle: "Poste vagas automaticamente nos grupos do WhatsApp",
      icon: "📱",
      gradient: "cyber-gradient"
    },
    {
      id: 2,
      title: "Integração Facebook",
      subtitle: "Publique conteúdo nos grupos do Facebook com inteligência",
      icon: "📘",
      gradient: "cyber-gradient-orange"
    },
    {
      id: 3,
      title: "Telegram & Canais",
      subtitle: "Alcance sua audiência no Telegram e canais especializados",
      icon: "✈️",
      gradient: "cyber-gradient-green"
    },
    {
      id: 4,
      title: "IA Integrada",
      subtitle: "Powered by AI para máxima eficiência e engajamento",
      icon: "🤖",
      gradient: "cyber-gradient"
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative h-32 overflow-hidden rounded-xl cyber-border glass">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${banners[currentBanner].gradient} p-6 flex items-center justify-between text-white`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-4xl float">
              {banners[currentBanner].icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">
                {banners[currentBanner].title}
              </h3>
              <p className="text-sm opacity-90">
                {banners[currentBanner].subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentBanner 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingBanner;

