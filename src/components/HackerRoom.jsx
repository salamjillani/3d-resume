import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  useTexture, 
  useGLTF,
  Environment, 
  ContactShadows, 
  Float 
} from '@react-three/drei';
import * as THREE from 'three';

const HackerRoom = (props) => {
  const groupRef = useRef();
  
  
  const monitorTexture = useTexture('/textures/desk/cpu.png');
  const glitchTexture = useTexture('/textures/desk/table.png');


  useFrame((state, delta) => {
    if (groupRef.current) {
    
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.0005;
 
      groupRef.current.rotation.y += delta * 0.05;
    }
  });


  const screenGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
  const tableGeometry = new THREE.BoxGeometry(4, 0.2, 2);
  const monitorGeometry = new THREE.BoxGeometry(1, 0.7, 0.2);
  const keyboardGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);

  
  const screenMaterial = new THREE.MeshStandardMaterial({
    map: glitchTexture,
    emissive: '#00d8ff',
    emissiveIntensity: 0.7,
    roughness: 0.2,
    metalness: 0.8
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 0.9,
    roughness: 0.1,
    thickness: 1.5,
    ior: 1.5,
    color: '#ffffff'
  });

  const tableMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a2e',
    roughness: 0.5,
    metalness: 0.3,
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.2}
    >
      <group ref={groupRef} {...props} dispose={null}>
      
        <Environment preset="city" intensity={0.5} />
        <ContactShadows 
          opacity={0.5} 
          scale={10} 
          blur={2} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />


        <mesh 
          geometry={monitorGeometry} 
          material={new THREE.MeshStandardMaterial({
            map: monitorTexture,
            color: '#ffffff',
            roughness: 0.4,
            metalness: 0.6
          })}
          position={[0, 1.5, 0.3]}
        />

    
        <mesh 
          geometry={screenGeometry} 
          material={screenMaterial}
          position={[0, 1.5, 0]}
          rotation={[0.2, 0, 0]}
        >
          <meshStandardMaterial 
            map={glitchTexture}
            emissive="#00d8ff"
            emissiveIntensity={0.5}
          />
        </mesh>

  
        <mesh 
          geometry={screenGeometry} 
          material={glassMaterial}
          position={[0, 1.5, 0.051]}
          rotation={[0.2, 0, 0]}
        />

    
        <mesh 
          geometry={tableGeometry} 
          material={tableMaterial}
          position={[0, 0, 0]}
        />

        <mesh 
          geometry={new THREE.CylinderGeometry(0.2, 0.2, 1, 32)} 
          material={tableMaterial}
          position={[0, 0.6, 0]}
        />


        <mesh 
          geometry={keyboardGeometry}
          material={new THREE.MeshStandardMaterial({ 
            color: '#2c3e50',
            roughness: 0.7,
            metalness: 0.3 
          })}
          position={[0, 0.22, 0.6]}
        />


        <group position={[1.5, 0.3, -0.5]}>
          <mesh 
            geometry={new THREE.BoxGeometry(0.5, 0.5, 0.5)}
            material={new THREE.MeshStandardMaterial({ 
              color: '#34495e',
              roughness: 0.6,
              metalness: 0.4 
            })}
          />
        </group>

        <pointLight 
          position={[0, 2, 2]} 
          intensity={1} 
          color="#00d8ff" 
        />
      </group>
    </Float>
  );
};

// Preload textures for performance
HackerRoom.preload = () => {
  useTexture.preload('/textures/desk/monitor.png');
  useTexture.preload('/textures/desk/screen.png');
  useTexture.preload('/textures/metal-texture.png');
};
useGLTF.preload('/models/hacker-room.glb');

export default HackerRoom;

