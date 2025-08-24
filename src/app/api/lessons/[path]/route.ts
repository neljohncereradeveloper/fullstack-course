import { NextRequest, NextResponse } from "next/server";
import { LocalStorageService } from "../../../../lib/local-storage-service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { action } = await request.json();
    const { path } = await params;
    const lessonPath = decodeURIComponent(path);

    if (action === "complete") {
      LocalStorageService.markLessonCompleted(lessonPath);
      return NextResponse.json({ message: "Lesson marked as completed" });
    } else if (action === "incomplete") {
      LocalStorageService.markLessonIncomplete(lessonPath);
      return NextResponse.json({ message: "Lesson marked as incomplete" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params;
    const lessonPath = decodeURIComponent(path);
    const isCompleted = LocalStorageService.isLessonCompleted(lessonPath);
    return NextResponse.json({ isCompleted });
  } catch (error) {
    console.error("Error checking lesson status:", error);
    return NextResponse.json(
      { error: "Failed to check lesson status" },
      { status: 500 }
    );
  }
}
