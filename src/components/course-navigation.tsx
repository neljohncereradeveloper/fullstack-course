import React from "react";
import { FileText, Code, Database, Server, ChevronRight } from "lucide-react";


interface CourseSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "available" | "coming-soon";
  lessons?: number;
}

interface CourseNavigationProps {
  onSectionSelect: (sectionId: string) => void;
  activeSectionId?: string;
}

const courseSections: CourseSection[] = [
  {
    id: "frontend-course",
    title: "Frontend Development",
    description: "HTML, CSS, and React fundamentals",
    icon: <Code className="w-5 h-5" />,
    status: "available",
    lessons: 12,
  },
  {
    id: "backend-course",
    title: "Backend Development",
    description: "Node.js, Express, and API development",
    icon: <Server className="w-5 h-5" />,
    status: "coming-soon",
    lessons: 10,
  },
  {
    id: "database-course",
    title: "Database Design",
    description: "SQL, NoSQL, and database optimization",
    icon: <Database className="w-5 h-5" />,
    status: "coming-soon",
    lessons: 8,
  },
];

export function CourseNavigation({
  onSectionSelect,
  activeSectionId,
}: CourseNavigationProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-full lg:w-80 p-4 lg:p-6 overflow-y-auto">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Course Overview
        </h2>
        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
          Complete full-stack web development journey
        </p>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {courseSections.map((section) => (
          <div
            key={section.id}
            className={`relative p-3 lg:p-4 rounded-lg border transition-all cursor-pointer ${
              activeSectionId === section.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            } ${
              section.status === "coming-soon"
                ? "opacity-60 cursor-not-allowed"
                : "hover:shadow-md"
            }`}
            onClick={() => {
              if (section.status === "available") {
                onSectionSelect(section.id);
              }
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2 lg:gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    activeSectionId === section.id
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base truncate">
                      {section.title}
                    </h3>
                    {section.status === "coming-soon" && (
                      <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 px-2 py-1 rounded-full flex-shrink-0">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {section.description}
                  </p>
                  {section.lessons && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                      <FileText className="w-3 h-3" />
                      <span>{section.lessons} lessons</span>
                    </div>
                  )}
                </div>
              </div>
              {section.status === "available" && (
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm lg:text-base">
            Course Progress
          </h4>
        </div>
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-3">
          Frontend course is now available. Backend and Database courses are in
          development.
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            style={{ width: "33.33%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          1 of 3 courses available
        </p>
      </div>
    </div>
  );
}
