# React Todo App Project

## 🎯 **Project Overview**

Welcome to your **Week 3 React Project**! In this project, you'll build a complete, interactive Todo application using all the React concepts you've learned. This project will demonstrate your understanding of React components, props, state management, custom hooks, and advanced React patterns.

## 🚀 **What You'll Build**

A feature-rich Todo application that includes:

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos by status (all, active, completed)
- ✅ Search functionality
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Custom hooks for reusable logic
- ✅ Performance optimization

## 🛠️ **Technologies Used**

- **React 18** - Component-based UI library
- **Custom Hooks** - Reusable logic and business rules
- **Local Storage** - Data persistence between sessions
- **CSS Modules** - Scoped styling for components
- **Modern JavaScript** - ES6+ features and syntax
- **React DevTools** - Debugging and development

## 📁 **Project Structure**

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoApp.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   ├── TodoFilter.jsx
│   │   └── SearchBar.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTodos.js
│   │   └── useSearch.js
│   ├── utils/
│   │   └── todoUtils.js
│   ├── styles/
│   │   ├── TodoApp.module.css
│   │   ├── TodoForm.module.css
│   │   ├── TodoList.module.css
│   │   ├── TodoItem.module.css
│   │   ├── TodoFilter.module.css
│   │   └── SearchBar.module.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## 🧩 **Component Breakdown**

### **1. TodoApp (Main Component)**

The main component that orchestrates the entire application:

```jsx
import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import SearchBar from "./components/SearchBar";
import { useTodos } from "./hooks/useTodos";
import { useSearch } from "./hooks/useSearch";
import styles from "./styles/TodoApp.module.css";

function TodoApp() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted } =
    useTodos();

  const { searchTerm, setSearchTerm, filteredTodos } = useSearch(todos);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>React Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className={styles.main}>
        <TodoForm onAddTodo={addTodo} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <TodoFilter
          activeCount={activeTodos.length}
          completedCount={completedTodos.length}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          todos={filteredTodos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
    </div>
  );
}

export default TodoApp;
```

### **2. TodoForm Component**

Handles adding new todos with form validation:

```jsx
import React, { useState } from "react";
import styles from "../styles/TodoForm.module.css";

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
        maxLength={100}
      />
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
```

### **3. TodoList Component**

Displays the list of todos with proper rendering:

```jsx
import React from "react";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

function TodoList({ todos, onUpdateTodo, onDeleteTodo, onToggleTodo }) {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No todos found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

### **4. TodoItem Component**

Individual todo item with edit and delete functionality:

```jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/TodoItem.module.css";

function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />

      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          className={styles.editInput}
        />
      ) : (
        <span className={styles.text} onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className={styles.deleteButton}
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
```

### **5. TodoFilter Component**

Filtering and statistics display:

```jsx
import React from "react";
import styles from "../styles/TodoFilter.module.css";

function TodoFilter({ activeCount, completedCount, onClearCompleted }) {
  return (
    <div className={styles.filter}>
      <div className={styles.stats}>
        <span className={styles.count}>{activeCount} active</span>
        <span className={styles.count}>{completedCount} completed</span>
      </div>

      {completedCount > 0 && (
        <button onClick={onClearCompleted} className={styles.clearButton}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default TodoFilter;
```

### **6. SearchBar Component**

Search functionality for todos:

```jsx
import React from "react";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search todos..."
        className={styles.searchInput}
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className={styles.clearSearch}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
```

## 🎣 **Custom Hooks**

### **1. useTodos Hook**

Manages todo state and operations:

```jsx
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { generateId, filterTodos } from "../utils/todoUtils";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    const newTodo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = filterTodos(todos, filter);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
  };
}
```

### **2. useLocalStorage Hook**

Persists data in browser storage:

```jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
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
```

### **3. useSearch Hook**

Handles search functionality:

```jsx
import { useState, useMemo } from "react";

export function useSearch(todos) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todos;

    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTodos,
  };
}
```

## 🎨 **Styling with CSS Modules**

### **Main App Styles**

```css
/* TodoApp.module.css */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  color: #7f8c8d;
  font-size: 16px;
}

.main {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
```

### **Form Styles**

```css
/* TodoForm.module.css */
.form {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ecf0f1;
}

.input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #3498db;
}

.button {
  margin-left: 12px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: #2980b9;
}
```

## 🚀 **Getting Started**

### **1. Create the React App**

```bash
npx create-react-app todo-app
cd todo-app
npm start
```

### **2. Create the File Structure**

Create all the component files and folders as shown in the project structure above.

### **3. Install Dependencies**

The project uses only React's built-in features, so no additional packages are needed.

### **4. Build and Test**

- Add todos using the form
- Edit todos by double-clicking
- Mark todos as complete/incomplete
- Delete todos
- Search through todos
- Filter by status
- Test local storage persistence

## 🎯 **Project Requirements**

### **Core Features (Required)**

- [ ] Add new todos
- [ ] Mark todos as complete/incomplete
- [ ] Edit existing todos
- [ ] Delete todos
- [ ] Filter todos (all, active, completed)
- [ ] Search todos
- [ ] Local storage persistence
- [ ] Responsive design

### **Advanced Features (Bonus)**

- [ ] Due dates for todos
- [ ] Priority levels
- [ ] Categories/tags
- [ ] Drag and drop reordering
- [ ] Export/import functionality
- [ ] Dark/light theme toggle
- [ ] Keyboard shortcuts

## 📝 **Submission Guidelines**

1. **Code Quality**: Clean, readable, well-commented React code
2. **Component Structure**: Proper separation of concerns
3. **Custom Hooks**: At least 3 custom hooks implemented
4. **Styling**: Professional, responsive design
5. **Functionality**: All core features working correctly
6. **Performance**: Optimized with React best practices

## 🎉 **What You'll Learn**

By completing this project, you'll have mastered:

- **React Component Architecture**: Building complex UIs from simple components
- **State Management**: Using useState, useReducer, and custom hooks
- **Performance Optimization**: Implementing React best practices
- **Custom Hooks**: Creating reusable logic
- **Local Storage**: Persisting data in the browser
- **Responsive Design**: Creating mobile-friendly interfaces
- **Project Organization**: Structuring React applications

## 💡 **Tips for Success**

- **Start simple**: Build the basic functionality first, then add features
- **Test frequently**: Make sure each feature works before moving to the next
- **Use the React DevTools**: Inspect component state and props
- **Plan your component hierarchy**: Think about how components will interact
- **Keep components focused**: Each component should have a single responsibility
- **Use TypeScript**: Consider adding TypeScript for better type safety

---

**Ready to build your first complete React application? Let's create something amazing! 🎉**
