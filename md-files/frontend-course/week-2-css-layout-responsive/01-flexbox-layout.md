# CSS Flexbox Layout System

## 🎯 **Learning Objectives**

By the end of this lesson, you will be able to:

- Understand what Flexbox is and when to use it
- Master Flexbox container properties
- Control flex item behavior and alignment
- Create responsive layouts with Flexbox
- Build common UI components using Flexbox

## 📚 **What is Flexbox?**

Flexbox (Flexible Box Layout) is a **one-dimensional layout method** for arranging items in rows or columns. It's perfect for:

- **Navigation menus** and toolbars
- **Card layouts** and content grids
- **Form layouts** and button groups
- **Responsive designs** that adapt to content

### **Why Flexbox Matters**

- **Simplifies layouts** - no more float hacks
- **Responsive by nature** - adapts to content and screen size
- **Easy alignment** - center items both horizontally and vertically
- **Modern approach** - designed for today's web needs

## 🏗️ **Flexbox Basics**

### **Flex Container vs Flex Items**

```css
/* The parent becomes a flex container */
.flex-container {
  display: flex; /* or display: inline-flex */
}

/* All direct children become flex items */
.flex-item {
  /* These properties now work */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

### **HTML Structure Example**

```html
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

## 🎛️ **Flex Container Properties**

### **1. Flex Direction**

Controls the direction of flex items:

```css
.flex-container {
  display: flex;

  /* Main axis direction */
  flex-direction: row; /* Default: left to right */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column; /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
```

**Visual Examples:**

```css
/* Row (default) */
.flex-row {
  display: flex;
  flex-direction: row;
}
/* [Item1] [Item2] [Item3] */

/* Row Reverse */
.flex-row-reverse {
  display: flex;
  flex-direction: row-reverse;
}
/* [Item3] [Item2] [Item1] */

/* Column */
.flex-column {
  display: flex;
  flex-direction: column;
}
/* [Item1]
   [Item2]
   [Item3] */
```

### **2. Flex Wrap**

Controls whether items wrap to new lines:

```css
.flex-container {
  display: flex;

  flex-wrap: nowrap; /* Default: all items on one line */
  flex-wrap: wrap; /* Items wrap to new lines */
  flex-wrap: wrap-reverse; /* Items wrap in reverse order */
}
```

**Example with wrapping:**

```css
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 300px; /* Container width */
}

.flex-item {
  width: 150px; /* Items wider than container */
}
/* Result: Items wrap to new line */
```

### **3. Justify Content**

Aligns items along the **main axis**:

```css
.flex-container {
  display: flex;

  justify-content: flex-start; /* Default: left/top */
  justify-content: flex-end; /* Right/bottom */
  justify-content: center; /* Center */
  justify-content: space-between; /* Space between items */
  justify-content: space-around; /* Space around items */
  justify-content: space-evenly; /* Equal space between */
}
```

**Visual Examples:**

```css
/* Space Between */
.space-between {
  justify-content: space-between;
}
/* [Item1]     [Item2]     [Item3] */

/* Space Around */
.space-around {
  justify-content: space-around;
}
/* [Item1]  [Item2]  [Item3] */

/* Center */
.center {
  justify-content: center;
}
/*     [Item1] [Item2] [Item3]     */
```

### **4. Align Items**

Aligns items along the **cross axis**:

```css
.flex-container {
  display: flex;

  align-items: stretch; /* Default: stretch to fill */
  align-items: flex-start; /* Top/left */
  align-items: flex-end; /* Bottom/right */
  align-items: center; /* Center */
  align-items: baseline; /* Align by text baseline */
}
```

**Example with different item heights:**

```css
.flex-container {
  display: flex;
  align-items: center; /* Vertically center items */
  height: 200px;
}

.flex-item {
  padding: 20px;
}
/* Item1: height 100px
   Item2: height 150px  
   Item3: height 80px
   All centered vertically */
```

### **5. Align Content**

Controls alignment of multiple lines (when wrapping):

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;

  align-content: stretch; /* Default: stretch lines */
  align-content: flex-start; /* Pack lines at start */
  align-content: flex-end; /* Pack lines at end */
  align-content: center; /* Center lines */
  align-content: space-between; /* Space between lines */
  align-content: space-around; /* Space around lines */
}
```

## 🎯 **Flex Item Properties**

### **1. Flex Grow**

Controls how much an item can grow relative to others:

```css
.flex-item {
  flex-grow: 0; /* Default: don't grow */
  flex-grow: 1; /* Grow equally with others */
  flex-grow: 2; /* Grow twice as much as others */
}
```

**Example:**

```css
.flex-container {
  display: flex;
  width: 600px;
}

.flex-item {
  flex-grow: 1; /* All items grow equally */
  /* Result: Each item gets 200px */
}

