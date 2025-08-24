import { NextRequest, NextResponse } from "next/server";
import { LessonProgressService } from "../../../lib/lesson-progress";

export async function GET() {
  try {
    const lessons = await LessonProgressService.getAllLessons();
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
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
      await LessonProgressService.initializeLessons();
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
