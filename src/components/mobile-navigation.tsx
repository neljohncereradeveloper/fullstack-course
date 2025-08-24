import React from "react";
import { X, Menu, Home, BookOpen, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  activeSection?: string | null;
}

export function MobileNavigation({
  isOpen,
  onClose,
  onNavigate,
  activeSection,
}: MobileNavigationProps) {
  const navigationItems = [
    {
      id: "welcome",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      action: () => onNavigate("welcome"),
    },
    {
      id: "frontend-course",
      label: "Frontend Course",
      icon: <BookOpen className="w-5 h-5" />,
      action: () => onNavigate("frontend-course"),
    },
    {
      id: "backend-course",
      label: "Backend Course",
      icon: <BookOpen className="w-5 h-5" />,
      action: () => onNavigate("backend-course"),
      disabled: true,
    },
    {
      id: "database-course",
      label: "Database Course",
      icon: <BookOpen className="w-5 h-5" />,
      action: () => onNavigate("database-course"),
      disabled: true,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (!item.disabled) {
                  item.action();
                  onClose();
                }
              }}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                activeSection === item.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              } ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  activeSection === item.id
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </div>
                {item.disabled && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Coming Soon
                  </div>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Web Development Course</p>
            <p className="text-xs mt-1">Learn Full-Stack Development</p>
          </div>
        </div>
      </div>
    </div>
  );
}
