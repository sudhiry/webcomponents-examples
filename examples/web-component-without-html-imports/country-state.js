if (!'content' in document.createElement('template')) {
    throw new Error('Your browser does not support template elements, please upgrade!');
}


class CountryStateClass extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('div');
        template.innerHTML = 
            `<div>
                <label for="country">Choose a coutry:</label>
                <select id="country"></select>
            </div>
            <div>
                <label for="state">Choose a state:</label>
                <select id="state"></select>
            </div>
            <div id="selectedValues"></div>`;
        
        this.attachShadow({ mode: 'open' });
        this.countries = null;
        this.states = {};
        this.shadowRoot.appendChild(document.importNode(template, true));
        this.optionCountryChange = this.optionCountryChange.bind(this);
        this.optionStateChange = this.optionStateChange.bind(this);
    }

    get country() {
        return this.getAttribute('country');
    }

    set country(value) {
        this.setAttribute('country', value)
    }

    get state() {
        return this.getAttribute('state');
    }

    set state(value) {
        this.setAttribute('state', value)
    }

    static get observedAttributes() { return ["country", "state"]; }

    /**
     * Interestingly attributeChangedCallback method is called before connectedCallback method, 
     * resulting error of not getting shadowRoot. That is why we need to assign
     * shadowRoot in the constructor and not in connectedCallback
     */
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
        this.shadowRoot.querySelector('#country').addEventListener('change', this.optionCountryChange);
        this.shadowRoot.querySelector('#state').addEventListener('change', this.optionStateChange);
        this._render();
    }

    optionCountryChange(e) {
        this.country = e.target.value;
        this.state = '';
    }

    optionStateChange(e) {
        this.state = e.target.value;
    }

    /**
     * We should not fetch any data here because this method will be called multiple times.
     * So workaround I added is to check if request in progress or not.
     */
    _update() {
        this._updateCountries();
        this._updateStates();
    }

    _updateCountries() {
        if (this.countries) {
            this._render();
        } else {
            if (!this.countriesRequestInProgress) {
                this.countriesRequestInProgress = true;
                this.fetchCountries().then((data) => {
                    this.countriesRequestInProgress = false;
                    this.countries = data;
                    this._addCountryOptions();
                    this._render();
                }).then(this._updateStates.bind(this));
            }
        }
    }

    _updateStates() {
        if (this.states[this.country]) {
            this._addStateOptions();
            this._render();
        } else {
            if (!this.statesRequestInProgress) {
                this.statesRequestInProgress = true;
                this.country && this.fetchStates(this.country).then((data) => {
                    this.statesRequestInProgress = false;
                    this.states[this.country] = data;
                    this._addStateOptions();
                    this._render();
                });
            }

        }

    }

    _addCountryOptions() {
        const select = this.shadowRoot.querySelector('#country');
        for (let option of this.countries) {
            const eleOption = document.createElement('option');
            eleOption.text = option.countryName;
            eleOption.value = option.countryCode;
            select.add(eleOption);
        }
    }

    _addStateOptions() {
        const select = this.shadowRoot.querySelector('#state');
        if (select.options && select.options.length > 0) {
            // FIXME: See if we can removeAll at once
            while (select.options.length > 0) {
                select.options.remove(0);
            }
        }
        for (let option of this.states[this.country]) {
            const eleOption = document.createElement('option');
            eleOption.text = option.stateName;
            eleOption.value = option.stateCode;
            select.add(eleOption);
        }

    }

    _render() {
        this.shadowRoot.querySelector('#country').value = this.country;
        this.shadowRoot.querySelector('#state').value = this.state;
        this.shadowRoot.querySelector('#selectedValues').textContent =
            `You have selected ${this.country} with state ${this.state}`;

    }

    fetchCountries() {
        return fetch('./data/countries.json').then(response => response.json());
    }

    fetchStates(country) {
        return fetch(`./data/states/${country}.json`).then(response => response.json());
    }
}
customElements.define('country-state', CountryStateClass);