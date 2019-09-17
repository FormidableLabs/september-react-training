# Introduction to React

---

## What is React?

Notes: React is a JavaScript framework for rendering HTML. It's become wildly popular in recent years among web (and mobile) developers. We're going to explore some of the basic building blocks of React in this chapter.

---

## Key Terms

- Components
- Declarative programming
- VDOM
- JSX

Notes: Here are the key terms to take away from this chapter. We'll go over each concept and explain it in the context of React. Don't worry--if you don't get these ideas initially, we'll continue to grow your understanding in future chapters.

---

# Components

- Basic building blocks of React
- Represents a portion of the UI

Notes: React is based on components. Components are the building blocks of your UI, where each component renders some portion of HTML in your user interface. Components enable us to write clean and reusable code. When we say "clean", we mean code that is of a manageable size and that can be understood within a reasonable time frame. The code is reusable because components are UI recipes that can be used repeatedly throughout your app.

---

## What's Great about Components

- Strong separation of concerns
- Composability
- Reuse

Notes: React's component-based approach to rendering UI comes with a lot of
advantages. Display logic and markup are inherently coupled in any reasonably
sized application, so React embraces that coupling at the component level by truly separating _concerns_ and not just files. In practice this means underlying data structures or API calls can change without needing to rewrite presentation logic.

Other benefits to componentization are unit-testability and reuse. We can encapsulate pieces of our application UI for easy reuse. This is exemplified by 3rd party component libraries. You can reuse UI components like lego blocks to quickly build new applications without having to rewrite DOM interaction code.

---

## Componentization

- Single Responsibility Principle
- Decomposing components

Notes: Applications are made up of many pieces of UI. You can imagine a navigation bar that has a logo and an avatar. The logo and avatar can be components, as well as the navigation bar itself. One way of determining if something should be its own component is known as the "Single Responsibility Principle".

Generally Single Responsibility Principle says that a functional unit of software should be scoped to do a single thing well. Applied to React, a component should ideally only do one thing. For example, an image component should only be concerned with loading and displaying an image.

Components that grow too big can be broken up into smaller components. Thanks to the declarative nature of React, decomposing complex components into their constituent parts is fairly easy!

---

# Declarative Programming

Imperative vs declarative programming.

> Building Ikea furniture...

Notes: A common comparison of imperative vs declarative programming is "how vs what", respectively. It isn't immediately evident what we mean, so how about a metaphor? Imagine you've just purchased a piece of Ikea furniture. Self-assembly required. The purchase includes an instruction manual. Step-by-step instructions of _how_ to build the furniture would be akin to imperative programming. "Step 1: Place the board face down on the floor. Step 2: Screw in an L bracket to each pre-drilled hole." etc. Alternatively, imagine that Ikea only shipped a diagram for each step of the process (or maybe the entirely completed piece of furniture). This version of the instruction manual is similar to declarative programming. Ikea shows you _what_ you're building, and each individual step is up to you to figure out.

React is primarily a declarative framework. Each component that you write describes what the UI should look like. React figures out the minutia of drawing the output to the screen, starting and stopping event handlers, and so on. To bring back our Ikea metaphor: you describe what the final piece of furniture should look like, and React assembles it.

---

## React is Declarative

- Abstract out DOM interactions
- Focus on app functionality

Notes: Interacting with the DOM is an inherently imperative experience. Without the help of a declarative framework, you have to describe the exact steps to update the DOM elements. Fortunately, React hides the imperative nature of DOM through a declarative and sanitized API. We, as developers, benefit from this feature because we can focus on what the app should look like and do. We spend much less time instructing the browser on how to achieve our desired outcome. Sometimes directly dealing with the DOM is unavoidable. React provides escape hatches in those circumstances, but in our experience you rarely need to use them.

---

## Declarative Rendering

- Nice ergonomics
- Optimized by React

Notes: With React, you "declare" the desired state of the DOM in your components render method. React then batches the changes to the DOM and performs them in the most efficient way. This leads to better developer ergonomics and more performant DOM updates.

This is all handled by the virtual DOM, which we will discuss next.

---

# VDOM

- In-memory
- Abstract representation of your UI
- Empowers declarative React model

Notes: React uses an in-memory virtual DOM (VDOM). VDOM is an abstract representation of the UI that React renders from your component hierarchy. When one or more components in the component tree update, the VDOM is updated to reflect those changes. React then pushes updates to the client DOM based on the difference between the state of the VDOM and browser DOM. This is sometimes referred to as "smart diffing".

