# CSS Basics

## 🎯 **Learning Objectives**

By the end of this lesson, you will be able to:

- Understand what CSS is and how it works with HTML
- Write CSS selectors and apply styles
- Use colors, typography, and spacing effectively
- Create basic layouts and positioning
- Style your HTML elements beautifully

## 📚 **What is CSS?**

CSS (Cascading Style Sheets) is the language that makes websites **beautiful**. While HTML provides structure, CSS provides **styling, layout, and visual design**.

### **Why CSS Matters**

- **Visual Appeal**: Makes websites look professional
- **User Experience**: Improves readability and navigation
- **Branding**: Creates consistent visual identity
- **Responsiveness**: Makes sites work on all devices

## 🔗 **How CSS Works with HTML**

CSS connects to HTML in three ways:

### **1. Inline CSS (Not Recommended)**

```html
<h1 style="color: blue; font-size: 24px;">Hello World</h1>
```

### **2. Internal CSS (In HTML file)**

```html
<head>
  <style>
    h1 {
      color: blue;
      font-size: 24px;
    }
  </style>
</head>
```

### **3. External CSS (Recommended)**

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

**Best Practice:** Always use external CSS files for better organization and maintainability.

## 🎨 **CSS Syntax**

CSS follows this basic structure:

```css
selector {
  property: value;
  property: value;
}
```

### **Example:**

```css
h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}
```

## 🎯 **CSS Selectors**

Selectors tell CSS which HTML elements to style:

### **1. Element Selectors**

```css
/* Style all paragraphs */
p {
  color: #333;
  line-height: 1.6;
}

/* Style all headings */
h1,
h2,
h3 {
  font-family: Arial, sans-serif;
}
```

### **2. Class Selectors**

```css
/* Style elements with class="highlight" */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* Style elements with class="button" */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

### **3. ID Selectors**

```css
/* Style element with id="header" */
#header {
  background-color: #333;
  color: white;
  padding: 20px;
}
```

### **4. Descendant Selectors**

```css
/* Style paragraphs inside articles */
article p {
  margin-bottom: 15px;
}

/* Style links inside navigation */
nav a {
  color: #007bff;
  text-decoration: none;
}
```

## 🌈 **Colors in CSS**

### **Color Values**

```css
/* Named colors */
color: red;
color: blue;
color: green;

/* Hexadecimal colors */
color: #ff0000; /* Red */
color: #00ff00; /* Green */
color: #0000ff; /* Blue */

/* RGB colors */
color: rgb(255, 0, 0); /* Red */
color: rgb(0, 255, 0); /* Green */
color: rgb(0, 0, 255); /* Blue */

/* RGBA colors (with transparency) */
color: rgba(255, 0, 0, 0.5); /* Semi-transparent red */
```

### **Color Properties**

```css
/* Text color */
color: #333;

/* Background color */
background-color: #f4f4f4;

/* Border color */
border-color: #ddd;
```

## 📝 **Typography**

### **Font Properties**

```css
/* Font family */
font-family: Arial, Helvetica, sans-serif;

/* Font size */
font-size: 16px;
font-size: 1.2em; /* Relative to parent */
font-size: 1.5rem; /* Relative to root */

/* Font weight */
font-weight: normal;
font-weight: bold;
font-weight: 600; /* Numeric values */

/* Font style */
font-style: normal;
font-style: italic;

/* Text alignment */
text-align: left;
text-align: center;
text-align: right;
text-align: justify;

/* Text decoration */
text-decoration: none;
text-decoration: underline;
text-decoration: line-through;
```

### **Line Height and Spacing**

```css
/* Line height */
line-height: 1.6; /* 1.6 times the font size */
line-height: 24px; /* Specific pixel value */

/* Letter spacing */
letter-spacing: 2px;

