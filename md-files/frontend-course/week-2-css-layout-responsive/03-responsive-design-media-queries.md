# Responsive Design & Media Queries

## 🎯 **Learning Objectives**

By the end of this lesson, you will be able to:

- Understand responsive design principles and mobile-first approach
- Write effective media queries for different screen sizes
- Create flexible layouts that adapt to all devices
- Implement responsive typography and images
- Build websites that work perfectly on any device

## 📚 **What is Responsive Design?**

Responsive design is an approach that makes websites **automatically adapt** to different screen sizes, devices, and orientations. It ensures your site looks great and functions perfectly whether viewed on:

- **Desktop computers** (1200px+)
- **Laptops** (768px - 1199px)
- **Tablets** (481px - 767px)
- **Mobile phones** (320px - 480px)

### **Why Responsive Design Matters**

- **User Experience** - 60% of web traffic comes from mobile devices
- **SEO Benefits** - Google prioritizes mobile-friendly sites
- **Maintenance** - One codebase for all devices
- **Future-Proof** - Works with new devices and screen sizes

## 🏗️ **Responsive Design Principles**

### **1. Mobile-First Approach**

Start with mobile design and progressively enhance for larger screens:

```css
/* Base styles (mobile first) */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem;
  }
}
```

### **2. Fluid Grids**

Use relative units instead of fixed pixels:

```css
/* Instead of fixed widths */
.fixed-width {
  width: 300px; /* Bad - doesn't adapt */
}

/* Use relative units */
.fluid-width {
  width: 100%; /* Full container width */
  max-width: 300px; /* Maximum size */
  width: 90vw; /* 90% of viewport width */
  width: calc(100% - 2rem); /* Full width minus margins */
}
```

### **3. Flexible Images**

Images that scale with their containers:

```css
img {
  max-width: 100%; /* Never exceed container width */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Remove inline spacing */
}

/* Responsive images with different sizes */
.responsive-img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Crop to fit container */
}
```

## 🎛️ **Media Queries Fundamentals**

### **Basic Media Query Syntax**

```css
@media media-type and (media-feature: value) {
  /* CSS rules here */
}

/* Examples */
@media screen and (max-width: 768px) {
  /* Styles for screens smaller than 768px */
}

@media print {
  /* Styles for printing */
}

@media (orientation: landscape) {
  /* Styles for landscape orientation */
}
```

### **Common Media Features**

```css
/* Screen width */
@media (max-width: 768px) {
} /* 768px and below */
@media (min-width: 768px) {
} /* 768px and above */
@media (width: 768px) {
} /* Exactly 768px */

/* Screen height */
@media (max-height: 600px) {
} /* 600px and below */
@media (min-height: 600px) {
} /* 600px and above */

/* Orientation */
@media (orientation: portrait) {
} /* Taller than wide */
@media (orientation: landscape) {
} /* Wider than tall */

/* Device pixel ratio */
@media (-webkit-min-device-pixel-ratio: 2) {
} /* High DPI displays */
@media (min-resolution: 192dpi) {
} /* High resolution */

/* Hover capability */
@media (hover: hover) {
} /* Devices with hover */
@media (hover: none) {
} /* Touch devices */
```

### **Logical Operators**

```css
/* AND operator (default) */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* Styles for tablets only */
}

/* OR operator */
@media (max-width: 768px), (min-width: 1200px) {
  /* Styles for mobile OR large desktop */
}

/* NOT operator */
@media not (max-width: 768px) {
  /* Styles for screens larger than 768px */
}
```

## 📱 **Breakpoint Strategy**

### **Standard Breakpoints**

```css
/* Extra small devices (phones) */
@media (max-width: 575.98px) {
}

/* Small devices (landscape phones) */
@media (min-width: 576px) and (max-width: 767.98px) {
}

/* Medium devices (tablets) */
@media (min-width: 768px) and (max-width: 991.98px) {
}

/* Large devices (desktops) */
@media (min-width: 992px) and (max-width: 1199.98px) {
}

/* Extra large devices (large desktops) */
@media (min-width: 1200px) {
}
```

### **Content-Based Breakpoints**

Instead of device-based breakpoints, use content-based ones:

```css
/* When the layout breaks */
@media (max-width: 768px) {
  /* Navigation becomes mobile menu */
}

@media (max-width: 480px) {
  /* Cards stack vertically */
}

@media (max-width: 320px) {
  /* Reduce padding and margins */
}
```

