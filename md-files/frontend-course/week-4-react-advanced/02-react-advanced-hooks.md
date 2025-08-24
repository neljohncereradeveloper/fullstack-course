# Advanced React Hooks

## 🎯 **Lesson Overview**

Welcome to **Lesson 2** of Advanced React & Hooks! In this lesson, you'll explore powerful React hooks that enable advanced state management, performance optimization, and complex application architecture. You'll learn useContext, useReducer, useMemo, useCallback, and how to combine them for sophisticated React applications.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Use useContext for global state management
- Implement useReducer for complex state logic
- Optimize performance with useMemo and useCallback
- Build scalable React applications with advanced hooks
- Create custom hooks for complex logic

## 🌐 **useContext Hook**

### **What is Context?**

Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's perfect for global state like themes, user authentication, or language preferences.

### **Creating Context**

```jsx
import { createContext, useContext, useState } from "react";

// Create a context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  );
}
```

### **Using Context in Components**

```jsx
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useTheme();

  return (
    <main className={`content-${theme}`}>
      <h2>Welcome to the {theme} theme!</h2>
      <p>This content adapts to the current theme.</p>
    </main>
  );
}

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`footer-${theme}`}>
      <p>&copy; 2024 My App - {theme} theme</p>
    </footer>
  );
}
```

### **Multiple Contexts**

You can use multiple contexts for different concerns:

```jsx
const UserContext = createContext();
const LanguageContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header />
        <MainContent />
        <Footer />
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

function Header() {
  const { user, setUser } = useContext(UserContext);
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <header>
      <div>
        {user ? (
          <span>Welcome, {user.name}</span>
        ) : (
          <button onClick={() => setUser({ name: "Guest" })}>Login</button>
        )}
      </div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </header>
  );
}
```

## 🔄 **useReducer Hook**

### **What is useReducer?**

`useReducer` is an alternative to `useState` for managing complex state logic. It's particularly useful when you have complex state that involves multiple sub-values or when the next state depends on the previous one.

### **Basic useReducer Usage**

```jsx
import { useReducer } from "react";

// Action types
const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  SET_VALUE: "SET_VALUE",
};

// Initial state
const initialState = {
  count: 0,
  history: [],
};

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count],
      };

    case ACTIONS.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count],
      };

    case ACTIONS.RESET:
      return {
        ...state,
        count: 0,
        history: [],
      };

    case ACTIONS.SET_VALUE:
      return {
        ...state,
        count: action.payload,
        history: [...state.history, state.count],
      };

    default:
      return state;
  }
}

// Component using useReducer
function AdvancedCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const increment = () => dispatch({ type: ACTIONS.INCREMENT });
  const decrement = () => dispatch({ type: ACTIONS.DECREMENT });
  const reset = () => dispatch({ type: ACTIONS.RESET });
  const setValue = (value) =>
    dispatch({ type: ACTIONS.SET_VALUE, payload: value });

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
        <input
          type="number"
          value={state.count}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        />
      </div>
      <div>
        <h3>History:</h3>
        <ul>
          {state.history.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### **Complex State Management with useReducer**

```jsx
// Shopping cart example
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  APPLY_DISCOUNT: "APPLY_DISCOUNT",
};

const cartInitialState = {
  items: [],
  total: 0,
  discount: 0,
  discountCode: "",
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }

    case CART_ACTIONS.REMOVE_ITEM:
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
        total: state.total + item.price * quantityDiff,
      };

    case CART_ACTIONS.CLEAR_CART:
      return cartInitialState;

    case CART_ACTIONS.APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload.discount,
        discountCode: action.payload.code,
      };

    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState);

  const addItem = (item) =>
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  const removeItem = (itemId) =>
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  const updateQuantity = (itemId, quantity) =>
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity },
    });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });
  const applyDiscount = (code, discount) =>
    dispatch({
      type: CART_ACTIONS.APPLY_DISCOUNT,
      payload: { code, discount },
    });

  const finalTotal = cart.total - cart.discount;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value) || 0)
            }
            min="1"
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <div>
        <p>Subtotal: ${cart.total}</p>
        {cart.discount > 0 && (
          <p>
            Discount ({cart.discountCode}): -${cart.discount}
          </p>
        )}
        <p>
          <strong>Total: ${finalTotal}</strong>
        </p>
      </div>

      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => applyDiscount("SAVE20", cart.total * 0.2)}>
        Apply 20% Off
      </button>
    </div>
  );
}
```

## ⚡ **Performance Optimization Hooks**

### **useMemo Hook**

`useMemo` memoizes expensive calculations and only recalculates when dependencies change:

```jsx
import { useState, useMemo } from "react";

