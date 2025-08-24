import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export function FixedPageNavigation() {
  const [showUpButton, setShowUpButton] = useState(false);

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
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <Button
        onClick={() => {
          scrollToTop();
          setShowUpButton(false);
        }}
        size="icon"
        className="w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-blue-600 dark:border-blue-500 shadow-lg hover:shadow-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200"
        title="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </Button>
      <Button
        onClick={scrollToBottom}
        size="icon"
        className="w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-600 border-2 border-blue-600 dark:border-blue-500 shadow-lg hover:shadow-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200"
        title="Scroll to bottom of lesson"
      >
        <ChevronDown className="w-5 h-5 text-white" />
      </Button>

      {/* Scroll to Bottom Button - Always visible */}
    </div>
  );
}
