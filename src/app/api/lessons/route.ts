import { NextRequest, NextResponse } from "next/server";
import { LocalStorageService } from "../../../lib/local-storage-service";

export async function GET() {
  try {
    // Initialize lessons if they don't exist
    LocalStorageService.initializeLessons();

    // Get lessons from localStorage (this will be handled client-side)
    // For API compatibility, we'll return an empty array and let the client handle localStorage
    return NextResponse.json([]);
  } catch (error) {
    console.error("Error in lessons API:", error);
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === "initialize") {
      LocalStorageService.initializeLessons();
      return NextResponse.json({ message: "Lessons initialized successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in lesson operation:", error);
    return NextResponse.json(
      { error: "Failed to perform lesson operation" },
      { status: 500 }
    );
  }
}