function ExpensiveCalculation({ numbers, filter }) {
  // This calculation only runs when numbers or filter changes
  const filteredNumbers = useMemo(() => {
    console.log("Computing filtered numbers...");
    return numbers.filter((num) => {
      // Simulate expensive computation
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      return num > filter;
    });
  }, [numbers, filter]);

  const sum = useMemo(() => {
    console.log("Computing sum...");
    return filteredNumbers.reduce((acc, num) => acc + num, 0);
  }, [filteredNumbers]);

  const average = useMemo(() => {
    console.log("Computing average...");
    return filteredNumbers.length > 0 ? sum / filteredNumbers.length : 0;
  }, [sum, filteredNumbers.length]);

  return (
    <div>
      <h3>Filtered Numbers (>{filter}):</h3>
      <p>Count: {filteredNumbers.length}</p>
      <p>Sum: {sum.toFixed(2)}</p>
      <p>Average: {average.toFixed(2)}</p>
      <ul>
        {filteredNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

function PerformanceDemo() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [filter, setFilter] = useState(5);
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Re-render Count: {count}
      </button>
      <input
        type="number"
        value={filter}
        onChange={(e) => setFilter(parseInt(e.target.value) || 0)}
      />
      <ExpensiveCalculation numbers={numbers} filter={filter} />
    </div>
  );
}
```

### **useCallback Hook**

`useCallback` memoizes functions and prevents unnecessary re-renders of child components:

```jsx
import { useState, useCallback, memo } from "react";

// Memoized child component
const ExpensiveChild = memo(function ExpensiveChild({ onAction, data }) {
  console.log("ExpensiveChild rendering...");

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <button onClick={onAction}>Perform Action</button>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data] = useState({
    title: "Static Title",
    description: "Static Description",
  });

  // This function reference stays stable between renders
  const handleAction = useCallback(() => {
    console.log("Action performed!");
    alert("Action completed!");
  }, []); // Empty dependency array means function never changes

  // This function changes every render (for comparison)
  const unstableHandler = () => {
    console.log("Unstable handler called");
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment (will not cause ExpensiveChild to re-render)
      </button>

      <div style={{ margin: "20px 0" }}>
        <h3>Stable Handler (useCallback):</h3>
        <ExpensiveChild onAction={handleAction} data={data} />
      </div>

      <div style={{ margin: "20px 0" }}>
        <h3>Unstable Handler (causes re-renders):</h3>
        <ExpensiveChild onAction={unstableHandler} data={data} />
      </div>
    </div>
  );
}
```

### **Combining useMemo and useCallback**

```jsx
function OptimizedComponent({ items, filter, onItemSelect }) {
  // Memoize filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.name.includes(filter));
  }, [items, filter]);

  // Memoize sorted items
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  // Memoize event handlers
  const handleItemClick = useCallback(
    (itemId) => {
      onItemSelect(itemId);
    },
    [onItemSelect]
  );

  // Memoize computed values
  const stats = useMemo(() => {
    const total = sortedItems.length;
    const active = sortedItems.filter((item) => item.active).length;
    const inactive = total - active;

    return { total, active, inactive };
  }, [sortedItems]);

  return (
    <div>
      <div>
        <h3>Statistics</h3>
        <p>Total: {stats.total}</p>
        <p>Active: {stats.active}</p>
        <p>Inactive: {stats.inactive}</p>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item.id)}>
            {item.name} - {item.active ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🎣 **Custom Hooks with Advanced Logic**

### **Custom Hook: useAsync**

```jsx
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setStatus("pending");
      setData(null);
      setError(null);

      try {
        const response = await asyncFunction(...params);
        setData(response);
        setStatus("success");
        return response;
      } catch (err) {
        setError(err);
        setStatus("error");
        throw err;
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// Usage
function UserProfile({ userId }) {
  const { status, data: user, error } = useAsync(() => fetchUser(userId), true);

  if (status === "idle") return <div>Initializing...</div>;
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;
  if (status === "success") {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

### **Custom Hook: useLocalStorage with useReducer**

```jsx
function useLocalStorage(key, initialValue) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_VALUE":
          try {
            window.localStorage.setItem(key, JSON.stringify(action.payload));
            return { value: action.payload, error: null };
          } catch (err) {
            return { value: state.value, error: err.message };
          }
        case "RESET":
          try {
            window.localStorage.removeItem(key);
            return { value: initialValue, error: null };
          } catch (err) {
            return { value: state.value, error: err.message };
          }
        default:
          return state;
      }
    },
    { value: initialValue, error: null }
  );

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        dispatch({ type: "SET_VALUE", payload: JSON.parse(item) });
      }
    } catch (err) {
      console.error("Error reading from localStorage:", err);
    }
  }, [key]);

  const setValue = useCallback((value) => {
    dispatch({ type: "SET_VALUE", payload: value });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return [state.value, setValue, reset, state.error];
}
```

## 📝 **Practice Exercises**

### **Exercise 1: Build a Theme Context System**

Create a complete theme system with:

- Light/dark themes
- Custom color schemes
- Theme persistence
- Smooth transitions

```jsx
function ThemeSystem() {
  // Your code here
}
```

### **Exercise 2: Create a Shopping Cart with useReducer**

Build a shopping cart that:

- Manages complex state
- Handles discounts and taxes
- Persists data
- Provides undo/redo functionality

```jsx
function ShoppingCart() {
  // Your code here
}
```

### **Exercise 3: Build a Performance-Optimized List**

Create a virtualized list that:

- Renders only visible items
- Uses useMemo and useCallback
- Handles large datasets
- Provides smooth scrolling

```jsx
function VirtualizedList({ items }) {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **useContext** provides global state management without prop drilling
2. **useReducer** is ideal for complex state logic and related state updates
3. **useMemo** optimizes expensive calculations by memoizing results
4. **useCallback** prevents unnecessary re-renders by memoizing functions
5. **Custom hooks** can combine multiple hooks for complex logic
6. **Performance optimization** is crucial for large React applications
7. **Advanced hooks** enable scalable, maintainable React code

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Error boundaries** and error handling
- **React patterns** and best practices
- **Testing React components**
- **Building production-ready applications**

## 💡 **Tips for Success**

- **Use Context sparingly** - only for truly global state
- **Prefer useReducer** over useState for complex state
- **Profile your app** to identify performance bottlenecks
- **Test your optimizations** to ensure they actually help
- **Keep custom hooks focused** on single responsibilities
- **Document your hooks** for team collaboration

## 🔍 **Common Mistakes to Avoid**

1. **Over-using Context** for local state
2. **Not providing proper dependency arrays** in useMemo/useCallback
3. **Creating new objects/arrays** in render causing infinite effects
4. **Forgetting to memoize expensive calculations**
5. **Over-optimizing** when not needed

---

**Ready to master advanced React hooks? Let's build something amazing! 🎉**
