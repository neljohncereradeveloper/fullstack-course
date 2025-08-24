# React Components & Props

## 🎯 **Lesson Overview**

Welcome to **Lesson 2** of React Basics! In this lesson, you'll dive deeper into React components, learn how to pass data between components using props, and understand the fundamentals of state management. This is where React becomes truly powerful and interactive as you learn to build reusable, composable UI components.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Create reusable React components with props and proper composition
- Understand component hierarchy and build complex UIs from simple pieces
- Manage component state using the useState hook
- Build interactive components that respond to user input
- Create a complete component-based application architecture

## 🧩 **Component Composition**

### **What is Component Composition?**

Component composition is the practice of building complex UIs by combining smaller, reusable components. Think of it like building with LEGO blocks - you create small pieces and then assemble them into larger structures. This approach makes your code more maintainable, testable, and reusable.

### **Component Hierarchy**

```jsx
function App() {
  return (
    <div className="app">
      <Header />
      <MainContent>
        <Sidebar />
        <Content />
      </MainContent>
      <Footer />
    </div>
  );
}
```

### **Benefits of Component Composition**

- **Reusability**: Use the same component in multiple places
- **Maintainability**: Update one component, affects all instances
- **Readability**: Code is easier to understand and debug
- **Testing**: Test components in isolation
- **Team Development**: Different developers can work on different components
- **Performance**: Optimize individual components independently

## 📤 **Props: Passing Data Between Components**

### **What are Props?**

Props (short for "properties") are a way to pass data from a parent component to a child component. They are read-only and help make components reusable and configurable. Props are the primary mechanism for component communication in React.

### **Basic Props Usage**

```jsx
// Parent component
function App() {
  return (
    <div>
      <Greeting name="John" age={25} />
      <Greeting name="Jane" age={30} />
    </div>
  );
}

// Child component
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

### **Props Destructuring**

```jsx
// Method 1: Destructure in function parameters
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// Method 2: Destructure inside function
function UserCard(props) {
  const { name, email, avatar } = props;
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

### **Default Props**

```jsx
function Button({ text, color = "blue", size = "medium" }) {
  return (
    <button className={`btn btn-${color} btn-${size}`}>
      {text}
    </button>
  );
}

// Usage
<Button text="Click me" /> {/* Uses default color and size */}
<Button text="Submit" color="green" size="large" />
```

### **Children Prop**

The `children` prop allows you to pass content between component tags:

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>This content goes inside the card.</p>
  <button>Edit Profile</button>
</Card>;
```

## �� **State Management with useState**

### **What is State?**

State is data that can change over time in a component. When state changes, React automatically re-renders the component to reflect the new data. State is what makes React components interactive and dynamic.

### **useState Hook**

The `useState` hook is the most basic way to add state to functional components:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

### **useState Syntax**

```jsx
const [state, setState] = useState(initialValue);
```

- **state**: The current state value
- **setState**: Function to update the state
- **initialValue**: The starting value for the state

### **Multiple State Variables**

```jsx
function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### **State with Objects**

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const updateUser = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => updateUser("name", e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => updateUser("email", e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateUser("age", parseInt(e.target.value))}
        placeholder="Age"
      />
    </div>
  );
}
```

## 🎨 **Conditional Rendering**

### **Conditional Rendering with &&**

```jsx
function Greeting({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn && <h1>Welcome back, {username}!</h1>}
      {!isLoggedIn && <h1>Please log in</h1>}
    </div>
  );
}
```

### **Conditional Rendering with Ternary Operator**

```jsx
function Status({ isOnline }) {
  return (
    <div>
      <span className={isOnline ? "online" : "offline"}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </span>
    </div>
  );
}
```

### **Conditional Rendering with if-else**

```jsx
function UserGreeting({ user }) {
  if (user.isAdmin) {
    return <h1>Welcome, Administrator!</h1>;
  } else if (user.isPremium) {
    return <h1>Welcome, Premium User!</h1>;
  } else {
    return <h1>Welcome, {user.name}!</h1>;
  }
}
```

## 🔧 **Practical Examples**

### **Example 1: Todo Item Component**

```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

// Usage
<TodoItem
  todo={{ id: 1, text: "Learn React", completed: false }}
  onToggle={(id) => console.log("Toggle:", id)}
  onDelete={(id) => console.log("Delete:", id)}
/>;
```

### **Example 2: Product Card with State**

```jsx
function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      <div className="product-actions">
        <button onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? "❤️" : "🤍"}
        </button>

        <div className="quantity-controls">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}
```

### **Example 3: Form Component with Validation**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Submit form logic here
    } else {
      setErrors(newErrors);
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Your Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Your Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <textarea
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Your Message"
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

## 📝 **Practice Exercises**

### **Exercise 1: Build a Counter Component**

Create a counter component with:

- Display current count
- Increment button
- Decrement button
- Reset button
- Custom increment amount input

```jsx
function Counter() {
  // Your code here
}
```

### **Exercise 2: Create a Shopping Cart Item**

Build a cart item component that shows:

- Product name and price
- Quantity controls
- Remove button
- Total price for that item

```jsx
function CartItem({ product, quantity, onUpdateQuantity, onRemove }) {
  // Your code here
}
```

### **Exercise 3: Build a Toggle Component**

Create a toggle component that:

- Shows on/off state
- Has custom labels
- Emits change events
- Has different styles for each state

```jsx
function Toggle({ isOn, onToggle, onLabel = "ON", offLabel = "OFF" }) {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **Props** are read-only data passed from parent to child components
2. **useState** is the basic hook for managing component state
3. **Component composition** allows building complex UIs from simple pieces
4. **State updates** trigger automatic re-renders
5. **Conditional rendering** makes components dynamic and interactive
6. **Props destructuring** makes code cleaner and more readable
7. **Children prop** allows flexible component content
8. **Component hierarchy** creates maintainable application structure

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Advanced state management** with useReducer
- **Custom hooks** for reusable logic
- **Performance optimization** with useMemo and useCallback
- **Building complex React applications**

## 💡 **Tips for Success**

- **Start with simple components** and gradually add complexity
- **Use props to make components reusable** and configurable
- **Keep state as local as possible** - only lift it up when necessary
- **Practice component composition** by breaking down complex UIs
- **Use the React DevTools** to inspect component props and state
- **Write clean, readable component names** that describe their purpose
- **Think in components** when designing your UI

## 🔍 **Common Mistakes to Avoid**

1. **Mutating state directly** instead of using setState functions
2. **Forgetting to import useState** from React
3. **Not providing key props** when rendering lists of components
4. **Over-complicating components** - keep them focused and simple
5. **Not handling edge cases** in conditional rendering
6. **Creating deeply nested component hierarchies**

---

**Ready to build interactive React components? Let's create something amazing! 🎉**
