import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { FileItem } from "../lib/markdown-service";

interface LessonNavigationProps {
  currentFilePath: string;
  files: FileItem[];
  onNavigate: (path: string) => void;
}

export function LessonNavigation({
  currentFilePath,
  files,
  onNavigate,
}: LessonNavigationProps) {
  // Flatten the file structure to get all lessons in order
  const flattenFiles = (items: FileItem[]): FileItem[] => {
    const result: FileItem[] = [];

    for (const item of items) {
      if (item.type === "file") {
        result.push(item);
      } else if (item.type === "folder" && item.children) {
        result.push(...flattenFiles(item.children));
      }
    }

    return result;
  };

  const allLessons = flattenFiles(files);
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.path === currentFilePath
  );

  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (currentIndex === -1) {
    return null; // Don't show navigation if current file is not found
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      {/* Progress Indicator */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lesson {currentIndex + 1} of {allLessons.length}
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        {/* Previous Lesson Button */}
        {previousLesson ? (
          <Button
            variant="outline"
            onClick={() => onNavigate(previousLesson.path)}
            className="flex-1 max-w-xs group hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Previous
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {previousLesson.name}
                </div>
              </div>
            </div>
          </Button>
        ) : (
          <div className="flex-1 max-w-xs"></div>
        )}

        {/* Next Lesson Button */}
        {nextLesson ? (
          <Button
            variant="outline"
            onClick={() => onNavigate(nextLesson.path)}
            className="flex-1 max-w-xs group hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="text-right flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  Next
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {nextLesson.name}
                </div>
              </div>
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </div>
          </Button>
        ) : (
          <div className="flex-1 max-w-xs"></div>
        )}
      </div>
    </div>
  );
}
