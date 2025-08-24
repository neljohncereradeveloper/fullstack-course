# React Patterns & Best Practices

## 🎯 **Lesson Overview**

Welcome to **Lesson 3** of Advanced React & Hooks! In this lesson, you'll learn essential React patterns, best practices, and architectural principles that will help you build scalable, maintainable, and production-ready React applications. You'll discover how to structure your code, handle common scenarios, and avoid common pitfalls.

## 🚀 **What You'll Learn**

By the end of this lesson, you will be able to:

- Implement common React patterns and design principles
- Structure React applications for scalability and maintainability
- Handle error boundaries and error handling
- Apply performance optimization techniques
- Build production-ready React applications

## 🏗️ **React Application Architecture**

### **Component Organization Patterns**

#### **Feature-Based Organization**

Organize components by feature rather than by type:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── settings/
│       ├── components/
│       └── hooks/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── app/
    ├── App.tsx
    └── index.tsx
```

#### **Component Hierarchy Design**

```jsx
// Smart vs. Dumb Components
// Smart Component (Container)
function UserDashboard() {
  const { users, loading, error, fetchUsers } = useUsers();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>Welcome, {currentUser.name}!</h1>
      <UserList users={users} />
      <UserStats users={users} />
    </div>
  );
}

// Dumb Component (Presentation)
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

// Even Dumber Component
function UserItem({ user }) {
  return (
    <li>
      <span>{user.name}</span>
      <span>{user.email}</span>
    </li>
  );
}
```

### **State Management Patterns**

#### **State Colocation**

Keep state as close as possible to where it's used:

```jsx
// ❌ Bad: State lifted too high
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <Header user={user} theme={theme} language={language} />
      <MainContent user={user} theme={theme} language={language} />
      <Footer theme={theme} language={language} />
    </div>
  );
}

// ✅ Good: State colocated where needed
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  const { user } = useAuth(); // Only Header needs user
  const { theme, toggleTheme } = useTheme(); // Only Header needs theme

  return (
    <header>
      <UserMenu user={user} />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </header>
  );
}
```

#### **State Machines with useReducer**

```jsx
// Define state machine
const STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  RESET: "RESET",
};

const initialState = {
  status: STATES.IDLE,
  data: null,
  error: null,
};

function dataReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        status: STATES.LOADING,
        error: null,
      };
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        status: STATES.SUCCESS,
        data: action.payload,
        error: null,
      };
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        status: STATES.ERROR,
        error: action.payload,
        data: null,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
}

