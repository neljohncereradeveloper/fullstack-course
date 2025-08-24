# React State Management & Advanced Concepts

## 🎯 **Lesson Overview**

Welcome to **Lesson 3** of React Basics! In this lesson, you'll learn advanced React concepts including complex state management, custom hooks, performance optimization, and building sophisticated React applications. This is where you'll transition from a React beginner to an intermediate developer, mastering the tools needed to build production-ready applications.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Manage complex state with multiple useState hooks and useReducer
- Create custom hooks for reusable logic and business rules
- Optimize React performance with useMemo and useCallback
- Handle side effects properly with useEffect
- Build complex, scalable React applications with modern patterns

## 🔄 **Advanced State Management**

### **Multiple State Variables vs. Single Object**

When managing multiple related state values, you have two approaches:

#### **Approach 1: Multiple useState Hooks**

```jsx
function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Good for simple, independent state values
}
```

#### **Approach 2: Single Object State**

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
    isSubmitting: false,
  });

  const updateUser = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Good for related state values that change together
}
```

### **useReducer for Complex State**

When state logic becomes complex, `useReducer` is often a better choice:

```jsx
import { useReducer } from "react";

// Action types
const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  SET_FILTER: "SET_FILTER",
};

// Initial state
const initialState = {
  todos: [],
  filter: "all",
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

// Component using useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  };

  return <div>{/* Component JSX */}</div>;
}
```

## 🎣 **Custom Hooks**

### **What are Custom Hooks?**

Custom hooks are functions that use React hooks and can be shared between components. They help extract component logic into reusable functions, making your code more organized and maintainable.

### **Basic Custom Hook Example**

```jsx
// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
}

// Usage in component
function ContactForm() {
  const form = useForm({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = async (data) => {
    // Submit form data
    console.log("Submitting:", data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        type="text"
        value={form.values.name}
        onChange={(e) => form.handleChange("name", e.target.value)}
        placeholder="Your Name"
      />
      {form.errors.name && <span className="error">{form.errors.name}</span>}

      <input
        type="email"
        value={form.values.email}
        onChange={(e) => form.handleChange("email", e.target.value)}
        placeholder="Your Email"
      />
      {form.errors.email && <span className="error">{form.errors.email}</span>}

      <textarea
        value={form.values.message}
        onChange={(e) => form.handleChange("message", e.target.value)}
        placeholder="Your Message"
      />
      {form.errors.message && (
        <span className="error">{form.errors.message}</span>
      )}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

### **Advanced Custom Hook: useLocalStorage**

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function TodoApp() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  // todos will persist between page refreshes
}
```

## ⚡ **Performance Optimization**

### **useMemo for Expensive Calculations**

```jsx
import { useMemo } from "react";

function ExpensiveComponent({ items, filter }) {
  // This calculation only runs when items or filter changes
  const filteredItems = useMemo(() => {
    console.log("Filtering items..."); // Only logs when dependencies change
    return items.filter((item) => item.name.includes(filter));
  }, [items, filter]);

  const sum = useMemo(() => {
    console.log("Computing sum...");
    return filteredItems.reduce((acc, num) => acc + num, 0);
  }, [filteredItems]);

  const average = useMemo(() => {
    console.log("Computing average...");
    return filteredItems.length > 0 ? sum / filteredItems.length : 0;
  }, [sum, filteredItems.length]);

  return (
    <div>
      <h3>Filtered Numbers (>{filter}):</h3>
      <p>Count: {filteredItems.length}</p>
      <p>Sum: {sum.toFixed(2)}</p>
      <p>Average: {average.toFixed(2)}</p>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### **useCallback for Stable Function References**

```jsx
import { useCallback } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);

  // This function reference stays stable between renders
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array means function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  );
}

function ChildComponent({ onIncrement }) {
  // This component won't re-render unnecessarily
  // because onIncrement reference is stable

  return <button onClick={onIncrement}>Increment</button>;
}
```

### **React.memo for Component Memoization**

```jsx
import { memo } from "react";

// This component only re-renders when its props change
const ExpensiveChild = memo(function ExpensiveChild({ data, onAction }) {
  console.log("ExpensiveChild rendering...");

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <button onClick={onAction}>Perform Action</button>
    </div>
  );
});

// Usage
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data] = useState({
    title: "Static Title",
    description: "Static Description",
  });

  const handleAction = useCallback(() => {
    console.log("Action performed");
  }, []);

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment (will not cause ExpensiveChild to re-render)
      </button>

      <ExpensiveChild data={data} onAction={handleAction} />
    </div>
  );
}
```

## 🔄 **useEffect Deep Dive**

### **Cleanup Functions**

Cleanup functions prevent memory leaks and handle component unmounting:

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Setup connection
    const connection = createConnection(roomId);
    connection.connect();

    // Cleanup function runs before next effect or on unmount
    return () => {
      connection.disconnect();
      console.log(`Disconnected from room: ${roomId}`);
    };
  }, [roomId]); // Effect runs when roomId changes

  return <div>Chat Room: {roomId}</div>;
}
```

### **Multiple useEffect Hooks**

Separate concerns with multiple useEffect hooks:

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Effect for user data
  useEffect(() => {
    async function fetchUser() {
      const userData = await fetchUserData(userId);
      setUser(userData);
    }
    fetchUser();
  }, [userId]);

  // Effect for user posts
  useEffect(() => {
    if (!user) return; // Don't fetch posts until user is loaded

    async function fetchPosts() {
      const userPosts = await fetchUserPosts(userId);
      setPosts(userPosts);
    }
    fetchPosts();
  }, [userId, user]);

  // Effect for notifications
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const newNotifications = await fetchNotifications(userId);
      setNotifications(newNotifications);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [userId, user]);

  // Effect for document title
  useEffect(() => {
    if (user) {
      document.title = `${user.name}'s Dashboard`;
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div>
        <h2>Posts ({posts.length})</h2>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <div>
        <h2>Notifications ({notifications.length})</h2>
        {notifications.map((notification) => (
          <div key={notification.id}>{notification.message}</div>
        ))}
      </div>
    </div>
  );
}
```

## 🏗️ **Building Complex Applications**

### **Context API for Global State**

```jsx
import { createContext, useContext, useReducer } from "react";

// Create context
const AppContext = createContext();

// Initial state
const initialState = {
  user: null,
  theme: "light",
  notifications: [],
};

// Actions
const ACTIONS = {
  SET_USER: "SET_USER",
  TOGGLE_THEME: "TOGGLE_THEME",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.TOGGLE_THEME:
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    ...state,
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    toggleTheme: () => dispatch({ type: ACTIONS.TOGGLE_THEME }),
    addNotification: (notification) =>
      dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification }),
    removeNotification: (id) =>
      dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

