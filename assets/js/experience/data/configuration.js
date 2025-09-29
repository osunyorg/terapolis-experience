import { Vector3, ACESFilmicToneMapping, PCFSoftShadowMap, VSMShadowMap, PCFShadowMap, ReinhardToneMapping, CineonToneMapping, NoToneMapping, AgXToneMapping } from 'three';
export default {
    camera: {
        fov: 50,
        fovMobile: null,
        near: 0.1,
        far: 10000,
        position: new Vector3(0, 6, 14), //new Vector3(0, 0.5, 3.5),
        isControlable: true,
        pointerFactor: {
            x: Math.PI * 0.03,
            y: Math.PI * 0.03
        },
        distance: {
            blur: 25, // 20
            focus: 7
        },
        orbit: {
            free: false,
            enableZoom: false,
            enablePan: false,
            // maxPolarAngle: Math.PI / 2 - 0.35
            minPolarAngle: Math.PI / 2 - 0.5,
            maxPolarAngle: Math.PI / 2 - 0.3
            // Caméra plus rasante
            // maxPolarAngle: Math.PI
        }
    },
    lights: {
        ambient: {
            intensity: 0.8,
            color: '#ffffff',
        },
        directional: {
            intensity: 0.0,
            color: '#ffffff',
            position: new Vector3(1, 5, -1)
        },
        hemi: {
            intensity: 0.0,
            skyColor: 0x99DDFF,
            groundColor: 0x669933,
        },
    },
    renderer: {
        antialias: true,
        toneMappingEnabled: true,
        toneMapping: NoToneMapping,
        toneMappingExposure: 0.8,
    },
    sceneEnvBackground: {
        color: 0x06B0E5,
    },
    envMap: {
        enabled: true,
        intensity: 0.5
    },
    sceneFog: {
        color: 0x06B0E5,
        enabled: true,
        far: 120,
        near: 30,
    },
    sun: {
        speed: 0.0001, // 0.0005
        distance: 50, // 50
        intensity: 13,
        startColor: "#FF3224",
        endColor: "#fff2b8ff"
    },
    shadow: {
        enabled: false,
        type: PCFSoftShadowMap,
        size: 2048
    },
    skyBox: {
        enabled: true,
        toneMapped: true,
        size: 100,
        color: "#06B0E5",
        startColor: "#06B0E5",
        endColor: "#294db0",
    },
    pvTracker: {
        rotation: -0.6
    }
}