# Automated accessibility for react

To lint code for accesibility errors I used eslint-plugin-jsx-a11y. This lints existing code on a code editor. 

[https://github.com/jsx-eslint/eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

I used jest axe to test for valid accessible HTML when the code is rendered. This allows us to create some tests (in this case on App.Test.jsx) and then test to see if there are no
accessibility errors.

[https://www.npmjs.com/package/jest-axe](https://www.npmjs.com/package/jest-axe).

I used cypress lighthouse to test for accessibilty errors when the code is rendered on a browser. This can test for things that are not 'visible' in the code
ie. poor colour contrast between background and text.

[https://mfrachet.github.io/cypress-audit/](https://mfrachet.github.io/cypress-audit/)