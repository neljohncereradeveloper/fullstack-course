# CSS Grid Layout System

## 🎯 **Learning Objectives**

By the end of this lesson, you will be able to:

- Understand what CSS Grid is and when to use it
- Create grid containers and define grid areas
- Master grid template properties and sizing
- Control item placement and alignment
- Build complex page layouts with CSS Grid

## 📚 **What is CSS Grid?**

CSS Grid is a **two-dimensional layout system** that allows you to create complex layouts with rows and columns simultaneously. It's perfect for:

- **Page layouts** and overall structure
- **Dashboard designs** with multiple sections
- **Photo galleries** and image grids
- **Complex forms** with multiple columns
- **Responsive layouts** that adapt to different screen sizes

### **Why CSS Grid Matters**

- **Two-dimensional control** - manage both rows and columns
- **Precise positioning** - place items exactly where you want
- **Responsive by design** - adapts to content and viewport
- **Modern approach** - designed for complex layouts

## 🏗️ **Grid Basics**

### **Grid Container vs Grid Items**

```css
/* The parent becomes a grid container */
.grid-container {
  display: grid; /* or display: inline-grid */
}

/* All direct children become grid items */
.grid-item {
  /* Grid properties now work */
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}
```

### **HTML Structure Example**

```html
<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
</div>
```

## 🎛️ **Grid Container Properties**

### **1. Grid Template Columns**

Defines the columns in your grid:

```css
.grid-container {
  display: grid;

  /* Fixed column sizes */
  grid-template-columns: 200px 200px 200px;

  /* Flexible column sizes */
  grid-template-columns: 1fr 2fr 1fr;

  /* Mixed sizes */
  grid-template-columns: 200px 1fr 300px;

  /* Auto-sizing columns */
  grid-template-columns: auto auto auto;

  /* Repeat function */
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

**Visual Examples:**

```css
/* Three equal columns */
.three-columns {
  grid-template-columns: 1fr 1fr 1fr;
}
/* [Col1] [Col2] [Col3] */

/* Sidebar + Main + Sidebar */
.sidebar-layout {
  grid-template-columns: 250px 1fr 250px;
}
/* [Sidebar] [Main Content] [Sidebar] */

/* Responsive columns */
.responsive {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
/* Automatically adjusts number of columns */
```

### **2. Grid Template Rows**

Defines the rows in your grid:

```css
.grid-container {
  display: grid;

  /* Fixed row heights */
  grid-template-rows: 100px 200px 100px;

  /* Flexible row heights */
  grid-template-rows: 1fr 2fr 1fr;

  /* Auto-sizing rows */
  grid-template-rows: auto auto auto;

  /* Repeat function */
  grid-template-rows: repeat(3, 1fr);
}
```

**Example with both columns and rows:**

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px 200px 100px;
}
/* Creates a 3x3 grid with specific dimensions */
```

### **3. Grid Template Areas**

Creates named grid areas for easier layout management:

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 80px 1fr 80px;

  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}
```

**HTML with area names:**

```html
<div class="grid-container">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main Content</main>
  <aside class="aside">Aside</aside>
  <footer class="footer">Footer</footer>
</div>
```

**CSS for grid areas:**

```css
.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.aside {
  grid-area: aside;
}

.footer {
  grid-area: footer;
}
```

### **4. Grid Gap**

Controls spacing between grid items:

```css
.grid-container {
  display: grid;

  /* Equal gaps */
  gap: 20px;

  /* Different row and column gaps */
  row-gap: 20px;
  column-gap: 40px;

  /* Shorthand for both */
  gap: 20px 40px; /* row-gap column-gap */
}
```

### **5. Grid Alignment Properties**

Controls alignment of the entire grid:

```css
.grid-container {
  display: grid;

  /* Align grid content */
  justify-content: start | end | center | stretch | space-around | space-between
    | space-evenly;

  /* Align grid content vertically */
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;

  /* Align items within grid cells */
  justify-items: start | end | center | stretch;

  /* Align items vertically within grid cells */
  align-items: start | end | center | stretch;
}
```

## 🎯 **Grid Item Properties**

### **1. Grid Column**

Controls which columns an item spans:

```css
.grid-item {
  /* Start and end column lines */
  grid-column: 1 / 3; /* From line 1 to line 3 */
  grid-column: 2 / 4; /* From line 2 to line 4 */

  /* Span multiple columns */
  grid-column: 1 / span 2; /* Start at line 1, span 2 columns */
  grid-column: span 2; /* Span 2 columns from current position */

  /* Individual properties */
  grid-column-start: 1;
  grid-column-end: 3;
}
```

### **2. Grid Row**

Controls which rows an item spans:

```css
.grid-item {
  /* Start and end row lines */
  grid-row: 1 / 3; /* From line 1 to line 3 */
  grid-row: 2 / 4; /* From line 2 to line 4 */

  /* Span multiple rows */
  grid-row: 1 / span 2; /* Start at line 1, span 2 rows */
  grid-row: span 2; /* Span 2 rows from current position */

  /* Individual properties */
  grid-row-start: 1;
  grid-row-end: 3;
}
```

### **3. Grid Area**

Shorthand for setting both row and column:

```css
.grid-item {
  /* grid-area: row-start / column-start / row-end / column-end */
  grid-area: 1 / 1 / 3 / 3; /* Spans rows 1-2 and columns 1-2 */

  /* Or use named area */
  grid-area: main;
}
```

### **4. Justify Self & Align Self**

Overrides container alignment for individual items:

```css
.grid-item {
  /* Horizontal alignment within grid cell */
  justify-self: start | end | center | stretch;

  /* Vertical alignment within grid cell */
  align-self: start | end | center | stretch;
}
```

## 🎨 **Practical Examples**

### **1. Basic Page Layout**

```html
<div class="page-layout">
  <header class="header">Header</header>
  <nav class="sidebar">Navigation</nav>
  <main class="main">Main Content</main>
  <aside class="aside">Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>
