export interface LessonProgress {
  id: string;
  path: string;
  name: string;
  week: string;
  order: number;
  isCompleted: boolean;
  completedAt: Date | null;
}

export interface WeekProgress {
  week: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

export class LocalStorageService {
  private static readonly STORAGE_KEY = 'lessonProgress';
  private static readonly LESSONS_KEY = 'lessons';

  // Initialize lessons in localStorage
  static initializeLessons(): void {
    const existingLessons = this.getLessons();
    if (existingLessons.length === 0) {
      const lessons = [
        // Week 1: HTML & CSS Basics
        {
          id: this.generateId(),
          path: "README.md",
          name: "Course Overview",
          week: "week-1",
          order: 0,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-1-html-css-basics/01-html-fundamentals.md",
          name: "HTML Fundamentals",
          week: "week-1",
          order: 1,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-1-html-css-basics/02-css-basics.md",
          name: "CSS Basics",
          week: "week-1",
          order: 2,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-1-html-css-basics/03-week-1-project.md",
          name: "Week 1 Project",
          week: "week-1",
          order: 3,
          isCompleted: false,
          completedAt: null,
        },

        // Week 2: CSS Layout & Responsive
        {
          id: this.generateId(),
          path: "week-2-css-layout-responsive/01-flexbox-layout.md",
          name: "Flexbox Layout",
          week: "week-2",
          order: 1,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-2-css-layout-responsive/02-css-grid-layout.md",
          name: "CSS Grid Layout",
          week: "week-2",
          order: 2,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-2-css-layout-responsive/03-responsive-design-media-queries.md",
          name: "Responsive Design",
          week: "week-2",
          order: 3,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-2-css-layout-responsive/04-week-2-project.md",
          name: "Week 2 Project",
          week: "week-2",
          order: 4,
          isCompleted: false,
          completedAt: null,
        },

        // Week 3: React Basics
        {
          id: this.generateId(),
          path: "week-3-react-basics/01-react-introduction.md",
          name: "React Introduction",
          week: "week-3",
          order: 1,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-3-react-basics/02-react-components.md",
          name: "React Components",
          week: "week-3",
          order: 2,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-3-react-basics/03-react-state.md",
          name: "React State",
          week: "week-3",
          order: 3,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-3-react-basics/04-react-todo-app.md",
          name: "React Todo App",
          week: "week-3",
          order: 4,
          isCompleted: false,
          completedAt: null,
        },

        // Week 4: React Advanced
        {
          id: this.generateId(),
          path: "week-4-react-advanced/01-react-hooks-basics.md",
          name: "React Hooks Basics",
          week: "week-4",
          order: 1,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-4-react-advanced/02-react-advanced-hooks.md",
          name: "Advanced React Hooks",
          week: "week-4",
          order: 2,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-4-react-advanced/03-react-patterns.md",
          name: "React Patterns",
          week: "week-4",
          order: 3,
          isCompleted: false,
          completedAt: null,
        },
        {
          id: this.generateId(),
          path: "week-4-react-advanced/04-react-portfolio.md",
          name: "React Portfolio",
          week: "week-4",
          order: 4,
          isCompleted: false,
          completedAt: null,
        },
      ];

      this.saveLessons(lessons);
      console.log("Lessons initialized in localStorage");
    }
  }

  // Get all lessons
  static getAllLessons(): LessonProgress[] {
    const lessons = this.getLessons();
    if (lessons.length === 0) {
      this.initializeLessons();
      return this.getLessons();
    }
    return lessons.sort((a, b) => {
      if (a.week !== b.week) {
        return a.week.localeCompare(b.week);
      }
      return a.order - b.order;
    });
  }

  // Get lessons by week
  static getLessonsByWeek(week: string): LessonProgress[] {
    return this.getAllLessons().filter(lesson => lesson.week === week);
  }

  // Check if a specific lesson is completed
  static isLessonCompleted(path: string): boolean {
    const lessons = this.getLessons();
    const lesson = lessons.find(l => l.path === path);
    return lesson?.isCompleted || false;
  }

  // Mark lesson as completed
  static markLessonCompleted(path: string): void {
    const lessons = this.getLessons();
    const lessonIndex = lessons.findIndex(l => l.path === path);
    
    if (lessonIndex !== -1) {
      lessons[lessonIndex].isCompleted = true;
      lessons[lessonIndex].completedAt = new Date();
    } else {
      // Create lesson if it doesn't exist
      const lesson = {
        id: this.generateId(),
        path,
        name: this.getLessonNameFromPath(path),
        week: this.getWeekFromPath(path),
        order: this.getOrderFromPath(path),
        isCompleted: true,
        completedAt: new Date(),
      };
      lessons.push(lesson);
    }
    
    this.saveLessons(lessons);
  }

  // Mark lesson as incomplete
  static markLessonIncomplete(path: string): void {
    const lessons = this.getLessons();
    const lessonIndex = lessons.findIndex(l => l.path === path);
    
    if (lessonIndex !== -1) {
      lessons[lessonIndex].isCompleted = false;
      lessons[lessonIndex].completedAt = null;
      this.saveLessons(lessons);
    }
  }

  // Get progress for a specific week
  static getWeekProgress(week: string): WeekProgress {
    const lessons = this.getLessonsByWeek(week);
    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return {
      week,
      totalLessons,
      completedLessons,
      progress: Math.round(progress * 100) / 100,
    };
  }

  // Get overall course progress
  static getOverallProgress(): WeekProgress[] {
    const weeks = ["week-1", "week-2", "week-3", "week-4"];
    return weeks.map(week => this.getWeekProgress(week));
  }

  // Get or create lesson
  static getOrCreateLesson(path: string): LessonProgress {
    const lessons = this.getLessons();
    let lesson = lessons.find(l => l.path === path);

    if (!lesson) {
      lesson = {
        id: this.generateId(),
        path,
        name: this.getLessonNameFromPath(path),
        week: this.getWeekFromPath(path),
        order: this.getOrderFromPath(path),
        isCompleted: false,
        completedAt: null,
      };
      lessons.push(lesson);
      this.saveLessons(lessons);
    }

    return lesson;
  }

  // Private helper methods
  private static getLessons(): LessonProgress[] {
    try {
      const stored = localStorage.getItem(this.LESSONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  }

  private static saveLessons(lessons: LessonProgress[]): void {
    try {
      localStorage.setItem(this.LESSONS_KEY, JSON.stringify(lessons));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

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
}
