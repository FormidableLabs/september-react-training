# Redux

Redux is the number 1 state management framework for React applications. React was released as a view library with little thought to state management on the client. The React team proposed an event listener pattern called "Flux". In the Flux pattern, state is global in a "store", and the view layer dispatches events which update the store. This may sound familiar, as it is based on the Command Queue design pattern. Redux built upon this idea and introduced some other abstractions to give developers a common language and toolset for state management.

## Other State Libraries

Initially there was an explosion of state libraries for React based on the Flux pattern. Redux has since taken over as the main library but a few others are worth mentioning. None of the current approaches are 100% Flux based but they all solve state management well.

- MobX - Structure state based on minimal data and derive the rest performantly.
- Apollo Link State - Easy integration with APIs and performance benefits.
- React Context - Built in to React, no third party lib needed.

## Why Redux?

- Consistent patterns for state management
- Enables clean and maintainable code
- Easily testable
- Built in debugging tools
- Great documentation
- Many third party libraries for advanced features
- Large community with vast resources and examples
- Battle tested across a wide range of production applications

## Redux Vocab

- Store - Global state tree.
- Action - Event fired by part of your application.
- Reducer - Action handler that converts the action into state.
- Container - React component wired up to Redux state or actions
- Selector - A store accessor function (not included in vanilla Redux)

## Store

In Redux state is simply a single object tree that holds the state of your application. This object is often referred to as the "Redux Store". The state inside the store is
not mutable directly, it's read only, and instead your reducers return a new state whenever an action is fired.

Stores are dead simple to create, just use `createStore` and pass in a reducer.

```
import { createStore } from 'redux'

import messageReducer from '../reducers/messages'

const store = createStore(messageReducer)
```

Redux apps should only ever have one store. This prevents confusion around handlers and updates and allows for the entire app state to serialize.

Serialization is important when dealing with server side rendering or returning the user to a desired app state onload. Rehydrating a redux store is simple.

```
import { createStore } from 'redux'

import messageReducer from '../reducers/messages'

const desiredState = JSON.parse(window.__redux_state__);

// You can pass in any initial state to createStore as the second argument
const store = createStore(messageReducer, desiredState)
```

Most apps won't interact with the store directly other than setting initial state but we'll cover the full store API soon. Typically, store updates only happen through actions and reducers.

## Action (What happened?)

An action is an object that describes what has happened. When an action is
triggered, we call this "dispatching" an action. This is because the api that
the Redux store exposes is called "dispatch". Actions contain the information
needed to update the state of the store.

It is required that an action have at
least one property on it: `type`. The `type` key usually has a string constant
value. Types are typically pulled out into their own file or object instead of relying on manually creating the exact string constant every time. The `type` key is the standard way to wire up actions to reducers.

Other than `type`, the object can have anything else you'd like on it. A common structure is to use `payload` as a generic key so all actions take this shape.

```(Javascript)
{
  type: 'UPDATE_USER',
  payload: { name: 'John Smith', age: 33 }
}
```

## Reducers (How does it happen?)

A reducer is a function that describes how an action will change the state of
the store. Large apps are often made up of many small reducers combined to handle many different parts of the state. Each reducer can be thought of as a branch off the main state tree. These branches aka reducers can be as large or as small a chunk of state as required. Most often they are objects that match the domain data.

Every reducer is a function of the following form.

It takes in two arguments:

1. the previous state
2. the action object

And returns the new state.

That's it.

```(Javascript)
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
```

Note that the first argument (state) also sets an initial value. When redux initializes the store, it runs through all the reducer functions to build the initial state tree. In the above case we're initializing the counter to 0 and the next action will run this reducer with the value 0.

Reducers should always be pure functions. They should always return the same shape of state no matter the inputs. Adhering to these principles is what allows for time travel, easy debugging, simple tests, and composable reducers. Based on that you should not put API calls in reducers. Later we'll show how to handle async calls with redux.

## Containers

Containers aren't part of the Redux API directly but are a recommended pattern for integrating Redux with React (https://redux.js.org/basics/usage-with-react)

Containers are simply components that are wired to interact with Redux. They connect to date from the store to display. Or they connect actions to UI events or a combination of both. The inverse of a container component is called a presentational component - a component that doesn't interact directly with redux and has no knowledge of the store or actions.

It's important to note that containter components might not directly display store data or directly fire an action. In fact, more commonly they simply pass those pieces of data or actions to presentational components.

This pattern has some major benefits - If redux state or actions change, you know exactly where to update your UI code. It allows for presentational components to have less dependencies with clearer component APIs. Presentational components are more reusable and modular since they aren't tied to a specific app implementation.

```
const mapStateToProps = state => {
  return {
    emails: state.emails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: () => {
      dispatch(fetchEmails())
    }
  }
}

const ConnectedInbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox)

export default ConnectedInbox
```

There's another way we can further decouple state from components and that's Selectors.

## Selectors

