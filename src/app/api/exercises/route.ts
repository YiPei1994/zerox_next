import Exercise from "@/models/exercise";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const exerciseId = req.nextUrl.searchParams.get("id");
    if (exerciseId) {
      const exercise = await Exercise.findById(exerciseId);

      return NextResponse.json({
        status: "success",
        data: exercise,
      });
    } else {
      const exercises = await Exercise.find();
      return NextResponse.json({
        status: "success",
        results: exercises.length,
        data: exercises,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const exercise = await Exercise.create(data);

    return NextResponse.json({
      status: "success",
      data: exercise,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const exerciseId = req.nextUrl.searchParams.get("id");
    const data = await req.json();

    const exercise = await Exercise.findByIdAndUpdate(exerciseId, data);

    return NextResponse.json({
      status: "success",
      data: exercise,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const exerciseId = req.nextUrl.searchParams.get("id");

    await Exercise.findByIdAndDelete(exerciseId);

    return NextResponse.json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
