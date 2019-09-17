# Chapter 1: Components

---

## Quick Recap

Components are:

- Building blocks
- Reusable
- Declarative

Notes: As we mentioned before, components are the basic building blocks of your React application. A component is like a recipe. You can use a recipe as many times as you like for different meals. Likewise, you can use a component as many times as you like for different user interfaces. And lastly, components are declarative. You use them to describe what you want your UI to look like and what you want it to do. Let's dive into writing components.

---

```javascript
const Welcome = () => <h1>Hello, World!</h1>;
```

Notes: The simplest way to think of components is as a JavaScript function. A function takes optional input and returns an optional value. Similarly, React function components take optional input and return valid JSX.

In our example, we have a function that requires no arguments and returns some JSX (not HTML). This is a bona fide component! It is important to remember that the `h1` tag returned by the Welcome component is not HTML at this point. It is JSX which will be converted to a React element which will be converted to a DOM element.

---

```javascript
const Welcome = props => <h1>Hello, {props.name}!</h1>;
```

Notes: What if we want our component to accept an "input" value. We can do that through a React feature called "props". "Props" is short for "properties", and it's a key piece of what makes React so powerful. We will cover props extensively in the next chapter. For now, you can think about it as a way to supply variable arguments to your component.

---

## Class Components

- Based on ES6 classes
- Uses `this` keyword
- Extends `React.Component`

Notes: So far, we've only seen function components. However, there is an alternative.

Class components are the "original" way to write components. A class component can have instance variables and methods. It references those internal attributes via the `this` keyword. To write a class component, your ES6 class must extend `React.Component` or `React.PureComponent`.

Until hooks were introduced, class components were the only way to access core React features like state and lifecycle methods. If you don't know what that means yet, don't worry! We cover those concepts later.

---

```javascript
const Welcome = props => <h1>Hello, {props.name}!</h1>;

// OR

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

Notes: Here are two components that produce the same UI. One is a function component and the other is a class component.

React will render the return value fo a function component. On the other hand, a class component must define the `render` method. React will render the return value of the `render` method.

---

## Composition Over Inheritance

Notes: In the heyday of object-oriented programming, app functionality was enhanced through the concept of inheritance. A class can inherit, or gain, a parent's functionality by extending the parent's class.

Composition is an alternative approach to writing code that favors combining simple units of code into more sophisticated units. React chose a compositional model. Aside from extending `React.Component` to write class components, you will not use inheritance in your React code.

---

## Composing Components

```javascript
const Header = () => {
  return <Welcome name="World" />;
};

// OR

class Header extends React.Component {
  render() {
    return <Welcome name="World" />;
  }
}
```

Notes: React components can return any React element, as well as other React
components. In the example above, the `Header` component is returning the
`Welcome` component which returns an `h1` element. One thing to remember is that
components that you create must be capitalized. This is because JSX looks for
lowercase names as built-in elements (ie. `div` or `h1`) and capitalized
components as user-defined components (ie. `Welcome`, not `welcome`) within your
code base.

---

## Composition Rules

- Return any combination of React components and elements
- Built-in React elements are lowercase
- Custom React components are TitleCase

Notes: To summarize, follow these rules when composing components together.

---

```javascript
const Header = () => (
  <div>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </div>
);
```

Notes: In this example, we're composing multiple components. You'll notice that we've wrapped multiple components in one `div` element. We've created a component hierarchy where there are 3 sibling `Welcome` components surrounded by a `div` element.

As a side note, before version 16 React enforced a variant that a component could only return a single element. As of v16, you can also return an array of elements to render to the screen (useful for lists).

---

```javascript
const Header = () => (
  <React.Fragment>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </React.Fragment>
);

// OR

const Header = () => (
  <>
    <Welcome name="World" />
    <Welcome name="Galaxy" />
    <Welcome name="Universe" />
  </>
);
```

Notes: To avoid returning empty `div`s throughout our codebase, we can return a React Fragment that wraps the components of interest. The shorthand for `React.Fragment` is the empty tag like `<>....</>`

---

```javascript
const Navigation = () => (
  <>
    <Header />
    <div>
      <Link />
      <Search />
    </div>
  </>
);
```

Notes: We're not restricted to one level deep of composition. We can formulate any combination of components that we like.

While we haven't specified how each component is implemented, we can still see that there is structure to our `Navigation` component. It has two direct children, and some more distant offspring as well.

---

## Use Function Components

- Simpler
- Lower overhead
- Less bundle bloat

Notes: When writing a new component, try to use a function component whenever possible. The React community is moving away from ES6 classes. The `class` syntax can cause confusion, bugs, and significantly larger file sizes. Conversely, function components are simpler, have lower performance overhead, and create less bundle bloat. Since the introduction of hooks (a concept that we will cover later), there are fewer reasons to use class components.

---

## Babel Compilation

> https://babeljs.io/en/repl

Notes: JavaScript is constantly improving as a language. New language features are proposed and adopted in multiples stages. Newly approved features are then implemented by each browser (Chrome, Firefox, Safari, etc), but this takes time. Moreover, only the newest versions of browsers support the most recent JS features. Developers are generally an impatient bunch--unwilling to wait for end-users to install the latest browsers. As a result, a tool called Babel was developed. Babel transforms JS code into backwards compatible code. This means that we can write our apps using the most modern language features without needing to cater to the lowest common denominator (the oldest browsers). The above website shows you what your modern JS code is transformed into via the Babel toolset. You can choose different configurations to support newer features and/or older browsers.

---

## Babel Class Input

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Greetings, Earthling.</h1>;
  }
}
```

