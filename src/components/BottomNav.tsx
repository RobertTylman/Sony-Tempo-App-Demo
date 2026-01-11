import { motion } from "framer-motion";
import { Headphones, PersonStanding, Grip, Menu } from "lucide-react";

interface BottomNavProps {
  activeTab?: string;
}

const BottomNav = ({ activeTab = "scene" }: BottomNavProps) => {
  const tabs = [
    { id: "device", label: "My Device", icon: Headphones },
    { id: "scene", label: "Scene", icon: PersonStanding },
    { id: "discover", label: "Discover", icon: Grip },
    { id: "menu", label: "Menu", icon: Menu },
  ];

  return (
    <div className="flex items-center justify-around py-2 px-4 bg-background border-t border-border/30">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;
        
        return (
          <motion.button
            key={tab.id}
            className="flex flex-col items-center gap-1 py-1 px-3 relative"
            whileTap={{ scale: 0.95 }}
          >
            {isActive && tab.id === "scene" ? (
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
            ) : (
              <Icon className={`w-5 h-5 ${isActive ? "text-foreground" : "text-muted-foreground"}`} />
            )}
            <span className={`text-[10px] ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {tab.label}
            </span>
            {tab.id === "menu" && (
              <div className="absolute top-0.5 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BottomNav;