// Usage in components
function Header() {
  const { user, theme, toggleTheme } = useApp();

  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
      {user && <span>Welcome, {user.name}</span>}
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
}

// Wrap your app
function App() {
  return (
    <AppProvider>
      <Header />
      <MainContent />
    </AppProvider>
  );
}
```

## 📝 **Practice Exercises**

### **Exercise 1: Build a Shopping Cart with useReducer**

Create a shopping cart that can:

- Add/remove items
- Update quantities
- Calculate totals
- Apply discounts
- Clear cart

```jsx
function ShoppingCart() {
  // Your code here
}
```

### **Exercise 2: Create a Custom Hook for API Calls**

Build a custom hook that:

- Manages loading states
- Handles errors
- Caches responses
- Provides retry functionality

```jsx
function useApi(url, options = {}) {
  // Your code here
}
```

### **Exercise 3: Build a Theme Switcher with Context**

Create a theme system that:

- Supports light/dark themes
- Persists user preference
- Applies themes to all components
- Includes custom color schemes

```jsx
function ThemeProvider({ children }) {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **useReducer** is better than multiple useState for complex state logic
2. **Custom hooks** extract and reuse logic between components
3. **useMemo and useCallback** optimize performance by preventing unnecessary calculations
4. **React.memo** prevents unnecessary re-renders of child components
5. **useEffect cleanup** prevents memory leaks and side effects
6. **Context API** provides global state management without external libraries
7. **Performance optimization** is crucial for complex React applications

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Advanced React patterns** and best practices
- **Testing React components** with Jest and React Testing Library
- **Deploying React applications** to production
- **Building complete, production-ready React apps**

## 💡 **Tips for Success**

- **Start with simple state management** and gradually add complexity
- **Use custom hooks** to share logic between components
- **Profile your app** to identify performance bottlenecks
- **Test your effects** to ensure they run when expected
- **Clean up side effects** to prevent memory leaks
- **Create custom hooks** for reusable logic
- **Understand the dependency array** thoroughly

## 🔍 **Common Mistakes to Avoid**

1. **Over-optimizing** with useMemo/useCallback when not needed
2. **Forgetting cleanup functions** in useEffect
3. **Creating new objects/arrays** in render causing infinite effects
4. **Not using proper dependency arrays** in useEffect
5. **Over-engineering** simple state management

---

**Ready to build complex React applications? Let's create something amazing! 🎉**