function DataFetcher() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: ACTIONS.FETCH_START });

    try {
      const data = await fetchDataFromAPI();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
    }
  };

  const reset = () => dispatch({ type: ACTIONS.RESET });

  return (
    <div>
      {state.status === STATES.IDLE && (
        <button onClick={fetchData}>Fetch Data</button>
      )}

      {state.status === STATES.LOADING && <div>Loading...</div>}

      {state.status === STATES.SUCCESS && (
        <div>
          <h3>Data loaded successfully!</h3>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
          <button onClick={reset}>Reset</button>
        </div>
      )}

      {state.status === STATES.ERROR && (
        <div>
          <h3>Error: {state.error}</h3>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    </div>
  );
}
```

## 🛡️ **Error Boundaries**

### **What are Error Boundaries?**

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of the component tree that crashed.

### **Basic Error Boundary**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}
```

### **Functional Error Boundary with Hooks**

```jsx
function useErrorBoundary() {
  const [error, setError] = useState(null);

  if (error) {
    throw error;
  }

  return setError;
}

function ErrorBoundary({ children, fallback }) {
  const setError = useErrorBoundary();

  return (
    <ErrorBoundaryInner setError={setError} fallback={fallback}>
      {children}
    </ErrorBoundaryInner>
  );
}

function ErrorBoundaryInner({ children, setError, fallback }) {
  useEffect(() => {
    const handleError = (error) => {
      setError(error);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, [setError]);

  try {
    return children;
  } catch (error) {
    setError(error);
    return fallback;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}

function ErrorFallback() {
  return (
    <div className="error-fallback">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
}
```

## 🚀 **Performance Optimization Patterns**

### **Code Splitting with React.lazy**

```jsx
import React, { Suspense, lazy } from "react";

// Lazy load components
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));
const Settings = lazy(() => import("./features/settings/Settings"));
const Profile = lazy(() => import("./features/profile/Profile"));

function App() {
  const [currentRoute, setCurrentRoute] = useState("dashboard");

  const renderRoute = () => {
    switch (currentRoute) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentRoute("dashboard")}>Dashboard</button>
        <button onClick={() => setCurrentRoute("settings")}>Settings</button>
        <button onClick={() => setCurrentRoute("profile")}>Profile</button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>{renderRoute()}</Suspense>
    </div>
  );
}
```

### **Virtual Scrolling for Large Lists**

```jsx
function VirtualizedList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount, items.length);

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              className="list-item"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage
function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    content: `Item ${i}`,
  }));

  return (
    <VirtualizedList items={items} itemHeight={50} containerHeight={400} />
  );
}
```

### **Debounced Search**

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchAPI(debouncedSearchTerm)
        .then(setResults)
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      {loading && <div>Searching...</div>}

      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔧 **Custom Hooks Patterns**

### **Compound Component Pattern**

```jsx
function useAccordion() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = useCallback((itemId) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const isOpen = useCallback(
    (itemId) => {
      return openItems.has(itemId);
    },
    [openItems]
  );

  return { toggleItem, isOpen };
}

const AccordionContext = createContext();

function Accordion({ children }) {
  const accordion = useAccordion();

  return (
    <AccordionContext.Provider value={accordion}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, title, children }) {
  const { toggleItem, isOpen } = useContext(AccordionContext);
  const isItemOpen = isOpen(id);

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={() => toggleItem(id)}>
        {title}
        <span className={`arrow ${isItemOpen ? "open" : ""}`}>▼</span>
      </button>

      {isItemOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

// Usage
function App() {
  return (
    <Accordion>
      <AccordionItem id="1" title="Section 1">
        <p>Content for section 1</p>
      </AccordionItem>
      <AccordionItem id="2" title="Section 2">
        <p>Content for section 2</p>
      </AccordionItem>
      <AccordionItem id="3" title="Section 3">
        <p>Content for section 3</p>
      </AccordionItem>
    </Accordion>
  );
}
```

### **Render Props Pattern**

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return children({ data, loading, error });
}

// Usage
function UserList() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        if (!data) return <div>No data</div>;

        return (
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}
```

## 📝 **Practice Exercises**

### **Exercise 1: Build a Compound Component System**

Create a Tab component system that:

- Uses compound components
- Manages tab state internally
- Provides flexible content rendering
- Supports custom styling

```jsx
function TabSystem() {
  // Your code here
}
```

### **Exercise 2: Implement Error Boundaries**

Build a robust error handling system with:

- Multiple error boundary levels
- Error reporting to external services
- Recovery mechanisms
- User-friendly error messages

```jsx
function ErrorHandlingSystem() {
  // Your code here
}
```

### **Exercise 3: Create a Performance-Optimized Dashboard**

Build a dashboard that:

- Uses code splitting
- Implements virtual scrolling
- Optimizes re-renders
- Handles large datasets efficiently

```jsx
function OptimizedDashboard() {
  // Your code here
}
```

## 🎯 **Key Takeaways**

1. **Organize by features** rather than by component types
2. **Keep state colocated** with components that use it
3. **Use error boundaries** to gracefully handle errors
4. **Implement code splitting** for better performance
5. **Apply performance patterns** like virtual scrolling and debouncing
6. **Use compound components** for flexible, reusable UI patterns
7. **Follow React best practices** for maintainable code

## 🚀 **Next Steps**

In the next lesson, you'll learn about:

- **Testing React components** with Jest and React Testing Library
- **Deploying React applications** to production
- **Building complete, production-ready React apps**
- **Advanced React ecosystem** tools and libraries

## 💡 **Tips for Success**

- **Start with simple patterns** and gradually add complexity
- **Profile your applications** to identify performance bottlenecks
- **Test your error boundaries** to ensure they work correctly
- **Document your patterns** for team collaboration
- **Follow established conventions** in the React community
- **Measure performance** before and after optimizations

## 🔍 **Common Mistakes to Avoid**

1. **Over-engineering** simple components
2. **Not handling errors** gracefully
3. **Ignoring performance** until it's too late
4. **Creating deeply nested** component hierarchies
5. **Not testing** error scenarios

---

**Ready to build production-ready React applications? Let's create something amazing! 🎉**
