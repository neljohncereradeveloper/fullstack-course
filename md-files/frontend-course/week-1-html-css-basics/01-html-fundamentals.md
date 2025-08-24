# HTML Fundamentals

## 🎯 **Learning Objectives**

By the end of this lesson, you will be able to:

- Understand what HTML is and why it's important
- Create proper HTML document structure
- Use semantic HTML elements correctly
- Write clean, accessible HTML code
- Build a basic webpage from scratch

## 📚 **What is HTML?**

HTML (HyperText Markup Language) is the **foundation** of every website. It's not a programming language, but a **markup language** that tells web browsers how to structure and display content.

### **Why HTML Matters**

- **Structure**: Organizes content logically
- **Accessibility**: Helps screen readers understand your content
- **SEO**: Search engines use HTML to understand your site
- **Foundation**: All other web technologies build on HTML

## 🏗️ **HTML Document Structure**

Every HTML document follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Webpage</title>
  </head>
  <body>
    <!-- Your content goes here -->
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>
```

### **Breaking Down the Structure**

1. **`<!DOCTYPE html>`** - Tells the browser this is HTML5
2. **`<html>`** - Root element, contains everything
3. **`<head>`** - Contains metadata (not visible on page)
4. **`<body>`** - Contains visible content

## 🏷️ **Essential HTML Elements**

### **Headings (h1-h6)**

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Minor Section</h4>
<h5>Small Section</h5>
<h6>Tiny Section</h6>
```

**Best Practices:**

- Use only **one `<h1>`** per page
- Follow logical hierarchy (h1 → h2 → h3)
- Don't skip levels (h1 → h3 is wrong)

### **Paragraphs**

```html
<p>
  This is a paragraph of text. It can contain multiple sentences and will
  automatically wrap to new lines.
</p>

<p>This is another paragraph. Each paragraph is separated by space.</p>
```

### **Links**

```html
<!-- External link -->
<a href="https://www.google.com">Visit Google</a>

<!-- Internal link -->
<a href="about.html">About Us</a>

<!-- Link with target -->
<a href="https://www.github.com" target="_blank">GitHub (opens in new tab)</a>
```

### **Images**

```html
<!-- Basic image -->
<img src="photo.jpg" alt="Description of the image" />

<!-- Image with dimensions -->
<img src="logo.png" alt="Company Logo" width="200" height="100" />

<!-- Responsive image -->
<img
  src="banner.jpg"
  alt="Banner Image"
  style="max-width: 100%; height: auto;"
/>
```

**Important:** Always include the `alt` attribute for accessibility!

## 🎨 **Semantic HTML Elements**

Semantic HTML uses meaningful elements that clearly describe their purpose:

### **Header & Navigation**

```html
<header>
  <h1>Website Title</h1>
  <nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</header>
```

### **Main Content**

```html
<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>

  <section>
    <h2>Section Title</h2>
    <p>Section content...</p>
  </section>
</main>
```

### **Sidebar & Footer**

```html
<aside>
  <h3>Related Links</h3>
  <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
  </ul>
</aside>

<footer>
  <p>&copy; 2024 Your Name. All rights reserved.</p>
</footer>
```

## 📝 **Lists**

### **Unordered Lists**

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### **Ordered Lists**

```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

### **Nested Lists**

```html
<ul>
  <li>
    Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
      <li>Oranges</li>
    </ul>
  </li>
  <li>
    Vegetables
    <ul>
      <li>Carrots</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```

## 🎯 **Forms Basics**

### **Basic Form Structure**

```html
<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <button type="submit">Submit</button>
</form>
```

### **Common Input Types**

```html
<!-- Text input -->
<input type="text" placeholder="Enter your name" />

<!-- Email input -->
<input type="email" placeholder="Enter your email" />

<!-- Password input -->
<input type="password" placeholder="Enter your password" />

<!-- Number input -->
<input type="number" min="0" max="100" step="1" />

<!-- Date input -->
<input type="date" />

<!-- Checkbox -->
<input type="checkbox" id="agree" name="agree" />
<label for="agree">I agree to the terms</label>

<!-- Radio buttons -->
<input type="radio" id="male" name="gender" value="male" />
<label for="male">Male</label>
<input type="radio" id="female" name="gender" value="female" />
<label for="female">Female</label>
```

## 🚀 **HTML Best Practices**

### **1. Use Semantic Elements**

```html
<!-- Good -->
<article>
  <h2>Blog Post Title</h2>
  <p>Blog content...</p>
</article>

<!-- Avoid -->
<div class="blog-post">
  <div class="title">Blog Post Title</div>
  <div class="content">Blog content...</div>
</div>
```

### **2. Proper Indentation**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Page</title>
  </head>
  <body>
    <header>
      <h1>Title</h1>
    </header>
    <main>
      <p>Content</p>
    </main>
  </body>
</html>
```

### **3. Always Include Alt Text**

```html
<!-- Good -->
<img src="photo.jpg" alt="A beautiful sunset over the mountains" />

<!-- Avoid -->
<img src="photo.jpg" />
```

### **4. Use Descriptive IDs and Classes**

```html
<!-- Good -->
<div id="main-navigation" class="nav-menu">
  <!-- Avoid -->
  <div id="div1" class="class1"></div>
</div>
```

## 🎨 **Your First Project: Personal Portfolio**

Let's build a simple portfolio page using what you've learned:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
  </head>
  <body>
    <header>
      <h1>John Doe</h1>
      <p>Web Developer & Designer</p>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm a passionate web developer who loves creating beautiful and
          functional websites.
        </p>
        <img src="profile-photo.jpg" alt="John Doe - Web Developer" />
      </section>

      <section id="projects">
        <h2>My Projects</h2>
        <article>
          <h3>E-commerce Website</h3>
          <p>
            A fully responsive online store built with modern web technologies.
          </p>
          <a href="#" target="_blank">View Project</a>
        </article>

        <article>
          <h3>Portfolio Website</h3>
          <p>
            A clean and modern portfolio website for creative professionals.
          </p>
          <a href="#" target="_blank">View Project</a>
        </article>
      </section>

      <section id="contact">
        <h2>Contact Me</h2>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 John Doe. All rights reserved.</p>
    </footer>
  </body>
</html>
```

## 📋 **Practice Exercises**

### **Exercise 1: Basic Structure**

Create an HTML document with:

- Proper DOCTYPE and HTML structure
- A title about your favorite hobby
- A heading and paragraph describing the hobby
- An image related to the hobby

### **Exercise 2: Navigation Menu**

Create a navigation menu with:

- At least 4 menu items
- Proper semantic HTML
- Links to different sections

### **Exercise 3: Contact Form**

Build a contact form with:

- Name, email, and message fields
- Proper labels and input types
- Submit button
- Semantic form structure

## 🔍 **Key Takeaways**

1. **HTML is structure** - it organizes content, doesn't style it
2. **Use semantic elements** - they're more meaningful and accessible
3. **Always include alt text** - for images and accessibility
4. **Proper indentation** - makes your code readable
5. **Validate your HTML** - use tools to check for errors

## 🚀 **Next Steps**

In the next lesson, you'll learn **CSS Basics** to style your HTML and make it look beautiful!

## 📚 **Additional Resources**

- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTML Validator](https://validator.w3.org/)
- [Semantic HTML Guide](https://www.w3schools.com/html/html5_semantic_elements.asp)

---

**Practice makes perfect! Build the portfolio project and experiment with different HTML elements. See you in the next lesson! 🎉**
