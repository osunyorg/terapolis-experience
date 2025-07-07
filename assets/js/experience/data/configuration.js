import { Vector3, ACESFilmicToneMapping } from "three";
export default {
    camera: {
        fov: 75,
        fovMobile: null,
        near: 0.1,
        far: 10000,
        position: new Vector3(5, 18, 10), //new Vector3(0, 0.5, 3.5),
        isControlable: true,
        pointerFactor: {
            x: Math.PI * 0.03,
            y: Math.PI * 0.03,
        },
    },
    lights: {
        ambient: {
            intensity: 1,
            color: "#ffffff",
        },
        directional: {
            intensity: 1,
            color: "#ffffff",
        },
    },
    renderer: {
        antialias: true,
        toneMapping: ACESFilmicToneMapping, // this Tone mapping is used for more realistic colors
        toneMappingExposure: 1.2,
    },
    sceneEnvBackground: {
        color: 0xefefef,
        enabled: true,
        intensity: 1,
        show: true,
        transparent: true,
    },
    sceneFog: {
        color: null, // take background color by default
        enabled: true,
        far: 300,
        near: 0,
    },
}