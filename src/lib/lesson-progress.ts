import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface LessonProgress {
  id: string;
  path: string;
  name: string;
  week: string;
  order: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface WeekProgress {
  week: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

export class LessonProgressService {
  // Initialize lessons in the database
  static async initializeLessons(): Promise<void> {
    try {
      const lessons = [
        // Week 1: HTML & CSS Basics
        {
          path: "README.md",
          name: "Course Overview",
          week: "week-1",
          order: 0,
        },
        {
          path: "week-1-html-css-basics/01-html-fundamentals.md",
          name: "HTML Fundamentals",
          week: "week-1",
          order: 1,
        },
        {
          path: "week-1-html-css-basics/02-css-basics.md",
          name: "CSS Basics",
          week: "week-1",
          order: 2,
        },
        {
          path: "week-1-html-css-basics/03-week-1-project.md",
          name: "Week 1 Project",
          week: "week-1",
          order: 3,
        },

        // Week 2: CSS Layout & Responsive
        {
          path: "week-2-css-layout-responsive/01-flexbox-layout.md",
          name: "Flexbox Layout",
          week: "week-2",
          order: 1,
        },
        {
          path: "week-2-css-layout-responsive/02-css-grid-layout.md",
          name: "CSS Grid Layout",
          week: "week-2",
          order: 2,
        },
        {
          path: "week-2-css-layout-responsive/03-responsive-design-media-queries.md",
          name: "Responsive Design",
          week: "week-2",
          order: 3,
        },
        {
          path: "week-2-css-layout-responsive/04-week-2-project.md",
          name: "Week 2 Project",
          week: "week-2",
          order: 4,
        },

        // Week 3: React Basics
        {
          path: "week-3-react-basics/01-react-introduction.md",
          name: "React Introduction",
          week: "week-3",
          order: 1,
        },
        {
          path: "week-3-react-basics/02-react-components.md",
          name: "React Components",
          week: "week-3",
          order: 2,
        },
        {
          path: "week-3-react-basics/03-react-state.md",
          name: "React State",
          week: "week-3",
          order: 3,
        },
        {
          path: "week-3-react-basics/04-react-todo-app.md",
          name: "React Todo App",
          week: "week-3",
          order: 4,
        },

        // Week 4: React Advanced
        {
          path: "week-4-react-advanced/01-react-hooks-basics.md",
          name: "React Hooks Basics",
          week: "week-4",
          order: 1,
        },
        {
          path: "week-4-react-advanced/02-react-advanced-hooks.md",
          name: "Advanced React Hooks",
          week: "week-4",
          order: 2,
        },
        {
          path: "week-4-react-advanced/03-react-patterns.md",
          name: "React Patterns",
          week: "week-4",
          order: 3,
        },
        {
          path: "week-4-react-advanced/04-react-portfolio.md",
          name: "React Portfolio",
          week: "week-4",
          order: 4,
        },
      ];

      console.log("Initializing lessons in database...");

      for (const lesson of lessons) {
        try {
          await prisma.lesson.upsert({
            where: { path: lesson.path },
            update: {},
            create: {
              path: lesson.path,
              name: lesson.name,
              week: lesson.week,
              order: lesson.order,
            },
          });
          console.log(`Created/updated lesson: ${lesson.name}`);
        } catch (lessonError) {
          console.error(`Error with lesson ${lesson.path}:`, lessonError);
        }
      }

      console.log("Lesson initialization completed!");
    } catch (error) {
      console.error("Error initializing lessons:", error);
    }
  }

  // Get all lessons with completion status
  static async getAllLessons(): Promise<LessonProgress[]> {
    try {
      const lessons = await prisma.lesson.findMany({
        orderBy: [{ week: "asc" }, { order: "asc" }],
      });

      // If no lessons exist, initialize them
      if (lessons.length === 0) {
        console.log("No lessons found, initializing database...");
        await this.initializeLessons();
        return await prisma.lesson.findMany({
          orderBy: [{ week: "asc" }, { order: "asc" }],
        });
      }

      return lessons;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }
  }

  // Get lessons by week
  static async getLessonsByWeek(week: string): Promise<LessonProgress[]> {
    try {
      const lessons = await prisma.lesson.findMany({
        where: { week },
        orderBy: { order: "asc" },
      });
      return lessons;
    } catch (error) {
      console.error(`Error fetching lessons for week ${week}:`, error);
      return [];
    }
  }

  // Helper methods to extract lesson information from path
  private static getLessonNameFromPath(path: string): string {
    const fileName = path.split("/").pop()?.replace(".md", "") || "";
    return fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private static getWeekFromPath(path: string): string {
    if (path.includes("week-1")) return "week-1";
    if (path.includes("week-2")) return "week-2";
    if (path.includes("week-3")) return "week-3";
    if (path.includes("week-4")) return "week-4";
    return "week-1"; // Default
  }

  private static getOrderFromPath(path: string): number {
    const fileName = path.split("/").pop() || "";
    const match = fileName.match(/^(\d+)-/);
    return match ? parseInt(match[1]) : 0;
  }

  // Mark lesson as completed
  static async markLessonCompleted(path: string): Promise<void> {
    try {
      // First check if the lesson exists, if not create it
      const existingLesson = await prisma.lesson.findUnique({
        where: { path },
      });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { path },
          data: {
            isCompleted: true,
            completedAt: new Date(),
          },
        });
      } else {
        // Create the lesson if it doesn't exist
        await prisma.lesson.create({
          data: {
            path,
            name: this.getLessonNameFromPath(path),
            week: this.getWeekFromPath(path),
            order: this.getOrderFromPath(path),
            isCompleted: true,
            completedAt: new Date(),
          },
        });
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error);
    }
  }

  // Mark lesson as incomplete
  static async markLessonIncomplete(path: string): Promise<void> {
    try {
      // First check if the lesson exists, if not create it
      const existingLesson = await prisma.lesson.findUnique({
        where: { path },
      });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { path },
          data: {
            isCompleted: false,
            completedAt: null,
          },
        });
      } else {
        // Create the lesson if it doesn't exist
        await prisma.lesson.create({
          data: {
            path,
            name: this.getLessonNameFromPath(path),
            week: this.getWeekFromPath(path),
            order: this.getOrderFromPath(path),
            isCompleted: false,
            completedAt: null,
          },
        });
      }
    } catch (error) {
      console.error("Error marking lesson as incomplete:", error);
    }
  }

  // Get progress for a specific week
  static async getWeekProgress(week: string): Promise<WeekProgress> {
    try {
      const lessons = await this.getLessonsByWeek(week);
      const totalLessons = lessons.length;
      const completedLessons = lessons.filter(
        (lesson) => lesson.isCompleted
      ).length;
      const progress =
        totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      return {
        week,
        totalLessons,
        completedLessons,
        progress: Math.round(progress * 100) / 100, // Round to 2 decimal places
      };
    } catch (error) {
      console.error(`Error getting progress for week ${week}:`, error);
      return {
        week,
        totalLessons: 0,
        completedLessons: 0,
        progress: 0,
      };
    }
  }

  // Get overall course progress
  static async getOverallProgress(): Promise<WeekProgress[]> {
    try {
      const weeks = ["week-1", "week-2", "week-3", "week-4"];
      const progressPromises = weeks.map((week) => this.getWeekProgress(week));
      const progress = await Promise.all(progressPromises);
      return progress;
    } catch (error) {
      console.error("Error getting overall progress:", error);
      return [];
    }
  }

  // Check if a specific lesson is completed
  static async isLessonCompleted(path: string): Promise<boolean> {
    try {
      const lesson = await prisma.lesson.findUnique({
        where: { path },
        select: { isCompleted: true },
      });
      return lesson?.isCompleted || false;
    } catch (error) {
      console.error("Error checking lesson completion:", error);
      return false;
    }
  }

  // Get or create lesson
  static async getOrCreateLesson(path: string): Promise<LessonProgress> {
    try {
      let lesson = await prisma.lesson.findUnique({
        where: { path },
      });

      if (!lesson) {
        // Create the lesson if it doesn't exist
        lesson = await prisma.lesson.create({
          data: {
            path,
            name: this.getLessonNameFromPath(path),
            week: this.getWeekFromPath(path),
            order: this.getOrderFromPath(path),
            isCompleted: false,
          },
        });
      }

      return lesson;
    } catch (error) {
      console.error("Error getting or creating lesson:", error);
      throw error;
    }
  }
}