```

```css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 80px 1fr 100px;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 20px;
}

.header {
  grid-area: header;
  background: #333;
  color: white;
  padding: 1rem;
}

.sidebar {
  grid-area: sidebar;
  background: #f4f4f4;
  padding: 1rem;
}

.main {
  grid-area: main;
  padding: 1rem;
}

.aside {
  grid-area: aside;
  background: #f4f4f4;
  padding: 1rem;
}

.footer {
  grid-area: footer;
  background: #333;
  color: white;
  padding: 1rem;
}
```

### **2. Photo Gallery Grid**

```html
<div class="photo-gallery">
  <div class="photo photo-large">Photo 1</div>
  <div class="photo">Photo 2</div>
  <div class="photo">Photo 3</div>
  <div class="photo">Photo 4</div>
  <div class="photo photo-wide">Photo 5</div>
  <div class="photo">Photo 6</div>
</div>
```

```css
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 20px;
  padding: 20px;
}

.photo {
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.photo-large {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}

.photo-wide {
  grid-column: 2 / span 3;
}
```

### **3. Dashboard Layout**

```html
<div class="dashboard">
  <div class="widget widget-large">Large Widget</div>
  <div class="widget">Widget 1</div>
  <div class="widget">Widget 2</div>
  <div class="widget widget-tall">Tall Widget</div>
  <div class="widget">Widget 3</div>
  <div class="widget">Widget 4</div>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 150px);
  gap: 20px;
  padding: 20px;
}

.widget {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.widget-large {
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}

.widget-tall {
  grid-row: 2 / span 2;
}
```

## 🎯 **Advanced Grid Features**

### **1. Auto-Fit vs Auto-Fill**

```css
/* Auto-fit: creates as many columns as can fit */
.auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Auto-fill: creates columns even if they're empty */
.auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### **2. Grid Line Naming**

```css
.grid-container {
  display: grid;
  grid-template-columns: [sidebar-start] 250px [sidebar-end main-start] 1fr [main-end];
  grid-template-rows: [header-start] 80px [header-end] 1fr [footer-start] 100px [footer-end];
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
}

.main {
  grid-column: main-start / main-end;
}
```

### **3. Subgrid (Modern Feature)**

```css
.grid-item {
  display: grid;
  grid-template-columns: subgrid;
  /* Inherits parent grid columns */
}
```

## 🎯 **Grid Best Practices**

### **1. Choose Grid vs Flexbox**

```css
/* Use Grid for: */
/* - Page layouts */
/* - Two-dimensional layouts */
/* - Complex positioning */

/* Use Flexbox for: */
/* - Component layouts */
/* - One-dimensional layouts */
/* - Content distribution */
```

### **2. Responsive Grid Design**

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* Mobile first approach */
@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}
```

### **3. Grid Areas for Complex Layouts**

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main sidebar"
    "nav footer sidebar";
  grid-template-columns: 200px 1fr 250px;
  grid-template-rows: 80px 1fr 100px;
}
```

## 📋 **Practice Exercises**

### **Exercise 1: Basic Grid Layout**

Create a grid with:

- 3 columns and 3 rows
- Different sized items
- Proper spacing and alignment

### **Exercise 2: Page Layout**

Build a complete page layout with:

- Header, sidebar, main content, footer
- Responsive grid areas
- Proper content distribution

### **Exercise 3: Dashboard Grid**

Create a dashboard with:

- Multiple widget sizes
- Responsive column layout
- Clean visual hierarchy

## 🔍 **Key Takeaways**

1. **Grid is two-dimensional** - perfect for complex layouts
2. **Template areas simplify** - use names for easier management
3. **Auto-fit/auto-fill responsive** - adapts to content and viewport
4. **Grid lines precise** - place items exactly where needed
5. **Combine with Flexbox** - use both for optimal layouts

## 🚀 **Next Steps**

In the next lesson, you'll learn **Responsive Design & Media Queries** to make your layouts work perfectly on all devices!

## 📚 **Additional Resources**

- [MDN CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS-Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Grid by Example](https://gridbyexample.com/) - Comprehensive examples

---

**Excellent! You now understand CSS Grid fundamentals. Practice creating complex layouts and experiment with different grid patterns. See you in the next lesson! 🎯**
