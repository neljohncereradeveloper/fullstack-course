import { readdir, stat } from "fs/promises";
import { join } from "path";
import { FileItem } from "./markdown-service";

export async function scanDirectory(
  dirPath: string,
  basePath: string = ""
): Promise<FileItem[]> {
  try {
    const items = await readdir(dirPath);
    const fileItems: FileItem[] = [];

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        // Skip node_modules and other system directories
        if (item === "node_modules" || item === ".git" || item === "web") {
          continue;
        }

        const children = await scanDirectory(fullPath, join(basePath, item));
        if (children.length > 0) {
          fileItems.push({
            name: item,
            path: join(basePath, item),
            type: "folder",
            children,
          });
        }
      } else if (item.endsWith(".md")) {
        fileItems.push({
          name: item.replace(".md", ""),
          path: join(basePath, item),
          type: "file",
        });
      }
    }

    // Sort: folders first, then files, both alphabetically
    return fileItems.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error("Error scanning directory:", error);
    return [];
  }
}

export async function getDynamicFileStructure(): Promise<FileItem[]> {
  try {
    // Scan the md-files/frontend-course directory
    const frontendCourseDir = join(
      process.cwd(),
      "md-files",
      "frontend-course"
    );
    const structure = await scanDirectory(frontendCourseDir, "frontend-course");

    return structure;
  } catch (error) {
    console.error("Error getting dynamic file structure:", error);
    // Fallback to static structure
    return getFrontendCourseStructure();
  }
}

// Fallback static structure for frontend course
function getFrontendCourseStructure(): FileItem[] {
  return [
    { name: "README", path: "frontend-course/README.md", type: "file" },
    {
      name: "Week 1 - HTML & CSS Basics",
      path: "frontend-course/week-1-html-css-basics",
      type: "folder",
      children: [
        {
          name: "HTML Fundamentals",
          path: "frontend-course/week-1-html-css-basics/01-html-fundamentals.md",
          type: "file",
        },
        {
          name: "CSS Basics",
          path: "frontend-course/week-1-html-css-basics/02-css-basics.md",
          type: "file",
        },
        {
          name: "Week 1 Project",
          path: "frontend-course/week-1-html-css-basics/03-week-1-project.md",
          type: "file",
        },
      ],
    },
    {
      name: "Week 2 - CSS Layout & Responsive",
      path: "frontend-course/week-2-css-layout-responsive",
      type: "folder",
      children: [
        {
          name: "Flexbox Layout",
          path: "frontend-course/week-2-css-layout-responsive/01-flexbox-layout.md",
          type: "file",
        },
        {
          name: "CSS Grid Layout",
          path: "frontend-course/week-2-css-layout-responsive/02-css-grid-layout.md",
          type: "file",
        },
        {
          name: "Responsive Design & Media Queries",
          path: "frontend-course/week-2-css-layout-responsive/03-responsive-design-media-queries.md",
          type: "file",
        },
        {
          name: "Week 2 Project",
          path: "frontend-course/week-2-css-layout-responsive/04-week-2-project.md",
          type: "file",
        },
      ],
    },
    {
      name: "Week 3 - React Basics",
      path: "frontend-course/week-3-react-basics",
      type: "folder",
      children: [
        {
          name: "React Introduction",
          path: "frontend-course/week-3-react-basics/01-react-introduction.md",
          type: "file",
        },
        {
          name: "React Components",
          path: "frontend-course/week-3-react-basics/02-react-components.md",
          type: "file",
        },
        {
          name: "React State",
          path: "frontend-course/week-3-react-basics/03-react-state.md",
          type: "file",
        },
        {
          name: "React Todo App",
          path: "frontend-course/week-3-react-basics/04-react-todo-app.md",
          type: "file",
        },
      ],
    },
    {
      name: "Week 4 - React Advanced",
      path: "frontend-course/week-4-react-advanced",
      type: "folder",
      children: [
        {
          name: "React Hooks Basics",
          path: "frontend-course/week-4-react-advanced/01-react-hooks-basics.md",
          type: "file",
        },
        {
          name: "React Advanced Hooks",
          path: "frontend-course/week-4-react-advanced/02-react-advanced-hooks.md",
          type: "file",
        },
        {
          name: "React Patterns",
          path: "frontend-course/week-4-react-advanced/03-react-patterns.md",
          type: "file",
        },
        {
          name: "React Portfolio",
          path: "frontend-course/week-4-react-advanced/04-react-portfolio.md",
          type: "file",
        },
      ],
    },
  ];
}
