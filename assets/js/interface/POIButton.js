export default class POIButton {
    constructor (container, onClick) {
        this.element = document.createElement('button');
        this.element.classList.add('poi-button');
        this.element.setAttribute('type', 'button');

        this._onClick = onClick;

        container.append(this.element);

        this._bindClick();
    }

    _bindClick () {
        this.element.addEventListener('click', this._onClick.bind(this));
    }

    move (position) {
        this.element.style.left = position.x + 'px';
        this.element.style.top = position.y + 'px';
    }
    show () {
        this.element.style.display = "flex";
    }

    hide () {
        this.element.style.display = "none";
    }
}