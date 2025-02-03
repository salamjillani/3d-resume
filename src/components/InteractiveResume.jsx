import  { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Environment,
  SpotLight,
  Html,
  ContactShadows,
  Box,
  Sphere,
} from "@react-three/drei";
import PropTypes from 'prop-types';

const resumeData = {
  personal: {
    name: "Abdul Salam",
    title: "Full Stack Developer",
    description: "Passionate developer with expertise in modern web technologies",
    about: "Experienced full-stack developer focused on creating innovative solutions",
    contact: {
      address: "Karachi",
      email: "salamjillani@gmail.com",
      phoneNo: "+923302488872"
    }
  },
  experiences: [
    {
      role: "Front End Developer",
      company: "CloudLink",
      year: "2023-2024",
      description: "Leading front end development projects",
      technologies: ["React"]
    }
  ],
  projects: [
    {
      title: "Squid Game",
      description: "Red light, green light game",
      technologies: ["React", "Three.js"],
      github: "https://github.com",
      livedemo: "https://demo.com"
    }
  ]
};

// TextWall Component
const TextWall = ({ position, rotation, text, onClick, isActive }) => {
  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={(e) => {
        document.body.style.cursor = "pointer";
        e.stopPropagation();
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = "auto";
        e.stopPropagation();
      }}
    >
      <Text
        color={isActive ? "#4a9eff" : "#ffffff"}
        fontSize={0.3}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="left"
        anchorX="left"
      >
        {text}
      </Text>
    </group>
  );
};

TextWall.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

// Desk Component
const Desk = () => {
  return (
    <group position={[-2, 0, 0]}>
      <Box args={[2.5, 0.1, 1.2]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.2} />
      </Box>
      <Box args={[0.1, 1.8, 0.1]} position={[1.1, 0, 0.5]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.1, 1.8, 0.1]} position={[-1.1, 0, 0.5]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.1, 1.8, 0.1]} position={[1.1, 0, -0.5]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.1, 1.8, 0.1]} position={[-1.1, 0, -0.5]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  );
};

// Laptop Component
const Laptop = ({ onClick, isHovered }) => {
  return (
    <group
      onClick={onClick}
      position={[-2, 1, 0]}
      rotation={[0, Math.PI / 6, 0]}
      scale={0.3}
    >
      <Box args={[2, 0.1, 1.5]}>
        <meshPhysicalMaterial
          color={isHovered ? "#666" : "#333"}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      <Box
        position={[0, 0.7, -0.7]}
        rotation={[-0.5, 0, 0]}
        args={[2, 1.4, 0.1]}
      >
        <meshPhysicalMaterial
          color={isHovered ? "#444" : "#222"}
          metalness={0.8}
          roughness={0.2}
          emissive={isHovered ? "#0066cc" : "#000000"}
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  );
};

Laptop.propTypes = {
  onClick: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

// ContentDisplay Component
const ContentDisplay = ({ content, position }) => {
  if (!content) return null;

  let displayContent;
  if (content.type === "personal") {
    displayContent = (
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {resumeData.personal.name}
        </h2>
        <p className="text-xl text-gray-700 mb-4">
          {resumeData.personal.title}
        </p>
        <p className="text-gray-600 mb-4">{resumeData.personal.description}</p>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Contact</h3>
          <p className="text-gray-600">
            📍 {resumeData.personal.contact.address}
          </p>
          <p className="text-gray-600">
            📧 {resumeData.personal.contact.email}
          </p>
          <p className="text-gray-600">
            📱 {resumeData.personal.contact.phoneNo}
          </p>
        </div>
      </div>
    );
  } else if (content.type === "experience") {
    displayContent = (
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Experience</h2>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} className="mb-6 border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
            <p className="text-gray-600">
              {exp.company} | {exp.year}
            </p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (content.type === "projects") {
    displayContent = (
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl max-w-md overflow-y-auto max-h-96">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-6 border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
            <p className="text-gray-700 mt-2">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
              )}
              {project.livedemo && (
                <a
                  href={project.livedemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Html position={position} transform>
      {displayContent}
    </Html>
  );
};

ContentDisplay.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.oneOf(['personal', 'experience', 'projects']),
  }),
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// Room Component
const Room = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [laptopHovered, setLaptopHovered] = useState(false);

  return (
    <group>
      {/* Floor */}
      <Box args={[10, 0.1, 10]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#946B4A" roughness={0.8} />
      </Box>

      {/* Walls */}
      <Box args={[10, 6, 0.1]} position={[0, 3, -5]}>
        <meshStandardMaterial color="#E8E8E8" />
      </Box>
      <Box args={[0.1, 6, 10]} position={[5, 3, 0]}>
        <meshStandardMaterial color="#F5F5F5" />
      </Box>
      <Box args={[0.1, 6, 10]} position={[-5, 3, 0]}>
        <meshStandardMaterial color="#F5F5F5" />
      </Box>

      <TextWall
        position={[0, 4, -4.9]}
        rotation={[0, 0, 0]}
        text="About Me"
        onClick={() =>
          setActiveSection((prev) =>
            prev?.type === "personal" ? null : { type: "personal" }
          )
        }
        isActive={activeSection?.type === "personal"}
      />
      <TextWall
        position={[4.9, 4, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        text="Experience"
        onClick={() =>
          setActiveSection((prev) =>
            prev?.type === "experience" ? null : { type: "experience" }
          )
        }
        isActive={activeSection?.type === "experience"}
      />
      <TextWall
        position={[-4.9, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        text="Projects"
        onClick={() =>
          setActiveSection((prev) =>
            prev?.type === "projects" ? null : { type: "projects" }
          )
        }
        isActive={activeSection?.type === "projects"}
      />

      <Desk />

      <group
        onPointerOver={() => setLaptopHovered(true)}
        onPointerOut={() => setLaptopHovered(false)}
      >
        <Laptop
          onClick={() =>
            setActiveSection((prev) =>
              prev?.type === "personal" ? null : { type: "personal" }
            )
          }
          isHovered={laptopHovered}
        />
      </group>

      <group position={[4, 0, -4]}>
        <Box args={[0.4, 0.8, 0.4]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#5D4037" />
        </Box>
        <Sphere args={[0.6]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#2E7D32" />
        </Sphere>
      </group>

      {activeSection && (
        <ContentDisplay content={activeSection} position={[0, 2, -2]} />
      )}
    </group>
  );
};

// Main InteractiveResume Component
const InteractiveResume = () => {
  return (
    <div className="w-full h-screen">
      <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{resumeData.personal.name}</h2>
        <p className="text-lg mb-2">{resumeData.personal.title}</p>
        <p className="text-sm mt-2">
          Click on wall text or laptop to view details
        </p>
        <p className="text-sm">Use mouse to orbit | Scroll to zoom</p>
      </div>
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 50 }}>
        <color attach="background" args={["#1a1a1a"]} />

        <ambientLight intensity={0.4} />
        <SpotLight
          position={[4, 6, 4]}
          angle={0.4}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <SpotLight
          position={[-4, 6, -4]}
          angle={0.4}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        <Suspense fallback={null}>
          <Room />
          <Environment preset="apartment" />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveResume;