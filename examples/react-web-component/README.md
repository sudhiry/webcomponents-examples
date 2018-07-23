## Web components in React
This example illustrate how we can use React components as part of Web components. Eventually, may be :), all framewrok (React, Vue, Angular) based components will be wrapped by Web Components paving the way for truly indepenent of framework UI applications.

Real gotcha! currently is the transpilation support for custom HTML elements. Babel, transpiles all the classes even if we are extending custom elements from HTMLElements class. This become problem while running into es5 code. In this perticular example, I used `@webcomponents/webcomponentsjs`, it has provided `custom-elements-es5-adapter.js` to support es5 transpilation (its like transpilation is going back to es5 and the adapter is making it compatible again in es6).

Multiple options/workarounds are provided by people:
- 


