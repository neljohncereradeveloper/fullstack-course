# React Hooks Fundamentals

## 🎯 **Lesson Overview**

Welcome to **Week 4: Advanced React & Hooks**! In this lesson, you'll dive deep into React Hooks - the modern way to add state and side effects to functional components. You'll learn about useState, useEffect, useRef, and how to combine them to build powerful React applications.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Master the useState hook for state management
- Use useEffect for handling side effects
- Implement useRef for DOM references and persistent values
- Combine multiple hooks effectively
- Build complex, interactive React components

## 🎣 **useState Hook Deep Dive**

### **Basic useState Usage**

The `useState` hook is the foundation of state management in React:

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

### **useState with Different Data Types**

```jsx
function UserProfile() {
  // String state
  const [name, setName] = useState("");

  // Number state
  const [age, setAge] = useState(0);

  // Boolean state
  const [isActive, setIsActive] = useState(false);

  // Array state
  const [hobbies, setHobbies] = useState([]);

  // Object state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Function state (rare, but possible)
  const [formatter, setFormatter] = useState(
    () => (text) => text.toUpperCase()
  );

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
        placeholder="Age"
      />
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active User
      </label>
    </div>
  );
}
```

### **Functional Updates with useState**

When updating state based on previous state, use functional updates:

```jsx
function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setHistory((prevHistory) => [...prevHistory, count]);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setHistory((prevHistory) => [...prevHistory, count]);
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
  };

  const double = () => {
    setCount((prevCount) => prevCount * 2);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={double}>×2</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div>
        <h3>History:</h3>
        <ul>
          {history.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### **Lazy Initialization**

For expensive initial state calculations, use lazy initialization:

```jsx
function ExpensiveComponent() {
  // This function only runs once during component initialization
  const [data, setData] = useState(() => {
    console.log("Computing initial state...");
    return expensiveCalculation();
  });

  function expensiveCalculation() {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }

  return (
    <div>
      <p>Expensive result: {data.toFixed(2)}</p>
      <button onClick={() => setData(Math.random() * 100)}>
        Generate New Random
      </button>
    </div>
  );
}
```

## 🔄 **useEffect Hook Mastery**

### **Basic useEffect Usage**

The `useEffect` hook handles side effects in functional components:

```jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### **useEffect Dependency Array**

Understanding when useEffect runs:

```jsx
function EffectExamples() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Runs after every render
  useEffect(() => {
    console.log("Effect 1: Runs after every render");
  });

  // Runs only once (on mount)
  useEffect(() => {
    console.log("Effect 2: Runs only on mount");
  }, []);

  // Runs when count changes
  useEffect(() => {
    console.log("Effect 3: Runs when count changes");
    document.title = `Count: ${count}`;
  }, [count]);

  // Runs when name changes
  useEffect(() => {
    console.log("Effect 4: Runs when name changes");
  }, [name]);

  // Runs when count OR name changes
  useEffect(() => {
    console.log("Effect 5: Runs when count or name changes");
  }, [count, name]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}
```

### **useEffect Cleanup Functions**

Cleanup functions prevent memory leaks and handle component unmounting:

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // Cleanup function runs before next effect or on unmount
    return () => {
      clearInterval(interval);
      console.log("Timer cleaned up");
    };
  }, []); // Empty dependency array - effect runs once on mount

  return (
    <div>
      <h2>Timer: {count} seconds</h2>
    </div>
  );
}

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    // Cleanup function
    return () => {
      connection.disconnect();
      console.log(`Disconnected from room: ${roomId}`);
    };
  }, [roomId]); // Effect runs when roomId changes

  return (
    <div>
      <h3>Chat Room: {roomId}</h3>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
    </div>
  );
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

## 🎯 **useRef Hook**

### **Basic useRef Usage**

The `useRef` hook creates a mutable reference that persists across renders:

```jsx
import { useRef, useEffect } from "react";

function TextInputWithFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    // Focus the input when button is clicked
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Focus me!" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### **useRef for Persistent Values**

useRef can store any mutable value, not just DOM references:

```jsx
function TimerWithRef() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const startTimer = () => {
    if (intervalRef.current) return; // Already running

    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    startTimeRef.current = Date.now();
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
    startTimeRef.current = Date.now();
  };

  const elapsedTime = Date.now() - startTimeRef.current;

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2>Timer: {count} seconds</h2>
      <p>Elapsed: {Math.floor(elapsedTime / 1000)} seconds</p>
      <div>
        <button onClick={startTimer} disabled={!!intervalRef.current}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!intervalRef.current}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
