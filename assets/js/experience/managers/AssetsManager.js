import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import assets from "../data/assets";
import { ImageLoader, TextureLoader } from 'three';

export default class AssetsManager {
    constructor (completeCallback) {
        this.completeCallback = completeCallback;
        this.assets = assets;
        this._queue = [];
        this._isLoading = false;

        // Load all assets
        this.assets.forEach(asset => this.load(asset));
    }
    load (asset) {
        this._queue.push(asset);

        if (!this._isLoading) {
            this._loadNext();
        }
    }
    _loadNext () {
        const asset = this._queue.shift();
        this._isLoading = true;

        switch (asset.loader) {
            case 'GLTF':
                this._loadGLTF(asset);
                break;
            case 'RGBE':
                this._loadRGBE(asset);
                break;
            case 'Image':
                this._loadImage(asset);
                break;
            case 'Texture':
                this._loadTexture(asset);
                break;
        }

    }
    _loadGLTF (asset) {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/assets/loader/draco/' );
        loader.setDRACOLoader( dracoLoader );

        loader.load(
            asset.src,
            ( gltf ) => {
                asset.data = gltf.scene;
                this._onAssetLoaded();
            },
            this._onLoading,
            this._onError
        );
    }
    _loadRGBE (asset) {
        const loader = new RGBELoader();
        loader.load(
            asset.src,
            ( texture ) => {
                asset.data = texture;
                this._onAssetLoaded();
            },
            this._onLoading,
            this._onError
        );
    }
    _loadImage (asset) {
        const loader = new ImageLoader();
        loader.load(
            asset.src,
            ( image ) => {
                asset.data = image;
                this._onAssetLoaded();
            },
            this._onLoading,
            this._onError
        );
    }
    _loadTexture (asset) {
        const loader = new TextureLoader();
        loader.load(
            asset.src,
            ( texture ) => {
                asset.data = texture;
                this._onAssetLoaded();
            },
            this._onLoading,
            this._onError
        );
    }
    _onLoading ( xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }
    _onError ( error ) {
        console.log( error );
    }
    _onAssetLoaded () {
        this._isLoading = false;

        if (this._queue.length > 0) {
            this._loadNext();
        } else {
            this._onComplete();
        }
    }
    _onComplete() {
        this.completeCallback();
    }
    get (id) {
        return this.assets.find(asset => asset.id === id);
    }
}