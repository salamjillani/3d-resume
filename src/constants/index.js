export const calculateSizes = (isSmall, isMobile, isTablet) => {
  if (isSmall) {
    return {
      deskScale: 0.6,
      deskPosition: [0, -2, 0],
      reactLogoPosition: [2, 3, 0]
    };
  }
  
  if (isMobile) {
    return {
      deskScale: 0.8,
      deskPosition: [0, -1.5, 0],
      reactLogoPosition: [2.5, 3.5, 0]
    };
  }
  
  if (isTablet) {
    return {
      deskScale: 1,
      deskPosition: [0, -1, 0],
      reactLogoPosition: [3, 4, 0]
    };
  }
  
  return {
    deskScale: 1.2,
    deskPosition: [0, -0.5, 0],
    reactLogoPosition: [3.5, 4.5, 0]
  };
};

export const navLinks = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'contact', name: 'Contact', href: '#contact' }
];