import React from "react";
import { Button } from "./ui/button";
import {
  FileText,
  FolderOpen,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
} from "lucide-react";
import { LocalStorageService } from "../lib/local-storage-service";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileItem[];
}

interface FileBrowserProps {
  files: FileItem[];
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  isLoading?: boolean;
  isMobile?: boolean;
}

export function FileBrowser({
  files,
  selectedFile,
  onFileSelect,
  isLoading = false,
  isMobile = false,
}: FileBrowserProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set()
  );
  const [lessonProgress, setLessonProgress] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    loadLessonProgress();

    // Listen for lesson progress updates
    const handleProgressUpdate = () => {
      loadLessonProgress();
    };

    window.addEventListener("lessonProgressUpdated", handleProgressUpdate);

    return () => {
      window.removeEventListener("lessonProgressUpdated", handleProgressUpdate);
    };
  }, []);

  const loadLessonProgress = () => {
    try {
      // Initialize lessons if they don't exist
      LocalStorageService.initializeLessons();

      const lessons = LocalStorageService.getAllLessons();
      const progressMap: Record<string, boolean> = {};
      lessons.forEach((lesson) => {
        progressMap[lesson.path] = lesson.isCompleted;
      });
      setLessonProgress(progressMap);
    } catch (error) {
      console.error("Error loading lesson progress:", error);
    }
  };

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileItem = (item: FileItem, level: number = 0) => {
    const isSelected = selectedFile === item.path;
    const isExpanded = expandedFolders.has(item.path);

    if (item.type === "folder") {
      return (
        <div key={item.path} className="w-full">
          <button
            onClick={() => toggleFolder(item.path)}
            className="flex items-center w-full py-2 px-3 text-left font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors touch-target"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            )}
            <FolderOpen className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate font-medium">{item.name}</span>
          </button>

          {item.children && item.children.length > 0 && isExpanded && (
            <div className="ml-4 border-l border-gray-200 dark:border-gray-700 pl-2">
              {item.children.map((child) => renderFileItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    // Files are clickable
    const isCompleted = lessonProgress[item.path] || false;
    return (
      <div key={item.path} className="w-full">
        <Button
          variant={isSelected ? "default" : "ghost"}
          className={`w-full justify-start h-auto py-2 px-3 text-left font-normal touch-target ${
            level > 0 ? `ml-${level * 4}` : ""
          } ${
            isSelected
              ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => onFileSelect(item.path)}
        >
          <div className="flex items-center w-full">
            {isCompleted ? (
              <CheckCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}
            <FileText className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
            <span
              className={`truncate ${
                isCompleted
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : ""
              }`}
            >
              {item.name}
            </span>
          </div>
        </Button>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Frontend Course
          </h2>
        </div>

        <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Loading...
              </span>
            </div>
          ) : (
            files.map((item) => renderFileItem(item))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Frontend Course
        </h2>
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        ) : (
          files.map((item) => renderFileItem(item))
        )}
      </div>
    </div>
  );
}
