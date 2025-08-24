# Week 2 Project: Interactive Dashboard

## 🎯 **Project Overview**

Build a professional **Interactive Dashboard** using CSS Grid, Flexbox, and responsive design principles learned in Week 2.

## 🚀 **Project Requirements**

### **Must Have Features:**

1. **CSS Grid Layout** for main dashboard structure
2. **Flexbox Components** for navigation and cards
3. **Mobile-First Design** with progressive enhancement
4. **Responsive Navigation** with mobile menu
5. **Interactive Elements** (hover effects, transitions)
6. **Professional UI Components** (cards, buttons, forms)

## 📁 **Project Structure**

```
dashboard-project/
├── index.html
├── styles.css
├── script.js
├── images/
└── README.md
```

## 🎨 **Design Guidelines**

### **Color Palette:**

- **Primary**: Professional blue (#2563eb)
- **Background**: Light neutral (#f8fafc)
- **Surface**: White (#ffffff)
- **Text**: Dark gray (#1e293b)

### **Layout Principles:**

- **Grid System**: CSS Grid for main layout
- **Flexbox**: Component layouts and alignment
- **Responsive**: Mobile-first approach
- **Spacing**: Consistent using CSS variables

## 📝 **Core HTML Structure**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interactive Dashboard</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>Dashboard</h1>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#dashboard" class="nav-link active">Dashboard</a></li>
          <li><a href="#analytics" class="nav-link">Analytics</a></li>
          <li><a href="#users" class="nav-link">Users</a></li>
          <li><a href="#settings" class="nav-link">Settings</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-header">
        <button class="menu-toggle">☰</button>
        <h2>Dashboard Overview</h2>
      </header>

      <div class="dashboard-content">
        <!-- Stats Cards -->
        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total Users</h3>
              <p class="stat-number">12,543</p>
            </div>
            <div class="stat-card">
              <h3>Total Sales</h3>
              <p class="stat-number">$45,231</p>
            </div>
            <div class="stat-card">
              <h3>Page Views</h3>
              <p class="stat-number">89,123</p>
            </div>
          </div>
        </section>

        <!-- Charts Section -->
        <section class="charts-section">
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Revenue Chart</h3>
              <div class="chart-placeholder">Chart Area</div>
            </div>
            <div class="chart-card">
              <h3>User Activity</h3>
              <div class="chart-placeholder">Activity Chart</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </body>
</html>
```

## 🎨 **CSS Layout Structure**

```css
/* CSS Variables */
:root {
  --primary-color: #2563eb;
  --background-color: #f8fafc;
  --surface-color: #ffffff;
  --text-primary: #1e293b;
  --sidebar-width: 280px;
  --border-radius: 12px;
}

/* Main Layout using CSS Grid */
.dashboard-container {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
}

/* Sidebar using Flexbox */
.sidebar {
  background-color: var(--surface-color);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Stats Grid using CSS Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    left: -100%;
    transition: left 0.3s ease;
  }

  .sidebar.active {
    left: 0;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🎯 **Key Features to Implement**

### **1. CSS Grid Layout**

- Main dashboard structure
- Responsive grid columns
- Grid areas for complex layouts

### **2. Flexbox Components**

- Navigation menus
- Card layouts
- Form elements
- Button groups

### **3. Responsive Design**

- Mobile-first approach
- Media queries for breakpoints
- Flexible typography
- Touch-friendly interactions

### **4. Interactive Elements**

- Hover effects on cards
- Smooth transitions
- Mobile menu toggle
- Theme switching

## 📋 **Project Checklist**

- [ ] **CSS Grid Layout** for main structure
- [ ] **Flexbox Components** for UI elements
- [ ] **Mobile-First Design** with progressive enhancement
- [ ] **Responsive Navigation** with mobile menu
- [ ] **Interactive Elements** and animations
- [ ] **Professional Styling** and consistent design
- [ ] **Cross-Device Testing** on multiple screen sizes

## 🚀 **Next Steps**

Complete this project to prepare for:

- **Week 3**: JavaScript Fundamentals
- **Week 4**: DOM Manipulation & Interactive Features

---

**Build an impressive dashboard that showcases your layout skills! 🎯**