Selectors are functions that know about the shape of the data and fetch a part of it for a container. Selectors allow you to structure your reducers and state tree in the most efficient and sensible way for the domain. How that works is selectors act as derived data stores. Essentially each selector can determine higher order information from the original data store.

A contrived example - you have an array of messages, each message has a "read" flag. You want to know the total unread messages. You could store `unreadMessageCount` in your data (and sometimes this is valid) but you could also use a selector that counts `unreadMessageCount` only when the list of messages is updated. The advantages to this is your state tree stays cleaner and you only use derived data when it's needed by a component.

Selectors also protect your components from state shape changes, similar to container components but taken even further. Selectors are more reusable accross containers since they don't interact with presentational components. They only serve one purpose - to select the correct data for your containers.

Selectors can be created by hand but we recommend the library `reselect` for memoized selectors. Reselect gives us performant and composable selectors. Selectors are only re-run if their underlying state dependencies change.

They can also be used as input for other selectors, so you can compose them to structure the data however your application needs.

```
import { createSelector } from 'reselect';

const emailContentSelector = state => state.currentEmail.content;
```

## Action Patterns

There are two main patterns that most redux apps follow. The "event sourcing" model or the "command pattern". Both of those terms exist outside of redux to describe data passing architectures but in redux they are used to describe where the action coupling takes place. Either the component view layer or the store reducer.

#### Event Sourcing

With this structure, actions are coupled to the components that create them. In this pattern, action types are past tense and describe the view event. E.g. `{ type: 'FILTER_BUTTON_CLICKED'...}`.

Pros:

- Easy to get started, just setup a component to fire an event
- Easy to reason about where the event originated

Cons:

- Hard to refactor if UI changes
- Encourages state structure that doesn't match data
- Leads to spaghetti actions
- Doesn't play well with ducks (https://github.com/erikras/ducks-modular-redux)

Note about ducks pattern (https://github.com/erikras/ducks-modular-redux) - This is a general redux pattern beyond just actions. This pattern is about colocating reducers, actions, and types. This pattern is useful for reducing boilerplate but not necessary. In some cases, it reduces flexibility and leads to painful refactoring like in the event sourcing pattern. It's worth deciding as a team if this pattern is helpful.

#### Command Pattern

The command pattern takes the opposite approach from event sourcing and couples the actions to data. Types in this pattern are commands to be acted on the data in the form of `VERB_SUBJECT` e.g `FILTER_MESSAGES, GET_USERS`. The command pattern works well with the ducks pattern in that colocating actions and reducers leads to obvious coupling. The command pattern works best with selectors and well structured containers.

Pros:

- Easy to colocate actions and reducers (ducks pattern)
- Easy to model actions and data around the data domain (This is big)
- UI can change without affecting actions or reducers

Cons:

- Requires upfront modeling of data
- Obscures originator of the event

We recommend the command pattern with selectors because it leads to more maintanable code with reducers that best represent the data.

### Redux API

We use the Redux method `createStore` to create a store for our application. The
`createStore` method takes a reducer and returns an instance of our store.

```(Javascript)
import { createStore } from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = createStore(counter)
```

The store instance exposes three important methods: `subscribe`, `dispatch`, and
`getState`.

The `subscribe` method allows you to listen for changes to your state. You
probably won't directly use this method as most apps use `react-redux` which
provides syntactic sugar around this.

```(Javascript)
store.subscribe()
```

The `getState` method allows you to access the current state object. This method
is also rarely used directly and more often than not you'll use the
`react-redux` api to access specific parts of state. Note that this method is how you grab initial state when server rendering. Render on the server then call `store.getState()` and pass that along to the frontend to rehydrate in `createStore`.

```(Javascript)
store.getState()
```

The `dispatch` method allows you fire an action which will eventually lead to a
new state being returned by Redux.

```(Javascript)
store.dispatch({ type: 'INCREMENT' })
```

In the above example, the reducer is only handling actions that have to do with
the count. What should we do if we want to handle actions that deal with a
different part of the app? Redux gives us the ability to combine reducers before
we create the store.

```(Javascript)
import { createStore, combineReducers } from 'redux'

function auth(state = { isAuthenticated: false }, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, { isAuthenticated: true })
    case 'LOGOUT':
      return Object.assign({}, state, { isAuthenticated: false })
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth,
  counter
})

let store = createStore(rootReducer)
```

## Redux & React

It's possible to use Redux with React without any other packages, however, it
would take a lot of time and be very redundant. The package `react-redux`
library gives us a ton of useful functions and optimizes common patterns under
the hood. The main functionality that `react-redux` is used for is the `connect`
method which wraps the `subscribe` method that the redux store exposes. This
method "connects" are components with the props the component needs.

The `connect` function takes two arguments. The first is a function that
determines what state the component needs as props. We call this function
`mapStateToProps`. The second function determines what actions the component
will need to dispatch and adds them as props. We call this function
`mapDispatchToProps`.

```(Javascript)
const mapStateToProps = state => {
  return {
    emails: state.emails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: () => {
      dispatch(fetchEmails())
    }
  }
}

const ConnectedInbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox)

export default ConnectedInbox
```
