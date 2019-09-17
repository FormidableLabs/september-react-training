# Chapter 4: Context

---

## Prop Drilling

Notes: Often times data needs to be in multiple components at once. As an example, think of a users username being displayed in both the navigation bar and the profile page at the same time. Using Reacts local state, we would need to hold the state at the parent component of both the navbar and the profile page so that we can pass the username down to both children. This can often lead to passing props down multiple components, which we call "Prop Drilling".

While applications are small, prop drilling is not necessarily a bad thing. However, it can lead to unwieldy code that can be hard to maintain and difficult to refactor as an application grows.

---

## Context to the Rescue

Notes: Context lets you pass data and actions throughout your component tree without manually having to pass as props at every level.

This makes it easier to share a unified state and actions with many components that may not be direct descendants.

Prior to React’s new Context APIs many apps used Redux for centralized state management.

---

## Creating Context

```javascript
import React from “react”;

const AnimalContext = React.createContext();

const AnimalContext = React.createContext({
  name: “Milo”
});
```

Notes: React exposes the `createContext` api.

---

## Context Provider

```javascript
class WrappedApp extends React.Component {
  state = { name: “Milo” };

  handleChangeName = name => this.setState({ name });

  render() {
    return (
      <AnimalContext.Provider value={{
        name: this.state.name,
        changeName: this.handleChangeName
      }}>
        <App />
      </AnimalContext.Provider>
    );
  }
}
```

Notes: Provider Components wrap your App’s component subtree and are the source of truth for state. Additionally, Providers provide actions that can be used to update context state.

---

## Context Consumer

```javascript
import { AnimalContext } from “./contexts”;

const DogCard = () => {
  return (
    <AnimalContext.Consumer>
      {({ name }) => (<h1>{ name }</h1>)};
    </AnimalContext.Consumer>
  );
}
```

Notes: Consumer Components wrap any descendants in your App’s tree and let you use any state or actions you’ve provided as a value.

---

```javascript
const DogCard = () => {
  return (
    <AnimalContext.Consumer>
      {({ changeName }) => (
        <button onClick={() => changeName(“Beau”)}>
          Change Name
        </button>
      });
    </AnimalContext.Consumer>
  );
}
```

Notes: We can execute functions supplied by the Context Provider. In this case, we're updating the `name` value with `"Beau"`.

---

## Exercises Part 1

1. Implement a context component that exports a Provider, Consumer and Context.

2. Wrap the App in the newly created AppProvider.

3. Move the polling functionality from the Inbox component to the context
component.

4. Update the Inbox component to use the new context.

5. Update the NavBar component to use the new context.

6. Update the Preview component to use the new context.
---
