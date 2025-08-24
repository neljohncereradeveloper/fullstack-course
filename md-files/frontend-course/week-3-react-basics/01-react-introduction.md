# React Introduction & JSX

## 🎯 **Lesson Overview**

Welcome to **Week 3: React Basics**! In this lesson, you'll learn the core concepts of React, understand JSX syntax, and create your first React components. React is a powerful JavaScript library for building user interfaces that has revolutionized modern web development and is used by companies like Facebook, Instagram, Netflix, and Airbnb.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Understand what React is and why it's the most popular frontend library
- Set up a React development environment with modern tools
- Write JSX syntax and understand its relationship to JavaScript
- Create basic React components with proper naming conventions
- Understand the component-based architecture and its benefits

## 📚 **React Fundamentals**

### **What is React?**

React is a JavaScript library created by Facebook (now Meta) for building user interfaces. It's designed to be:

- **Declarative**: You describe what you want, React handles the DOM updates
- **Component-Based**: Build encapsulated components that manage their own state
- **Learn Once, Write Anywhere**: Use React for web, mobile, and desktop apps
- **Virtual DOM**: Efficient updates and rendering for better performance

### **Why React?**

- **Virtual DOM**: Efficient updates and rendering
- **Large Ecosystem**: Extensive community and third-party libraries
- **Job Market**: High demand for React developers worldwide
- **Performance**: Fast rendering and updates
- **Developer Experience**: Excellent tooling and debugging
- **Community**: Massive, active developer community
- **Future-Proof**: Backed by Meta and continuously evolving

## 🛠️ **Setting Up React**

### **Prerequisites**

Before starting React, you need:

- **Node.js** installed on your computer (version 16 or higher)
- **npm** (Node Package Manager) - comes with Node.js
- **VS Code** or another modern code editor
- **Git** for version control

### **Create React App (Traditional Method)**

The traditional way to start a React project:

```bash
npx create-react-app my-first-app
cd my-first-app
npm start
```

This creates a new React project with all the necessary dependencies and starts a development server.

### **Modern React Setup with Vite (Recommended)**

For better performance and modern development experience:

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

Vite provides faster development server startup and hot module replacement.

### **Project Structure**

```
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
├── package.json
├── vite.config.js
└── README.md
```

## ⚛️ **JSX: JavaScript XML**

### **What is JSX?**

JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It's not HTML - it's JavaScript! JSX gets transformed into regular JavaScript function calls during the build process.

### **Basic JSX Syntax**

```jsx
// This is JSX
const element = <h1>Hello, React!</h1>;

// You can use variables
const name = "John";
const greeting = <h1>Hello, {name}!</h1>;

// You can use expressions
const user = { firstName: "John", lastName: "Doe" };
const fullName = (
  <h1>
    Hello, {user.firstName} {user.lastName}!
  </h1>
);
```

### **JSX Rules**

1. **Must return a single element** (or use React.Fragment)
2. **All tags must be closed**
3. **Use camelCase for attributes**
4. **Use className instead of class**
5. **Use htmlFor instead of for**

```jsx
// ❌ Wrong - multiple elements
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ Correct - single element
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ Also correct - React Fragment
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

## 🧩 **React Components**

### **What are Components?**

Components are the building blocks of React applications. They are reusable pieces of UI that can contain their own logic and styling. Think of them as custom HTML elements that you can create and reuse throughout your application.

### **Function Components**

The modern way to write React components:

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Or using arrow function syntax
const Welcome = () => {
  return <h1>Hello, React!</h1>;
};

// Or even shorter
const Welcome = () => <h1>Hello, React!</h1>;
```

### **Component Naming**

- **Must start with a capital letter** (React uses this to distinguish from HTML elements)
- **Use PascalCase** (e.g., `UserProfile`, `NavigationBar`)
- **Be descriptive** of what the component does

```jsx
// ✅ Correct
function UserProfile() {}
function NavigationBar() {}
function ProductCard() {}

// ❌ Wrong
function userProfile() {}
function navigation_bar() {}
function product() {}
```

### **Using Components**

```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}
```

## 🎨 **Styling in React**

### **CSS Classes**

```jsx
function Button() {
  return <button className="btn btn-primary">Click me</button>;
}
```

### **Inline Styles**

```jsx
function Button() {
  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
  };

  return <button style={buttonStyle}>Click me</button>;
}
```

### **Conditional Styling**

```jsx
function Button({ isActive }) {
  const buttonStyle = {
    backgroundColor: isActive ? "green" : "gray",
    color: "white",
    padding: "10px 20px",
  };

  return (
    <button style={buttonStyle}>{isActive ? "Active" : "Inactive"}</button>
  );
}
```

## 🔧 **Practical Examples**

### **Example 1: Simple Header Component**

```jsx
function Header() {
  return (
    <header className="header">
      <h1>My React App</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
```

### **Example 2: Card Component**

```jsx
function Card({ title, content, imageUrl }) {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Usage
<Card
  title="React Basics"
  content="Learn the fundamentals of React"
  imageUrl="/images/react-logo.png"
/>;
```

### **Example 3: List Component**

```jsx
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className="todo-item">
          {todo}
        </li>
      ))}
    </ul>
  );
}

// Usage
const todoItems = ["Learn React", "Build a project", "Deploy to production"];
<TodoList todos={todoItems} />;
```

## 📝 **Practice Exercises**

### **Exercise 1: Create a Profile Component**

Create a `Profile` component that displays:

- Profile picture
- Name
- Bio
- Social media links

```jsx
function Profile() {
  // Your code here
}
```

### **Exercise 2: Build a Navigation Menu**

Create a `Navigation` component with:

- Logo
- Menu items (Home, About, Services, Contact)
- Responsive design

```jsx
function Navigation() {
  // Your code here
}
```

### **Exercise 3: Create a Product Card**

Build a `ProductCard` component that shows:

- Product image
- Product name
- Price
- Add to cart button

```jsx
function ProductCard() {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **React** is a JavaScript library for building user interfaces
2. **JSX** allows you to write HTML-like code in JavaScript
3. **Components** are reusable pieces of UI
4. **Function components** are the modern way to write React
5. **Components must start with capital letters**
6. **JSX must return a single element**
7. **Use className for CSS classes, not class**
8. **React uses Virtual DOM for efficient updates**

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Props**: Passing data between components
- **State**: Managing component data
- **Event handling**: Making components interactive
- **Component composition**: Building complex UIs

## 💡 **Tips for Success**

- **Practice JSX syntax** until it feels natural
- **Start with simple components** and gradually increase complexity
- **Use the React DevTools** browser extension for debugging
- **Read the official React documentation** for deeper understanding
- **Experiment with different component structures**
- **Use modern React patterns** from the start

## 🔍 **Common Mistakes to Avoid**

1. **Forgetting to capitalize component names**
2. **Not closing JSX tags properly**
3. **Using class instead of className**
4. **Returning multiple elements without a wrapper**
5. **Not using key prop when rendering lists**
6. **Mixing HTML and JSX syntax**

---

**Ready to build your first React components? Let's create something amazing! 🎉**
