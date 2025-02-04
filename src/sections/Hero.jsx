import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import ReactLogo from '../components/ReactLogo.jsx';
import HackerRoom from '../components/HackerRoom';
import Button from '../components/Button';
import CanvasLoader from '../components/Loading';


const calculateSizes = (isSmall, isMobile, isTablet) => {
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

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section 
      className="min-h-screen w-full flex flex-col relative bg-gradient-to-br from-neutral-900 via-black to-neutral-900" 
      id="home"
    >

      <motion.div 
        className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-5 z-10 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p 
          className="sm:text-4xl text-2xl font-light text-white text-center font-generalsans tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hi, I&apos;m Abdul Salam <span className="animate-wave inline-block">👋</span>
        </motion.p>
        
        <motion.p 
          className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-center tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
        >
          Full Stack Developer
        </motion.p>
      </motion.div>

      <div className="w-full h-full absolute inset-0">
        <Canvas 
          className="w-full h-full"
          camera={{ position: [0, 0, 30] }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <group>
           
           <ReactLogo position={sizes.reactLogoPosition} />
          
         </group>
            <HackerRoom 
              scale={sizes.deskScale} 
              position={sizes.deskPosition} 
              rotation={[0.1, -Math.PI, 0]} 
            />

            <Stars 
              radius={100} 
              depth={50} 
              count={500} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1} 
            />

            <ambientLight intensity={1.2} color="#18b4d4" />
            <directionalLight position={[10, 10, 10]} intensity={0.7} color="#00d8ff" />
          </Suspense>
        </Canvas>
      </div>
     

      <motion.div 
        className="absolute bottom-10 left-0 right-0 w-full z-10 c-space"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <a href="#about" className="w-fit block mx-auto">
          <Button 
            name="Let's Collaborate" 
            isBeam 
            containerClass="sm:w-fit w-full sm:min-w-96 hover:scale-105 transition-transform duration-300" 
          />
        </a>
      </motion.div>
    </section>
    
  );
  
};

export default Hero;