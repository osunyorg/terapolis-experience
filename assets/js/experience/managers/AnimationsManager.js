import { AnimationClip, AnimationMixer } from "three";
import configuration from "../data/configuration";
import animationsConfig from "../data/animations";

export default class AnimationsManager {
    constructor ( object, clips ) {
        this.object = object;
        this.mixers = [];
        this.animations = clips;
        this.animations.forEach(animation => this.add( animation ));
    }

    add ( animation ) {
        const mixer =  new AnimationMixer( this.object ),
            options = this.getOptions( animation.name );

        mixer.clipAction( animation ).reset().play();

        if (options) {
            mixer.timeScale = options.timeScale;
        }

        this.mixers.push(mixer);
    }

    getOptions ( name ) {
        let animationOptions = null;
        
        animationsConfig.forEach(options => {
            if (name.includes(options.name)) {
                animationOptions = options;
            }
        });
        return animationOptions;
    }

    update ( delta ) {
        this.mixers.forEach(mixer => mixer.update( delta ));
    }

}