Notes: This is a demonstration on why class components can be a less advantageous choice versus a function component. In 6 lines of code, we have a simple class component that renders an `h1` element. Classes are a newer feature of JavaScript, so Babel has to transform the code to backwards compatible code. Into how many lines of code do you think this simple class component will be transformed?

---

## Babel Class Output

```javascript
"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var Greeting =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Greeting, _React$Component);

    function Greeting() {
      _classCallCheck(this, Greeting);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(Greeting).apply(this, arguments)
      );
    }

    _createClass(Greeting, [
      {
        key: "render",
        value: function render() {
          return _react.default.createElement(
            "h1",
            null,
            "Greetings, Earthling."
          );
        }
      }
    ]);

    return Greeting;
  })(_react.default.Component);
("use strict");

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var Greeting =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(Greeting, _React$Component);

    function Greeting() {
      _classCallCheck(this, Greeting);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(Greeting).apply(this, arguments)
      );
    }

    _createClass(Greeting, [
      {
        key: "render",
        value: function render() {
          return React.createElement("h1", null, "Greetings, Earthling.");
        }
      }
    ]);

    return Greeting;
  })(React.Component);
```

Notes: Using standard configurations, Babel generates 42 lines of backwards compatible JS out of a 6-line class component. That is a sizeable increase. Notice how the transformed code includes many class-specific functions, e.g. `_createClass` and `possibleConstructorReturn`. Babel has to generate these methods because its target version of JavaScript wouldn't know how to run class-based code. To make matters worse, there is a performance overhead to instantiating and running (transformed) classes. There is a lot of room for improvement.

---

## Babel FC Input

```javascript
const Greeting = () => <h1>Greetings, Earthling.</h1>;
```

Notes: Let's try rewriting the same component using a function component. Notice that the functional component definition is already 4 lines shorter in length than its class counterpart.

---

## Babel FC Output

```javascript
var Greeting = function Greeting() {
  return React.createElement("h1", null, "Greetings, Earthling.");
};
```

Notes: For a 1-line functional component with identical behavior to the class component, Babel produces 3 lines of JS. There are no signs of class-specific support. On top of a smaller amount of code, a functional component will also be faster without the class instantiation overhead. While there there are cases when a class component is a good choice, using class components will introduce bloat to your Babel output and ultimately to your bundle size. In a full-feature website, your user might feel the effects when they're trying to load your bundle.

---

## Component Tips

Notes: Keep the following guidelines in mind when writing React code. Of course, there are always exceptions to rules. These are simply helpful tips.

---

## Tip #1

Avoid dumping grounds.

Notes: Components can become dumping grounds for markup and/or functionality. Generally smaller components are better. The exception to this is if you have complex DOM interactions but most of the time that can be solved by moving state out of a component.

---

## Tip #2

Single responsibility.

Notes: Components should aim to do one thing well. As a result, components will be smaller and more maintainable.

The flip side is you don't want to have thousands of tiny components with no way to find one for your use case. This leads to creating a tiny `Title` component because someone created a tiny inflexible `Heading` component but nobody could find it in a sea of components. Sophistication is ok, so long as the complexity remains within the bounds of the component's one responsibility.

---

## Tip #3

Render functions should fit on the screen.

Notes: Aim to keep render functions visible in your editor without scrolling. If you have to scroll to see all of a render function, it's too large. Roughly 60 lines.

---

## Tip #4

Compose render functions in classes.

Notes: Some developers break out class functions like `renderListItem` to colocate functionality in a larger component while keeping render functions small. This can work for certain cases but should only be used when the UI pieces belong together.

---

# Exercises

1. Implement the `Empty` component.
2. Implement the `NavBar` component.
3. Implement the `Inbox` component.
4. Implement the `App` (`index.js`) component.
