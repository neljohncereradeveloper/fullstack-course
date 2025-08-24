export interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileItem[];
}

// Function to get file structure from actual directory
export async function getFileStructure(): Promise<FileItem[]> {
  try {
    const response = await fetch("/api/files");
    if (!response.ok) {
      throw new Error(`Failed to fetch file structure: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching file structure:", error);
    // Return static fallback structure
    return getStaticFileStructure();
  }
}

// Static fallback structure
function getStaticFileStructure(): FileItem[] {
  return [
    {
      name: "01 - Introduction",
      path: "01-introduction",
      type: "folder",
      children: [
        {
          name: "What is a Database?",
          path: "01-introduction/01-what-is-database.md",
          type: "file",
        },
        {
          name: "Types of Databases",
          path: "01-introduction/02-types-of-databases.md",
          type: "file",
        },
        {
          name: "Database Management System",
          path: "01-introduction/03-dbms.md",
          type: "file",
        },
      ],
    },
    {
      name: "02 - Design",
      path: "02-design",
      type: "folder",
      children: [
        {
          name: "Data Modeling",
          path: "02-design/01-data-modeling.md",
          type: "file",
        },
      ],
    },
    {
      name: "03 - SQL",
      path: "03-sql",
      type: "folder",
      children: [
        {
          name: "SQL Introduction",
          path: "03-sql/01-sql-intro.md",
          type: "file",
        },
      ],
    },
    {
      name: "04 - Projects",
      path: "04-projects",
      type: "folder",
      children: [
        {
          name: "Library System",
          path: "04-projects/01-library-system.md",
          type: "file",
        },
      ],
    },
    {
      name: "05 - Advanced",
      path: "05-advanced",
      type: "folder",
      children: [],
    },
    {
      name: "Exercises",
      path: "exercises",
      type: "folder",
      children: [
        {
          name: "SQL Practice Exercises",
          path: "exercises/sql-practice-exercises.md",
          type: "file",
        },
      ],
    },
    { name: "README", path: "README.md", type: "file" },
  ];
}

// Function to get markdown content from actual files
export async function getMarkdownContent(path: string): Promise<string> {
  try {
    // Use fetch to read the file (this works in Next.js)
    const response = await fetch(
      `/api/markdown?path=${encodeURIComponent(path)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return `# File Not Found\n\nThe requested file could not be found.\n\n**Path:** ${path}\n\n**Error:** ${
      error instanceof Error ? error.message : "Unknown error"
    }`;
  }
}

export function getFileName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1].replace(".md", "");
}
