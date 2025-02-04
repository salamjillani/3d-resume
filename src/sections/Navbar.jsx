import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => (
  <motion.ul 
    className="flex space-x-6 items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {navLinks.map((item) => (
      <motion.li 
        key={item.id} 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a 
          href={item.href} 
          className="text-neutral-300 hover:text-white transition-all duration-300 ease-in-out font-medium tracking-wider text-sm uppercase"
          onClick={onClick}
        >
          {item.name}
        </a>
      </motion.li>
    ))}
  </motion.ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/90 via-neutral-900/90 to-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.a 
            href="/" 
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-2xl hover:from-cyan-300 hover:to-blue-500 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            SALAM
          </motion.a>

          <motion.button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <img 
              src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} 
              alt="toggle" 
              className="w-6 h-6 transition-transform duration-300" 
            />
          </motion.button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <motion.div 
        className={`absolute w-full bg-neutral-900/95 backdrop-blur-md transform transition-all duration-500 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="p-6">
          <NavItems onClick={closeMenu} />
        </nav>
      </motion.div>
    </motion.header>
  );
};

NavItems.propTypes = {
  onClick: PropTypes.func,
};

export default Navbar;