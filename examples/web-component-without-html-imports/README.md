## Web components without using HTML imports standards

Not all browsers supports all proposed web component standards. Mostly "HTML imports" are not being supported by Edge, Safari, Mozilla. If you run [Core web Components](../core-web-Components) on above browsers it will fail!. So we have to find a way to run the web components on all (commonly used!) browsers.

All commonly used browsers use following web component standards:
- [HTML Template](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element/): The HTML template element specification defines how to declare fragments of markup that go unused at page load, but can be instantiated later on at runtime.
- [Custom Elements](https://w3c.github.io/webcomponents/spec/custom/): The Custom Elements specification lays the foundation for designing and using new types of DOM elements.
- [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/): The shadow DOM specification defines how to use encapsulated style and markup in web components.

### Notes:
- I see `attributeChangedCallback` is called before, if the usage has passed attributes to the custom components, and `connectedCallback` is called later.
- If you are listening to both the calls `attributeChangedCallback` and `connectedCallback`, you won't get `this.shadowRoot.querySelector('#<ele>')` at first time as it is happening through `attributeChangedCallback` and the component is not rendered yet in the DOM.