VDOM acts as an abstraction layer between our declarative component structure and the imperative DOM. React automatically handles the transition between VDOM and DOM.

---

## Visualizing VDOM

- Tree structure
- Reconciliation

Notes: VDOM is a tree shaped data structure. Simplistically speaking, each node in the tree represents a React element generated from a component. Here's a in-depth investigation of VDOM: https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf.

When your component tree declares a new UI state, it creates a new VDOM state. In a process called **reconciliation**, the new VDOM is compared to the current DOM to see what changes must be made. The diff is calculated, then React updates the client DOM in an efficient and cross-browser compatible manner.

---

## Server-Side Rendering

- Support low-end devices
- Improve SEO

Notes: One interesting consequence of React's VDOM is the improved ability to support server side rendering (SSR). Your server can send fully rendered HTML pages to the client. Not only is this an extremely performant option for all different kinds of devices (including low-end phones), but it also helps with search engine optimization (SEO). In some cases, you can render a website entirely to static content without running any client-side javascript.

---

# JSX

- Rendering and UI logic are coupled
- Syntax extension on JavaScript

Notes: Facebook engineers realized that rendering logic and UI logic can be inherently coupled; what something looks like is intertwined with how it behaves. They embraced that coupling by creating JSX, a syntactic extension to JS. JSX combines JavaScript and HTML into a system that feels familiar to both HTML and JS users. With JSX, you can write complex but intuitive UI code.

---

## The Main Players

- React components and elements `</>`
- Curly brackets `{}`

Notes: JSX outputs React elements. Like HTML, JSX uses `<` and `>` characters to build a structure from UI component primitives like `h1`, `p`, `input`, etc. These "tags" _appear_ to be HTML, but in truth they are React specific component implementations. However, they perform the same tasks as their HTML counterparts. Once you build your own components, you can use them in JSX via the same syntax. We'll see multiple examples going forward.

The other important player in JSX is the curly bracket. JSX will evaluate any arbitrary JS expression placed inside of curly brackets `{}`. Let's move on to an example to visualize how this works.

---

## A First Glance

```javascript
render() {
  const name = "Bobby";
  return <p className="user">{name}</p>;
}
```

Notes: Notes: Here's an example of JSX. Like HTML, the `p` element renders blocks of paragraph text. We apply CSS to the `p` via the `className` property (in React DOM, property names use camelCase). As a side note, JSX uses camelCase for property names instead of HTML attribute names. E.g. `onChange` instead of `onchange`.

There is a variable called `name` that is assigned the value of `"Bobby"`. We use that value in our JSX. `name` is evaluated and placed inside of the `p` element. The return value would be `<p>Bobby</p>`.

---

```javascript
render() {
  const maxLength = 15;
  return <p className="user">{generateRandomName(maxLength)}</p>;
}
```

Notes: Like we mentioned, you can evaluate any JS expression inside the curly brackets. This examples shows how you can execute a JS function and use the output as part of your JSX. Let's say that `generateRandomName(15)` evaluates to `"Jennifer"`. Then the return value would equal `<p>Jennifer</p>`.

---

```javascript
render() {
  const {title, paragraphText} = ....;
  return (
    <div>
      <h2>{title}<h2>
      <p>{paragraphText}</p>
    </div>
  );
}
```

Notes: Like before, the `title` and `paragraphText` variables are evaluated as part of the user interface. The value of `title` will be rendered as an `h2` whereas the value of `paragraphText` will be rendered as a `p`.

---

```javascript
render() {
  const isArriving = ....;
  return (
    <div>{isArriving ? <p>hello</p> : <p>goodbye</p>}</div>);
}
```

Notes: JSX affords us a lot of power. We can use ternary expressions to dynamically renders different component trees! This is further proof that any JS expression can be used with JSX.

---

## How JSX Works

1. Components written with JSX
2. Compilation
3. Render

Notes: Let's say you've got a spectacular React app written with JSX. How does that app end up on the computer screen? First, your app is run through a build step. Depending on your choice of tools, it will either be compiled with Babel or the Typescript compiler. Either tool transforms JSX expressions into regular JS functions.

The compiled code is then run in a device browser. When React is ready to render your components, it evaluates the functions that were generated from your JSX. As mentioned before, it creates a VDOM representation of the UI which is then written to DOM in the browser.
