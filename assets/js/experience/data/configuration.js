import { Vector3, ACESFilmicToneMapping, PCFSoftShadowMap, VSMShadowMap, PCFShadowMap } from 'three';
export default {
    camera: {
        fov: 50,
        fovMobile: null,
        near: 0.1,
        far: 10000,
        position: new Vector3(5, 15, 10), //new Vector3(0, 0.5, 3.5),
        isControlable: true,
        pointerFactor: {
            x: Math.PI * 0.03,
            y: Math.PI * 0.03,
        },
        distance: {
            blur: 20, // 20
            focus: 7
        },
        orbit: {
            maxPolarAngle: Math.PI / 2 - 0.35
            // maxPolarAngle: Math.PI
        }
    },
    lights: {
        ambient: {
            intensity: 1,
            color: '#ffffff',
        },
        directional: {
            intensity: 1,
            color: '#ffffff',
            position: new Vector3(1, 5, -1)
        },
    },
    renderer: {
        antialias: true,
        toneMapping: ACESFilmicToneMapping, // this Tone mapping is used for more realistic colors
        toneMappingExposure: 1.2,
    },
    shadow: {
        enabled: false,
        type: PCFSoftShadowMap,
        size: 2048
    },
    sceneEnvBackground: {
        color: 0x06B0E5,
        enabled: true,
        intensity: 1,
        show: true,
    },
    sceneFog: {
        color: 0x06B0E5,
        enabled: true,
        far: 400,
        near: 30,
    },
    sun: {
        speed: 0.0005,
        distance: 50, // 50
        intensity: 5,
        startColor: 0xFF3224,
        endColor: 0xFFFF81
    },
    skyBox: {
        enabled: true,
        toneMapped: true,
        size: 100,
        color: 0x06B0E5
    } 
}