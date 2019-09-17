# Context Exercise

1. Implement a context component that exports a Provider, Consumer, and Context.

  - The value for the provider should be an object containing the following state and actions:
    - isAuthenticated = `props.isAuthenticated || false` (for testing purposes).
    - emails = `props.emails || fetchEmails(5)` (for testing purposes).
    - login
    - logout
    - removeEmail

2. Wrap the App in the newly created AppProvider.

3. Move the polling functionality from the Inbox component to the context
component.

4. Update the Inbox component to use the new context.

5. Update the NavBar component to use the new context.

6. Update the Preview component to use the new context.
