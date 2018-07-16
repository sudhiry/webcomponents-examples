import ReactDOM from 'react-dom';
import SampleComponent from './SampleComponent';

if (!'content' in document.createElement('template')) {
    throw new Error('Your browser does not support template elements, please upgrade!');
}

class CountryStateClass extends HTMLElement {
    constructor() {
        super();
        const ele = document.createElement('div');
        ele.setAttribute("id", "#container");
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(ele, true));
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return;
        }
        this._update();
    }

    /**
     * Event Listeners can only be added in connectedCallback because DOM is 
     * rendered before connectedCallback method
     */
    connectedCallback() {
        this._render();
    }

    /**
     * We should not fetch any data here because this method will be called multiple times.
     * So workaround I added is to check if request in progress or not.
     */
    _update() {}

    _render() {
        ReactDOM.render(SampleComponent, this.shadowRoot.querySelector('#container'));
    }

}
customElements.define('sample-component', CountryStateClass);