import { NextResponse } from "next/server";
import { getDynamicFileStructure } from "../../../lib/file-scanner";

export async function GET() {
  try {
    console.log('API: Starting to get file structure...');
    const fileStructure = await getDynamicFileStructure();
    console.log('API: File structure retrieved successfully:', fileStructure.length, 'items');
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