```

### **useRef vs useState**

Understanding when to use each:

```jsx
function RefVsState() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const incrementState = () => {
    setCount(count + 1);
  };

  const incrementRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref count:", countRef.current);
    // Note: This won't trigger a re-render!
  };

  const logBoth = () => {
    console.log("State count:", count);
    console.log("Ref count:", countRef.current);
  };

  return (
    <div>
      <h2>State Count: {count}</h2>
      <h3>Ref Count: {countRef.current}</h3>

      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
      <button onClick={logBoth}>Log Both</button>

      <p>
        <strong>Key Difference:</strong> Changing state triggers re-renders,
        changing refs does not. Use refs for values that don't need to trigger
        re-renders.
      </p>
    </div>
  );
}
```

## 🔧 **Combining Hooks Effectively**

### **Custom Hook: useCounter**

```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);
  const [history, setHistory] = useState([]);

  const increment = () => {
    setCount((prev) => prev + step);
    setHistory((prev) => [...prev, count]);
  };

  const decrement = () => {
    setCount((prev) => prev - step);
    setHistory((prev) => [...prev, count]);
  };

  const reset = () => {
    setCount(initialValue);
    setHistory([]);
  };

  const setValue = (value) => {
    setCount(value);
    setHistory((prev) => [...prev, count]);
  };

  return {
    count,
    history,
    increment,
    decrement,
    reset,
    setValue,
  };
}

// Usage
function CounterApp() {
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(10, 5);

  return (
    <div>
      <div>
        <h3>Counter 1: {counter1.count}</h3>
        <button onClick={counter1.increment}>+1</button>
        <button onClick={counter1.decrement}>-1</button>
        <button onClick={counter1.reset}>Reset</button>
      </div>

      <div>
        <h3>Counter 2: {counter2.count}</h3>
        <button onClick={counter2.increment}>+5</button>
        <button onClick={counter2.decrement}>-5</button>
        <button onClick={counter2.reset}>Reset</button>
      </div>
    </div>
  );
}
```

### **Custom Hook: useLocalStorage**

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
  const [filter, setFilter] = useLocalStorage("filter", "all");

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add new todo"
        onKeyPress={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTodo(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul>
        {todos
          .filter((todo) => {
            if (filter === "active") return !todo.completed;
            if (filter === "completed") return todo.completed;
            return true;
          })
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  );
                }}
              />
              {todo.text}
            </li>
          ))}
      </ul>
    </div>
  );
}
```

## 📝 **Practice Exercises**

### **Exercise 1: Build a Stopwatch**

Create a stopwatch component that:

- Starts, stops, and resets
- Shows elapsed time
- Uses useRef for the interval
- Persists time in localStorage

```jsx
function Stopwatch() {
  // Your code here
}
```

### **Exercise 2: Create a Form with Validation**

Build a form that:

- Manages multiple form fields with useState
- Validates input in real-time
- Shows validation errors
- Uses useEffect for form submission

```jsx
function ValidatedForm() {
  // Your code here
}
```

### **Exercise 3: Build a Data Fetcher Hook**

Create a custom hook that:

- Fetches data from an API
- Manages loading, error, and success states
- Caches responses
- Provides retry functionality

```jsx
function useDataFetcher(url) {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **useState** manages component state and triggers re-renders
2. **useEffect** handles side effects and component lifecycle
3. **useRef** creates persistent references that don't trigger re-renders
4. **Custom hooks** extract and reuse logic between components
5. **Dependency arrays** control when effects run
6. **Cleanup functions** prevent memory leaks
7. **Hooks can be combined** to build complex functionality

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Advanced hooks** (useContext, useReducer, useMemo, useCallback)
- **Performance optimization** techniques
- **Error boundaries** and error handling
- **Building production-ready React applications**

## 💡 **Tips for Success**

- **Start with simple hooks** and gradually add complexity
- **Use the React DevTools** to inspect hook state
- **Test your effects** to ensure they run when expected
- **Clean up side effects** to prevent memory leaks
- **Create custom hooks** for reusable logic
- **Understand the dependency array** thoroughly

## 🔍 **Common Mistakes to Avoid**

1. **Forgetting dependency arrays** in useEffect
2. **Mutating state directly** instead of using setState
3. **Not cleaning up effects** that create subscriptions
4. **Using refs when state would be better**
5. **Creating new objects/arrays** in render causing infinite effects

---

**Ready to master React Hooks? Let's build something amazing! 🎉**
