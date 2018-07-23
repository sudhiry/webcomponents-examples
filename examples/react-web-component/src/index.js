import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import SampleComponent from './SampleComponent';

if (!'content' in document.createElement('template')) {
    throw new Error('Your browser does not support template elements, please upgrade!');
}

export default class CountryStateClass extends HTMLElement {
    constructor() {
        super();
        const ele = document.createElement('div');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(ele, true));
    }

    static get observedAttributes() { return []; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return;
        }
        this._update();
    }

    connectedCallback() {
        this._render();
    }

    _update() {
       this._render();
    }

    _render() {
        if(this.shadowRoot && this.shadowRoot.querySelector('div')) {
            ReactDOM.render(<SampleComponent />, this.shadowRoot.querySelector('div'));
        }
    }

}

customElements.define('sample-component', CountryStateClass);

