import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { CheckCircle, Circle } from "lucide-react";
import { LocalStorageService } from "../lib/local-storage-service";
import { LessonNavigation } from "./lesson-navigation";
import { FileItem } from "../lib/markdown-service";

interface MarkdownViewerProps {
  content: string;
  className?: string;
  filePath?: string;
  files?: FileItem[];
  onNavigate?: (path: string) => void;
}

export function MarkdownViewer({
  content,
  className = "",
  filePath,
  files,
  onNavigate,
}: MarkdownViewerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCompletionStatus = useCallback(() => {
    if (!filePath) return;
    try {
      // Initialize lessons if they don't exist
      LocalStorageService.initializeLessons();

      const isCompleted = LocalStorageService.isLessonCompleted(filePath);

      setIsCompleted(isCompleted);
    } catch (error) {
      console.error("Error loading completion status:", error);
    }
  }, [filePath]);

  useEffect(() => {
    if (filePath) {
      loadCompletionStatus();
    }
  }, [filePath, loadCompletionStatus]);

  const toggleCompletion = () => {
    if (!filePath) return;
    try {
      setLoading(true);

      if (isCompleted) {
        LocalStorageService.markLessonIncomplete(filePath);
        setIsCompleted(false);
      } else {
        LocalStorageService.markLessonCompleted(filePath);
        setIsCompleted(true);
      }

      // Trigger a page refresh to update the progress tracker
      window.dispatchEvent(new CustomEvent("lessonProgressUpdated"));
    } catch (error) {
      console.error("Error updating completion status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
    >
      {/* Completion Toggle Button */}
      {filePath && (
        <div className="mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                Lesson Progress
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Mark this lesson as completed when you&apos;re done
              </p>
            </div>
            <button
              onClick={toggleCompletion}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-md font-medium transition-colors min-h-[44px] touch-manipulation ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-sm">Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-sm">Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 lg:mb-4 mt-6 lg:mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 lg:mb-3 mt-4 lg:mt-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-3 lg:mb-4 leading-relaxed">
              {children}
            </p>
          ),
          code: ({ children, className }) => (
            <code
              className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs lg:text-sm font-mono ${className}`}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 lg:p-4 rounded-lg overflow-x-auto mb-3 lg:mb-4 text-xs lg:text-sm">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 lg:mb-4 space-y-1 lg:space-y-2 text-sm lg:text-base text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 lg:mb-4 space-y-1 lg:space-y-2 text-sm lg:text-base text-gray-700 dark:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm lg:text-base text-gray-700 dark:text-gray-300">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-3 lg:pl-4 italic text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3 lg:mb-4">
              <table className="min-w-full border border-gray-200 dark:border-gray-700 text-xs lg:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 dark:border-gray-700 px-2 lg:px-4 py-2 bg-gray-50 dark:bg-gray-800 text-left font-semibold text-xs lg:text-sm text-gray-700 dark:text-gray-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 dark:border-gray-700 px-2 lg:px-4 py-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Lesson Navigation */}
      {filePath && files && onNavigate && (
        <LessonNavigation
          currentFilePath={filePath}
          files={files}
          onNavigate={onNavigate}
        />
      )}

      {/* Completion Toggle Button - Bottom */}
      {filePath && (
        <div className="mt-8 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                Lesson Progress
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Mark this lesson as completed when you&apos;re done
              </p>
            </div>
            <button
              onClick={toggleCompletion}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-md font-medium transition-colors min-h-[44px] touch-manipulation ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-sm">Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-sm">Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
