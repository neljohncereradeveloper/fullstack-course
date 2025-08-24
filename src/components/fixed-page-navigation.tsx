import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface FixedPageNavigationProps {
  show?: boolean;
}

export function FixedPageNavigation({
  show = false,
}: FixedPageNavigationProps) {
  const [showUpButton, setShowUpButton] = useState(false);

  // Don't render if show is false
  if (!show) {
    return null;
  }

  const scrollToTop = () => {
    console.log("Scrolling to top");

    // Try to scroll the main content area first
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Fallback to window scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToBottom = () => {
    console.log("Scrolling to bottom");

    // Try to scroll the main content area first
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({
        top: mainContent.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Fallback to window scroll
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }

    // Show up button after scrolling to bottom
    setTimeout(() => {
      setShowUpButton(true);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-2 sm:gap-3">
      <Button
        onClick={() => {
          scrollToTop();
          setShowUpButton(false);
        }}
        size="icon"
        className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-blue-600 dark:border-blue-500 shadow-lg hover:shadow-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 touch-manipulation"
        title="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
      </Button>
      <Button
        onClick={scrollToBottom}
        size="icon"
        className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-blue-600 dark:border-blue-500 shadow-lg hover:shadow-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 touch-manipulation"
        title="Scroll to bottom of lesson"
      >
        <ChevronDown className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
      </Button>

      {/* Scroll to Bottom Button - Always visible */}
    </div>
  );
}
