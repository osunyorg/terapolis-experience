import { AnimationMixer } from "three";
import animationsConfig from "../data/animations";

export default class AnimationsManager {
    constructor ( object, clips ) {
        this.object = object;
        this.mixers = [];
        this.animations = clips;
        this.animations.forEach(animation => this.add( animation ));
    }

    add ( animation ) {
        const options = this.getOptions( animation.name );
        let mixer;

        if ( options.mixer ) {
            mixer = this.mixers.find( mix => mix.name === options.mixer );
        }
        if (!mixer) {
            mixer = new AnimationMixer( this.object );
        }

        if ( options ) {
            mixer.timeScale = options.timeScale;
            mixer.name = options.mixer || options.name;
        }

        this.mixers.push( mixer );

        mixer.clipAction( animation ).reset().play();

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