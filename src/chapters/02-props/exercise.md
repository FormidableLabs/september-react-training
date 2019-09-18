# Props Exercise:

1. Add the following classes and props
  - In the `Empty` component
    - `p` class of `empty`
  - In the `NavBar` component
    - `nav` class of `navbar`
        - `h1` class of `nav-logo` with text of `Formidamail`
      - `ul` class of `nav-items`
        - `li` class of `nav-item` with text of `Log in`
  - In the `Inbox` component
    - `ul` class of `inbox`
      - `li` class of `preview` and a `key` of an `email.id`
        - `h3` class of `preview-name`
        - `div` class of `preview-content`
          - `h3` class of `preview-title`
          - `p` class of `preview-body`

2. Wrap the `h1` in a `Link` with a prop `to` with a value of `"/"`

3. Update the Inbox component to take an emails prop.

4. Implement the Preview component with the mapped emails in the Inbox component
  - Add an image to the preview component with a class `preview-delete`, `src` of `trash` and an `alt` of `remove`
