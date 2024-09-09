import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

// Utility function for conditional classNames
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// FloatingNav component
export const FloatingNav = ({ navItems, className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-color1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-12 py-3 items-center justify-center space-x-5", // Adjusted padding and spacing
          className
        )}
      >
        {/* New website name item */}
        <div className="flex items-center space-x-3 text-black font-serif"> {/* Adjusted spacing */}
          <span className="text-3xl font-extrabold font-cursive">Luno</span> {/* Adjusted font size */}
        </div>

        {navItems.map((navItem, idx) => (
          <motion.div
            key={`item=${idx}`}
            className={cn(
              "relative items-center flex space-x-2 text-black cursor-pointer" // Adjusted spacing
            )}
            whileHover={{
              scale: 1.1,
              color: '#00000', // Orange color
              transition: { duration: 0.3 },
            }}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-base">{navItem.name}</span> {/* Adjusted font size */}
          </motion.div>
        ))}
        <motion.button
          className="border text-sm font-medium relative border-neutral-200 bg-secondary text-black px-5 py-3 rounded-full" // Adjusted padding
          
        >
          <span>Get Started</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent h-px" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

// FloatingNavDemo component
const FloatingNavDemo = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-5 w-5 text-black" />, // Adjusted icon size
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-5 w-5 text-black" />, // Adjusted icon size
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-5 w-5 text-black" />, // Adjusted icon size
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

// Default export
export default FloatingNavDemo;
