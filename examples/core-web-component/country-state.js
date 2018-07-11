
class CountryStateClass extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.country = null;
        this.state = null
      }

      get country() {
          return this.country;
      }

      set country(value) {
        this.country = value;
      }

    
      static get observedAttributes() { return ["country"]; }
    
      attributeChangedCallback(name, oldValue, newValue) {
        if(newValue === oldValue) {
            return;
        }
        this[name] = newValue;
        this._render();
      }
      connectedCallback() {
        this._render();
      }
    
      _render() {
        
      }   
}

window.customElements.define('app-sample', CountryStateClass);