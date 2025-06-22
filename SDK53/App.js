// WispyGenesis/App.js

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';

const modelPath = require('./assets/models/huggy_output_textured.glb');

function Model(props) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} {...props} />;
}

function BouncingModel(props) {
  const modelRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const bounceHeight = Math.sin(time * 2) * 0.1;
    
    if (modelRef.current) {
      modelRef.current.position.y = props.position[1] + bounceHeight;
    }
  });
  
  return (
    <group ref={modelRef}>
      <Model {...props} />
    </group>
  );
}

export default function App() {
  return (
    // 1. 카메라 위치 조정
    // 2. stray whitespace 경고를 없애기 위해 코드 포맷팅 정리
    <Canvas camera={{ position: [0, 1, 10], fov: 30 }}>
      <ambientLight intensity={2.5} />
      <directionalLight position={[1, 3, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        {/* 1. 모델 크기 및 위치 조정 */}
        <BouncingModel scale={1.2} position={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  );
}

// 3. 로딩 속도 개선
useGLTF.preload(modelPath);
