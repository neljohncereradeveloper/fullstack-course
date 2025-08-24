"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Header } from "../components/header";
import { FileBrowser } from "../components/file-browser";
import { MarkdownViewer } from "../components/markdown-viewer";
import { CourseNavigation } from "../components/course-navigation";
import { WelcomePage } from "../components/welcome-page";
import { MobileNavigation } from "../components/mobile-navigation";
import {
  getFileStructure,
  getMarkdownContent,
  getFileName,
  FileItem,
} from "../lib/markdown-service";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // Load file structure
    loadFileStructure();
  }, []);

  useEffect(() => {
    // Apply dark mode to body
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const loadFileStructure = async () => {
    try {
      setIsLoadingFiles(true);
      const fileStructure = await getFileStructure();
      setFiles(fileStructure);

      // Set initial file to README if available
      if (!selectedFile && fileStructure.length > 0) {
        const readmeFile = fileStructure.find(
          (item) => item.name === "README" && item.type === "file"
        );
        if (readmeFile) {
          handleFileSelect(readmeFile.path);
        }
      }
    } catch (error) {
      console.error("Error loading file structure:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "frontend-course") {
      // Keep current behavior for frontend course
      loadFileStructure();
    } else {
      // For backend and database, show coming soon content
      setSelectedFile(null);
      setMarkdownContent(getComingSoonContent(sectionId));
    }
  };

  const getComingSoonContent = (sectionId: string) => {
    const sectionInfo = {
      "backend-course": {
        title: "Backend Development Course",
        description: "Node.js, Express, APIs, and Server Architecture",
        topics: [
          "Node.js Fundamentals",
          "Express.js Framework",
          "RESTful API Design",
          "Authentication & Authorization",
          "Database Integration",
          "Error Handling & Testing",
          "Performance & Security",
          "Deployment & DevOps",
        ],
      },
      "database-course": {
        title: "Database Design Course",
        description: "SQL, NoSQL, and Database Optimization",
        topics: [
          "Database Fundamentals",
          "SQL Mastery",
          "Database Design & Modeling",
          "NoSQL Databases",
          "Performance Optimization",
          "Backup & Recovery",
          "Security Best Practices",
          "Scaling Strategies",
        ],
      },
    };

    const info = sectionInfo[sectionId as keyof typeof sectionInfo];

    return `# ${info.title}

## 🚧 Coming Soon!

This course is currently under development and will be available soon.

### Course Overview

${info.description}

### What You'll Learn

${info.topics.map((topic) => `- ${topic}`).join("\n")}

### Course Structure

This course will include:
- **Interactive Lessons**: Step-by-step tutorials with practical examples
- **Hands-on Projects**: Build real-world applications
- **Code Examples**: Complete, working code samples
- **Best Practices**: Industry-standard approaches and patterns

### Get Notified

We're working hard to bring you high-quality content. This course will be available soon!

---

**Currently Available:** Frontend Development Course  
**In Development:** Backend Development, Database Design`;
  };

  const handleFileSelect = async (path: string) => {
    setSelectedFile(path);
    setIsLoading(true);

    try {
      const content = await getMarkdownContent(path);
      setMarkdownContent(content);
    } catch (error) {
      console.error("Error loading file:", error);
      setMarkdownContent(
        `# Error Loading File\n\nFailed to load: ${path}\n\n**Error:** ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGetStarted = () => {
    setActiveSection("frontend-course");
    loadFileStructure();
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const handleMobileNavigate = (sectionId: string) => {
    if (sectionId === "welcome") {
      setActiveSection(null);
      setSelectedFile(null);
      setMarkdownContent("");
    } else {
      handleSectionSelect(sectionId);
    }
  };

  // Show welcome page if no section is selected
  if (!activeSection) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onMobileNavToggle={toggleMobileNav}
          isMobileNavOpen={isMobileNavOpen}
        />
        <WelcomePage onGetStarted={handleGetStarted} />

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={isMobileNavOpen}
          onClose={closeMobileNav}
          onNavigate={handleMobileNavigate}
          activeSection={activeSection}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onMobileNavToggle={toggleMobileNav}
        isMobileNavOpen={isMobileNavOpen}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        onNavigate={handleMobileNavigate}
        activeSection={activeSection}
      />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <CourseNavigation
            onSectionSelect={handleSectionSelect}
            activeSectionId={activeSection}
          />
        </div>

        {activeSection === "frontend-course" && (
          <>
            {/* Desktop File Browser */}
            <div className="hidden lg:block">
              <FileBrowser
                files={files}
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                isLoading={isLoadingFiles}
              />
            </div>

            {/* Mobile File Browser */}
            <div className="lg:hidden">
              <FileBrowser
                files={files}
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                isLoading={isLoadingFiles}
                isMobile={true}
              />
            </div>
          </>
        )}

        <main className="flex-1 overflow-auto">
          {(selectedFile || markdownContent) && (
            <div className="p-4 lg:p-6">
              {selectedFile && (
                <div className="mb-4 lg:mb-6">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {getFileName(selectedFile)}
                  </h1>
                  <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 break-all">
                    {selectedFile}
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8 lg:py-12">
                    <div className="animate-spin rounded-full h-6 w-6 lg:h-8 lg:w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <MarkdownViewer
                    content={markdownContent}
                    filePath={selectedFile || undefined}
                  />
                )}
              </div>
            </div>
          )}

          {!selectedFile &&
            !markdownContent &&
            activeSection === "frontend-course" && (
              <div className="flex items-center justify-center h-full p-4">
                <div className="text-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Frontend Development Course
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                    Select a lesson from the sidebar to get started
                  </p>
                </div>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}