.flex-item.special {
  flex-grow: 2; /* This item grows twice as much */
  /* Result: Special gets 300px, others get 150px each */
}
```

### **2. Flex Shrink**

Controls how much an item can shrink relative to others:

```css
.flex-item {
  flex-shrink: 1; /* Default: shrink equally */
  flex-shrink: 0; /* Don't shrink */
  flex-shrink: 2; /* Shrink twice as much */
}
```

**Example:**

```css
.flex-container {
  display: flex;
  width: 300px; /* Container smaller than items */
}

.flex-item {
  width: 150px; /* Items are 150px each */
  flex-shrink: 1; /* All shrink equally */
  /* Result: Each item becomes 100px */
}

.flex-item.no-shrink {
  flex-shrink: 0; /* This item doesn't shrink */
  /* Result: No-shrink stays 150px, others become 75px each */
}
```

### **3. Flex Basis**

Sets the initial size of a flex item:

```css
.flex-item {
  flex-basis: auto; /* Default: use width/height */
  flex-basis: 200px; /* Fixed size */
  flex-basis: 50%; /* Percentage */
  flex-basis: 0; /* Size based on content */
}
```

### **4. Flex Shorthand**

Combines all three flex properties:

```css
.flex-item {
  /* flex: grow shrink basis */
  flex: 0 1 auto; /* Default values */
  flex: 1 1 0; /* Grow equally, no minimum size */
  flex: 2 1 200px; /* Grow twice as much, start at 200px */
  flex: 1 0 auto; /* Grow, don't shrink */
}
```

### **5. Align Self**

Overrides the container's `align-items` for individual items:

```css
.flex-item {
  align-self: auto; /* Default: use container's align-items */
  align-self: flex-start; /* Override to top/left */
  align-self: center; /* Override to center */
  align-self: flex-end; /* Override to bottom/right */
  align-self: stretch; /* Override to stretch */
}
```

## 🎨 **Practical Examples**

### **1. Navigation Menu**

```html
<nav class="navbar">
  <div class="logo">Brand</div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}
```

### **2. Card Layout**

```html
<div class="card-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, start at 300px */
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

### **3. Form Layout**

```html
<form class="form">
  <div class="form-row">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
  </div>
  <div class="form-row">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" />
  </div>
  <button type="submit">Submit</button>
</form>
```

```css
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-row label {
  flex: 0 0 100px; /* Don't grow/shrink, fixed width */
}

.form-row input {
  flex: 1; /* Take remaining space */
  padding: 0.5rem;
}

button {
  align-self: flex-start; /* Align button to left */
  padding: 0.5rem 1rem;
}
```

## 🎯 **Flexbox Best Practices**

### **1. Choose the Right Direction**

```css
/* For horizontal layouts */
.horizontal {
  display: flex;
  flex-direction: row; /* or default */
}

/* For vertical layouts */
.vertical {
  display: flex;
  flex-direction: column;
}
```

### **2. Use Flex Shorthand**

```css
/* Instead of */
.flex-item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

/* Use */
.flex-item {
  flex: 1 1 0;
}
```

### **3. Control Item Sizes**

```css
/* Equal width items */
.equal-width {
  flex: 1;
}

/* Fixed width items */
.fixed-width {
  flex: 0 0 200px;
}

/* Proportional growth */
.proportional {
  flex: 2; /* Grows twice as much as flex: 1 */
}
```

### **4. Handle Wrapping**

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Modern spacing */
}

.flex-item {
  flex: 1 1 300px; /* Responsive sizing */
}
```

## 📋 **Practice Exercises**

### **Exercise 1: Basic Flexbox Layout**

Create a flexbox container with:

- 3 items that grow equally
- Items centered both horizontally and vertically
- Responsive behavior when resizing

### **Exercise 2: Navigation Bar**

Build a navigation bar with:

- Logo on the left
- Menu items on the right
- Proper spacing and alignment
- Mobile-friendly layout

### **Exercise 3: Card Grid**

Create a responsive card grid with:

- Cards that wrap to new lines
- Equal height cards
- Proper spacing between cards
- Responsive breakpoints

## 🔍 **Key Takeaways**

1. **Flexbox is one-dimensional** - perfect for rows OR columns
2. **Container controls layout** - items follow container rules
3. **Main axis vs cross axis** - understand direction for alignment
4. **Flex properties control growth** - use flex shorthand for efficiency
5. **Responsive by nature** - adapts to content and screen size

## 🚀 **Next Steps**

In the next lesson, you'll learn **CSS Grid Layout** for two-dimensional layouts and complex page structures!

## 📚 **Additional Resources**

- [MDN Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS-Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Interactive learning game

---

**Great job! You now understand Flexbox fundamentals. Practice building layouts and experiment with different properties. See you in the next lesson! 🎯**
