# Week 4 Project: Interactive React Portfolio

## 🎯 **Project Overview**

Welcome to your **Week 4 React Project**! In this final project, you'll build a complete, production-ready React portfolio application that showcases all the advanced React concepts you've learned. This project will demonstrate your mastery of React Hooks, performance optimization, error handling, and modern React patterns.

## 🚀 **What You'll Build**

A professional, interactive portfolio website that includes:

- ✅ Modern, responsive design with dark/light themes
- ✅ Interactive navigation and smooth transitions
- ✅ Project showcase with filtering and search
- ✅ Contact form with validation
- ✅ Blog section with markdown support
- ✅ Performance optimizations and code splitting
- ✅ Error boundaries and error handling
- ✅ Local storage for user preferences
- ✅ SEO optimization and accessibility

## 🛠️ **Technologies Used**

- **React 18** - Latest React features and hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling and validation
- **Vite** - Fast build tool and development server

## 📁 **Project Structure**

```
portfolio-app/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Blog.tsx
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── NewsletterForm.tsx
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useFormValidation.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── AppContext.tsx
│   ├── utils/
│   │   ├── animations.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🧩 **Core Components**

### **1. App Component with Context Providers**

```tsx
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppProvider>
            <BrowserRouter>
              <Suspense fallback={<LoadingSpinner />}>
                <Layout />
              </Suspense>
            </BrowserRouter>
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
```

### **2. Theme Context with Local Storage**

```tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(systemTheme);
      root.classList.toggle("dark", systemTheme);
    } else {
      setIsDark(theme === "dark");
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        setIsDark(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

### **3. Hero Section with Animations**

```tsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/Button";

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center max-w-4xl mx-auto px-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Your Name
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Full-Stack Developer & UI/UX Enthusiast
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          I create beautiful, performant, and accessible web experiences using
          modern technologies and best practices.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView()
            }
          >
            View My Work
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView()}
          >
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
```

### **4. Projects Section with Filtering**

```tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "../ui/ProjectCard";
import { Button } from "../ui/Button";
import { useProjects } from "../../hooks/useProjects";

const categories = ["All", "Frontend", "Backend", "Full-Stack", "Mobile"];

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { projects, isLoading, error } = useProjects();

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.categories.includes(selectedCategory);
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error.message}</div>;

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Here are some of the projects I've worked on
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "primary" : "secondary"
                }
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
```

### **5. Contact Form with Validation**

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { useContactForm } from "../../hooks/useContactForm";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();
  const { submitForm, isLoading, isSuccess, error } = useContactForm();

  const onSubmit = async (data: ContactFormData) => {
    const success = await submitForm(data);
    if (success) {
      reset();
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Let's work together on your next project
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
        >
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              Error: {error.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
```

## 🎣 **Custom Hooks**

### **1. useScrollPosition Hook**

```tsx
import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (position > lastPosition) {
        setDirection("down");
      } else if (position < lastPosition) {
        setDirection("up");
      }

      setLastPosition(position);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPosition]);

  return { scrollPosition, direction };
}
```

### **2. useIntersectionObserver Hook**

```tsx
import { useState, useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    },
    [hasIntersected]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || "0px",
      root: options.root || null,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options.threshold, options.rootMargin, options.root]);

  return { ref: elementRef, isIntersecting, hasIntersected };
}
```

### **3. useFormValidation Hook**

```tsx
import { useState, useCallback } from "react";

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback(
    (name: string, value: string) => {
      const fieldRules = rules[name] || [];
      const fieldErrors = fieldRules
        .map((rule) => (!rule.test(value) ? rule.message : null))
        .filter(Boolean);

      return fieldErrors[0] || null;
    },
    [rules]
  );

  const validateForm = useCallback(
    (values: { [key: string]: string }) => {
      const newErrors: { [key: string]: string } = {};

      Object.keys(rules).forEach((fieldName) => {
        const error = validateField(fieldName, values[fieldName] || "");
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [rules, validateField]
  );

  const setFieldTouched = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    setFieldTouched,
    clearErrors,
  };
}
```

## 🚀 **Getting Started**

### **1. Create the Project**

```bash
npm create vite@latest portfolio-app -- --template react-ts
cd portfolio-app
npm install
```

### **2. Install Dependencies**

```bash
npm install react-router-dom framer-motion react-query react-hook-form
npm install -D tailwindcss postcss autoprefixer @types/node
```

### **3. Configure Tailwind CSS**

```bash
npx tailwindcss init -p
```

### **4. Set Up Project Structure**

Create all the folders and files as shown in the project structure above.

### **5. Start Development**

```bash
npm run dev
```

## 🎯 **Project Requirements**

### **Core Features (Required)**

- [ ] Responsive design with dark/light themes
- [ ] Smooth animations and transitions
- [ ] Project showcase with filtering
- [ ] Contact form with validation
- [ ] Blog section (optional)
- [ ] Performance optimizations
- [ ] Error boundaries
- [ ] SEO optimization

### **Advanced Features (Bonus)**

- [ ] Blog with markdown support
- [ ] Admin panel for content management
- [ ] Analytics integration
- [ ] PWA capabilities
- [ ] Internationalization (i18n)
- [ ] Advanced animations
- [ ] Performance monitoring

## 📝 **Submission Guidelines**

1. **Code Quality**: Clean, readable, well-commented TypeScript code
2. **Component Architecture**: Proper separation of concerns and reusable components
3. **Performance**: Optimized with React.memo, useMemo, useCallback
4. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
5. **Responsiveness**: Mobile-first design approach
6. **Error Handling**: Comprehensive error boundaries and user feedback
7. **Documentation**: Clear README and component documentation

## 🎉 **What You'll Learn**

By completing this project, you'll have mastered:

- **Advanced React Patterns**: Compound components, render props, custom hooks
- **Performance Optimization**: Code splitting, lazy loading, memoization
- **State Management**: Context API, useReducer, complex state logic
- **Error Handling**: Error boundaries, graceful degradation
- **Modern Development**: TypeScript, modern build tools, testing
- **Production Readiness**: Performance, accessibility, SEO
- **Real-world Application**: Complete app architecture and deployment

## 💡 **Tips for Success**

- **Start with the core structure** and add features incrementally
- **Focus on performance** from the beginning
- **Test on different devices** and screen sizes
- **Implement error boundaries** early in development
- **Use TypeScript** for better type safety and developer experience
- **Optimize for Core Web Vitals** and accessibility
- **Document your decisions** and component APIs

---

**Ready to build your professional React portfolio? Let's create something amazing! 🎉**
