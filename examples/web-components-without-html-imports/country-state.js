if (!'content' in document.createElement('template')) {
    throw new Error('Your browser does not support template elements, please upgrade!');
}

class CountryStateClass extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.content = "<div id='country'></div>";
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template, true));
    }

    get country() {
        return this.getAttribute('country');
    }

    set country(value) {
        this.setAttribute('country', value)
    }

    static get observedAttributes() { return ["country"]; }
    /**
     * Interestingly this method is called before connectedCallback method, 
     * resulting error of not getting shadowRoot. That is why we need to assign
     * shadowRoot in the constructor and not in connectedCallback
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return;
        }
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        this.shadowRoot.querySelector('#country').textContent = this.country;
    }
}
customElements.define('country-state', CountryStateClass);