## 🎨 **Responsive Layout Techniques**

### **1. Responsive Grid with Flexbox**

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, start at 300px */
  max-width: 400px;
}

/* Mobile: single column */
@media (max-width: 480px) {
  .card {
    flex: 1 1 100%;
    max-width: none;
  }
}
```

### **2. Responsive Grid with CSS Grid**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* Mobile: single column */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
```

### **3. Responsive Navigation**

```css
/* Desktop navigation */
.nav-desktop {
  display: flex;
  gap: 2rem;
}

.nav-mobile {
  display: none;
}

/* Mobile navigation */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }

  .nav-mobile {
    display: block;
  }
}
```

### **4. Responsive Typography**

```css
/* Base font size (mobile) */
html {
  font-size: 16px;
}

body {
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: 1.75rem;
}

h2 {
  font-size: 1.5rem;
}

/* Tablet typography */
@media (min-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.875rem;
  }
}

/* Desktop typography */
@media (min-width: 1024px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.25rem;
  }
}
```

## 🖼️ **Responsive Images & Media**

### **1. Picture Element**

```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg" />
  <source media="(min-width: 768px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Responsive image" />
</picture>
```

### **2. Responsive Background Images**

```css
.hero-section {
  background-image: url("mobile-hero.jpg");
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero-section {
    background-image: url("tablet-hero.jpg");
  }
}

@media (min-width: 1024px) {
  .hero-section {
    background-image: url("desktop-hero.jpg");
  }
}
```

### **3. Responsive Videos**

```css
.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## 📱 **Mobile-Specific Considerations**

### **1. Touch-Friendly Design**

```css
/* Minimum touch target size */
.button,
.nav-link {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Prevent zoom on input focus (iOS) */
input,
select,
textarea {
  font-size: 16px;
}
```

### **2. Mobile Navigation**

```css
/* Hamburger menu */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.active {
    display: block;
  }
}
```

### **3. Mobile Forms**

```css
/* Stack form elements on mobile */
@media (max-width: 480px) {
  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-row label {
    margin-bottom: 0.25rem;
  }

  .form-row input,
  .form-row select,
  .form-row textarea {
    width: 100%;
  }
}
```

## 🎯 **Responsive Design Best Practices**

### **1. Use Relative Units**

```css
/* Good - responsive */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Avoid - fixed sizes */
.container {
  width: 1000px; /* Bad - doesn't adapt */
  padding: 20px; /* Bad - doesn't scale */
}
```

### **2. Test on Real Devices**

```css
/* Always test your media queries */
@media (max-width: 768px) {
  /* Test this on actual mobile devices */
  .mobile-menu {
    display: block;
  }
}
```

### **3. Progressive Enhancement**

```css
/* Start with basic functionality */
.button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
}

/* Add enhancements for larger screens */
@media (min-width: 768px) {
  .button {
    padding: 0.75rem 1.5rem;
    transition: all 0.3s ease;
  }

  .button:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
}
```

## 📋 **Practice Exercises**

### **Exercise 1: Responsive Card Layout**

Create a card layout that:

- Shows 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Uses flexbox or grid

### **Exercise 2: Responsive Navigation**

Build a navigation that:

- Shows horizontal menu on desktop
- Collapses to hamburger menu on mobile
- Has smooth transitions
- Is touch-friendly

### **Exercise 3: Responsive Typography**

Implement typography that:

- Scales appropriately for each screen size
- Maintains readability on all devices
- Uses relative units
- Has proper line heights

## 🔍 **Key Takeaways**

1. **Mobile-first approach** - start small, scale up
2. **Use relative units** - percentages, rem, em, vw/vh
3. **Content-based breakpoints** - design for content, not devices
4. **Test on real devices** - don't just rely on browser dev tools
5. **Progressive enhancement** - build up from basic functionality

## 🚀 **Next Steps**

In the next lesson, you'll work on the **Week 2 Project: Interactive Dashboard** combining all the layout techniques you've learned!

## 📚 **Additional Resources**

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS-Tricks Media Queries](https://css-tricks.com/logic-in-media-queries/)
- [Responsive Design Patterns](https://responsivedesign.is/)

---

**Fantastic! You now understand responsive design principles. Practice creating layouts that adapt to all screen sizes. See you in the next lesson! 📱**
