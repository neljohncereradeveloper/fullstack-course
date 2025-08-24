import React from "react";
import {
  Code,
  Database,
  Server,
  BookOpen,
  Users,
  Award,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Hero Section */}
        <div className="mb-8 lg:mb-12">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
            <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Full-Stack Web Development
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 px-4">
            Master the complete web development stack from frontend to backend
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg"
          >
            Start Learning
          </Button>
        </div>

        {/* Course Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
              <Code className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Frontend Development
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4">
              HTML, CSS, React, and modern JavaScript development
            </p>
            <div className="text-xs lg:text-sm text-green-600 dark:text-green-400 font-medium">
              ✅ Available Now
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all opacity-75">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
              <Server className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Backend Development
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4">
              Node.js, Express, APIs, and server architecture
            </p>
            <div className="text-xs lg:text-sm text-amber-600 dark:text-amber-400 font-medium">
              🚧 Coming Soon
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all opacity-75">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
              <Database className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Database Design
            </h3>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4">
              SQL, NoSQL, and database optimization
            </p>
            <div className="text-xs lg:text-sm text-amber-600 dark:text-amber-400 font-medium">
              🚧 Coming Soon
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">
              Beginner Friendly
            </h4>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              Start from basics and progress to advanced topics
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
              <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">
              Hands-On Projects
            </h4>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              Build real applications while learning
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">
              Self-Paced
            </h4>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              Learn at your own pace with structured content
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
              <Award className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 lg:mb-2 text-sm lg:text-base">
              Industry Ready
            </h4>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              Learn modern practices and technologies
            </p>
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Your Learning Journey
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold mr-3">
                1
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                  Frontend Foundation
                </div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  4 weeks • Available now
                </div>
              </div>
            </div>

            <div className="w-full lg:w-20 h-px lg:h-auto lg:w-px bg-gray-300 dark:bg-gray-600 my-4 lg:my-0 lg:mx-4"></div>

            <div className="flex items-center mb-4 lg:mb-0 opacity-60">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold mr-3">
                2
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                  Backend Development
                </div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  3 weeks • Coming soon
                </div>
              </div>
            </div>

            <div className="w-full lg:w-20 h-px lg:h-auto lg:w-px bg-gray-300 dark:bg-gray-600 my-4 lg:my-0 lg:mx-4"></div>

            <div className="flex items-center opacity-60">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold mr-3">
                3
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                  Database Design
                </div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  2 weeks • Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
