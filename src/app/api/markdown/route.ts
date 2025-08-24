import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { error: "Path parameter is required" },
        { status: 400 }
      );
    }

    // Ensure the path ends with .md to prevent directory access
    if (!filePath.endsWith(".md")) {
      return NextResponse.json(
        { error: "Only markdown files (.md) are allowed" },
        { status: 400 }
      );
    }

    // Construct the full path to the markdown file
    // Use the md-files directory in the web folder
    const fullPath = join(process.cwd(), "md-files", filePath);

    console.log("Attempting to read file:", fullPath);

    // Check if the path is actually a file, not a directory
    const stats = await stat(fullPath);
    if (!stats.isFile()) {
      return NextResponse.json(
        { error: "Path is not a file", path: filePath },
        { status: 400 }
      );
    }

    // Read the markdown file
    const content = await readFile(fullPath, "utf-8");

    // Return the content as plain text
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);

    // Get the filePath from the request for error reporting
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    // More detailed error logging
    if (error instanceof Error && "code" in error) {
      if (error.code === "ENOENT") {
        return NextResponse.json(
          {
            error: "File not found",
            path: filePath,
            fullPath: filePath
              ? join(process.cwd(), "md-files", filePath)
              : "unknown",
          },
          { status: 404 }
        );
      }
      if (error.code === "EISDIR") {
        return NextResponse.json(
          {
            error: "Path is a directory, not a file",
            path: filePath,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        path: filePath,
      },
      { status: 500 }
    );
  }
}
