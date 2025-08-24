import { NextResponse } from "next/server";
import { getDynamicFileStructure } from "../../../lib/file-scanner";

export async function GET() {
  try {
    const fileStructure = await getDynamicFileStructure();
    return NextResponse.json(fileStructure);
  } catch (error) {
    console.error("Error getting file structure:", error);
    return NextResponse.json(
      {
        error: "Failed to get file structure",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
