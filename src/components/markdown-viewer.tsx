import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({
  content,
  className = "",
}: MarkdownViewerProps) {
  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
    >
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
          code: ({ children, className }) => {
            const language = className?.replace("language-", "") || "";
            return (
              <code
                className={`bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs lg:text-sm font-mono ${className}`}
              >
                {children}
              </code>
            );
          },
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
    </div>
  );
}
