import React from "react";
import { Button } from "./ui/button";
import { Sun, Moon, Github, Menu } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onMobileNavToggle: () => void;
  isMobileNavOpen: boolean;
}

export function Header({
  isDarkMode,
  onToggleTheme,
  onMobileNavToggle,
  isMobileNavOpen,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileNavToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FS</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Full-Stack Web Development
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              Frontend • Backend • Database
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Web Dev
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
