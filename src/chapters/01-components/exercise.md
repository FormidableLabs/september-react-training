# Components Exercise

1. Implement the `Empty` component with the following structure:
  - `p` element with text of `Your inbox is empty.`

2. Implement the `NavBar` component with the following structure:
  - `nav` element
    - `h1` element with text of `Formidamail`
    - `ul` element
      - `li` element with text of `Log in`

3. Implement the `Inbox` component with the following structure:
  - `ul` element
    - `map` of emails
      - `li` element
        - `h3` element with value of an `email.name` property
        - `div` element
          - `h3` element and value of an `email.title`
          - `p` element and value of an `email.body`

4. Implement the `App` (`index.js`) component with the following structure:
  - return a `React.Fragment` (or `<>`)
    - `NavBar` component
    - `Inbox` component
