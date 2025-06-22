// WispyGenesis/metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Metro 번들러가 3D 모델 파일 확장자를 에셋으로 인식하도록 설정합니다.
config.resolver.assetExts.push('glb', 'gltf');

module.exports = config;
