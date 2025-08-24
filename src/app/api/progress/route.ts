import { NextRequest, NextResponse } from "next/server";
import { LessonProgressService } from "../../../lib/lesson-progress";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const week = searchParams.get("week");

    if (week) {
      const progress = await LessonProgressService.getWeekProgress(week);
      return NextResponse.json(progress);
    } else {
      const overallProgress = await LessonProgressService.getOverallProgress();
      return NextResponse.json(overallProgress);
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
