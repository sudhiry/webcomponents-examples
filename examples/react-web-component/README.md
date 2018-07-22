## Web components in React
This example illustrate how we can use React components as part of Web components. Eventually, may be :), all framewrok (React, Vue, Angular) based components will be wrapped by Web Components paving the way for truly indepenent of framework UI applications.

Real gotcha! currently is the transpilation support for custom HTML elements. Babel, transpiles all the classes even if we are extending custom elements from HTMLElements class. This become problem while running into es5 code.

Multiple options/workarounds are provided by people:
- 

In this perticular example, I haven't transpiled everything. I used `babel` latest version till today `6.26.0` and provided target environment as `chrome`. Babel transpiler only does transpilation for the code which is not supported by chrome. Making it simple to run and no specific workarounds for custom HTML elements.
