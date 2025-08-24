# Week 1 Project: Personal Portfolio Website

## 🎯 **Project Overview**

Congratulations! You've learned the fundamentals of HTML and CSS. Now it's time to put your knowledge into practice by building a complete personal portfolio website.

## 🚀 **Project Requirements**

### **Must Have Features:**

1. **Professional Header** with your name, title, and navigation
2. **About Me Section** with your photo and bio
3. **Projects Section** showcasing at least 3 projects
4. **Skills Section** listing your technical skills
5. **Contact Form** with name, email, and message fields
6. **Responsive Design** that works on mobile and desktop
7. **Professional Styling** with consistent colors and typography

### **Bonus Features:**

- Hover effects on buttons and links
- Smooth scrolling navigation
- Social media links
- Downloadable resume
- Dark/light mode toggle

## 📁 **Project Structure**

Create this folder structure for your project:

```
portfolio-website/
├── index.html
├── styles.css
├── images/
│   ├── profile-photo.jpg
│   ├── project1-screenshot.jpg
│   ├── project2-screenshot.jpg
│   └── project3-screenshot.jpg
└── README.md
```

## 🎨 **Design Guidelines**

### **Color Palette:**

- **Primary Color**: Choose a professional color (blue, green, or purple)
- **Secondary Color**: A complementary color for accents
- **Background**: Light neutral color (#f8f9fa or #ffffff)
- **Text**: Dark color for readability (#333333 or #2c3e50)

### **Typography:**

- **Headings**: Modern sans-serif font (Arial, Helvetica, or Google Fonts)
- **Body Text**: Readable font with good line-height (1.6-1.8)
- **Font Sizes**: Use relative units (rem/em) for scalability

### **Layout:**

- **Maximum Width**: 1200px for desktop
- **Padding**: Consistent spacing (1rem, 2rem, 3rem)
- **Margins**: Use auto margins for centering
- **Border Radius**: Subtle rounded corners (5px-10px)

## 📝 **HTML Structure**

Here's the basic HTML structure to get you started:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Name - Portfolio</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Header Section -->
    <header class="header">
      <div class="container">
        <h1 class="name">Your Name</h1>
        <p class="title">Web Developer & Designer</p>
        <nav class="navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- About Section -->
      <section id="about" class="section">
        <div class="container">
          <h2>About Me</h2>
          <div class="about-content">
            <div class="about-text">
              <p>
                Hello! I'm [Your Name], a passionate web developer who loves
                creating beautiful and functional websites. I specialize in
                HTML, CSS, and JavaScript, and I'm always eager to learn new
                technologies.
              </p>
              <p>
                When I'm not coding, you can find me [your hobbies/interests]. I
                believe in writing clean, accessible code and creating user
                experiences that make a difference.
              </p>
            </div>
            <div class="about-image">
              <img
                src="images/profile-photo.jpg"
                alt="Your Name - Web Developer"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="section">
        <div class="container">
          <h2>My Projects</h2>
          <div class="projects-grid">
            <article class="project-card">
              <img src="images/project1-screenshot.jpg" alt="Project 1" />
              <div class="project-content">
                <h3>Project Name 1</h3>
                <p>
                  Description of your first project. What technologies did you
                  use? What problems did you solve?
                </p>
                <div class="project-links">
                  <a href="#" class="btn btn-primary">Live Demo</a>
                  <a href="#" class="btn btn-secondary">View Code</a>
                </div>
              </div>
            </article>

            <article class="project-card">
              <img src="images/project2-screenshot.jpg" alt="Project 2" />
              <div class="project-content">
                <h3>Project Name 2</h3>
                <p>
                  Description of your second project. What technologies did you
                  use? What problems did you solve?
                </p>
                <div class="project-links">
                  <a href="#" class="btn btn-primary">Live Demo</a>
                  <a href="#" class="btn btn-secondary">View Code</a>
                </div>
              </div>
            </article>

            <article class="project-card">
              <img src="images/project3-screenshot.jpg" alt="Project 3" />
              <div class="project-content">
                <h3>Project Name 3</h3>
                <p>
                  Description of your third project. What technologies did you
                  use? What problems did you solve?
                </p>
                <div class="project-links">
                  <a href="#" class="btn btn-primary">Live Demo</a>
                  <a href="#" class="btn btn-secondary">View Code</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="section">
        <div class="container">
          <h2>Skills & Technologies</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript (Basic)</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>Tools</h3>
              <ul>
                <li>VS Code</li>
                <li>Git & GitHub</li>
                <li>Chrome DevTools</li>
                <li>Figma (Basic)</li>
              </ul>
            </div>
            <div class="skill-category">
              <h3>Soft Skills</h3>
              <ul>
                <li>Problem Solving</li>
                <li>Attention to Detail</li>
                <li>Time Management</li>
                <li>Communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section">
        <div class="container">
          <h2>Get In Touch</h2>
          <div class="contact-content">
            <div class="contact-info">
              <h3>Let's work together!</h3>
              <p>
                I'm always interested in new opportunities and exciting
                projects. Feel free to reach out if you'd like to collaborate or
                just want to say hello.
              </p>
              <div class="contact-details">
                <p><strong>Email:</strong> your.email@example.com</p>
                <p><strong>Location:</strong> Your City, Country</p>
              </div>
            </div>
            <form class="contact-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Your Name. All rights reserved.</p>
        <div class="social-links">
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">LinkedIn</a>
          <a href="#" target="_blank">Twitter</a>
        </div>
      </div>
    </footer>
  </body>
</html>
```

## 🎨 **CSS Styling**

Create a comprehensive CSS file with these sections:

```css
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Typography */
h1,
h2,
h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

h3 {
  font-size: 1.5rem;
  color: #3498db;
}

p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* Header Styles */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 0;
}

.name {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.navigation ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.navigation a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Section Styles */
.section {
  padding: 5rem 0;
}

.section:nth-child(even) {
  background-color: white;
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.skill-category ul {
  list-style: none;
}

.skill-category li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.skill-category li:last-child {
  border-bottom: none;
}

/* Contact Section */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

/* Button Styles */
.btn {
  display: inline-block;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-secondary:hover {
  background: #3498db;
  color: white;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #3498db;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .name {
    font-size: 2.5rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .navigation ul {
    flex-direction: column;
    gap: 1rem;
  }

  .footer .container {
    flex-direction: column;
    gap: 1rem;
  }
}
```

## 📋 **Project Checklist**

Before submitting, make sure you have:

- [ ] **HTML Structure**: All required sections with proper semantic elements
- [ ] **CSS Styling**: Professional design with consistent colors and spacing
- [ ] **Responsive Design**: Works on mobile and desktop devices
- [ ] **Navigation**: Smooth scrolling between sections
- [ ] **Images**: Profile photo and project screenshots
- [ ] **Content**: Personalized information about yourself
- [ ] **Form**: Working contact form (basic HTML form)
- [ ] **Code Quality**: Clean, well-commented code
- [ ] **Testing**: Website works in different browsers

## 🎯 **Submission Guidelines**

1. **Create a GitHub repository** for your portfolio
2. **Upload all files** including images and CSS
3. **Add a README.md** explaining your project
4. **Deploy to GitHub Pages** or similar hosting service
5. **Share the live URL** with your instructor

## 🚀 **Next Steps After Week 1**

Once you complete this project, you'll be ready for:

- **Week 2**: CSS Layout & Responsive Design (Flexbox & Grid)
- **Week 3**: JavaScript Fundamentals
- **Week 4**: DOM Manipulation & Interactive Features

## 💡 **Tips for Success**

1. **Start Simple**: Begin with basic structure, then add styling
2. **Test Often**: Check your website in different screen sizes
3. **Use Resources**: Reference MDN Web Docs for HTML/CSS help
4. **Be Creative**: Add your personal touch to make it unique
5. **Ask Questions**: Don't hesitate to seek help when stuck

---

**Good luck with your portfolio project! This is your chance to showcase what you've learned and create something you can be proud of. 🎉**