/* Word spacing */
word-spacing: 5px;
```

## 📏 **Box Model and Spacing**

Every HTML element is treated as a box with these properties:

```css
.box {
  /* Content dimensions */
  width: 300px;
  height: 200px;

  /* Padding (inside space) */
  padding: 20px; /* All sides */
  padding: 20px 40px; /* Top/bottom, left/right */
  padding: 20px 40px 10px; /* Top, left/right, bottom */
  padding: 20px 40px 10px 30px; /* Top, right, bottom, left */

  /* Border */
  border: 2px solid #333; /* Width, style, color */
  border-radius: 10px; /* Rounded corners */

  /* Margin (outside space) */
  margin: 20px; /* All sides */
  margin: 0 auto; /* Center horizontally */
}
```

### **Individual Properties**

```css
/* Padding */
padding-top: 20px;
padding-right: 40px;
padding-bottom: 10px;
padding-left: 30px;

/* Margin */
margin-top: 20px;
margin-right: 40px;
margin-bottom: 10px;
margin-left: 30px;

/* Border */
border-top: 2px solid #333;
border-right: 2px solid #333;
border-bottom: 2px solid #333;
border-left: 2px solid #333;
```

## 🎨 **Styling Your Portfolio**

Let's add CSS to your HTML portfolio:

```css
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* Header styles */
header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Navigation styles */
nav ul {
  list-style: none;
}

nav ul li {
  display: inline;
  margin: 0 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a:hover {
  color: #007bff;
}

/* Main content styles */
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  background-color: white;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

section h2 {
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 3px solid #007bff;
  padding-bottom: 0.5rem;
}

/* Project styles */
article {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

article h3 {
  color: #007bff;
  margin-bottom: 0.5rem;
}

article a {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 1rem;
}

article a:hover {
  background-color: #0056b3;
}

/* Form styles */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
  color: #555;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
}

button:hover {
  background-color: #218838;
}

/* Footer styles */
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
```

## 🎯 **CSS Best Practices**

### **1. Use Meaningful Class Names**

```css
/* Good */
.primary-button {
}
.navigation-menu {
}
.hero-section {
}

/* Avoid */
.button1 {
}
.div1 {
}
.red {
}
```

### **2. Organize Your CSS**

```css
/* 1. Reset/Base styles */
* {
}

/* 2. Typography */
body,
h1,
h2,
p {
}

/* 3. Layout */
.container,
.header,
.main {
}

/* 4. Components */
.button,
.card,
.form {
}

/* 5. Utilities */
.text-center,
.hidden,
.clearfix {
}
```

### **3. Use Shorthand Properties**

```css
/* Instead of */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* Use */
margin: 10px 20px;
```

### **4. Comment Your Code**

```css
/* Header Section */
.header {
  background-color: #333;
  padding: 20px;
}

/* Navigation Links */
.nav a {
  color: white;
  text-decoration: none;
}
```

## 📋 **Practice Exercises**

### **Exercise 1: Basic Styling**

Style your hobby page with:

- Custom colors for headings and text
- Different font sizes
- Background colors
- Padding and margins

### **Exercise 2: Navigation Styling**

Style your navigation menu with:

- Hover effects
- Background colors
- Proper spacing
- Rounded corners

### **Exercise 3: Form Styling**

Style your contact form with:

- Input field styling
- Button design
- Form layout
- Hover effects

## 🔍 **Key Takeaways**

1. **CSS controls appearance** - HTML provides structure, CSS provides style
2. **Use external CSS files** - better organization and maintainability
3. **Learn the box model** - understanding padding, margin, and border is crucial
4. **Practice with selectors** - they're the foundation of CSS
5. **Organize your code** - use meaningful names and proper structure

## 🚀 **Next Steps**

In the next lesson, you'll learn **CSS Layout & Responsive Design** including Flexbox and Grid systems!

## 📚 **Additional Resources**

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model)
- [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

---

**Great job! You now know the basics of CSS. Practice styling your portfolio and experiment with different properties. See you in the next lesson! 🎨**
