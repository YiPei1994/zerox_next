import Session from "@/models/session";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("id");
    if (sessionId) {
      const session = JSON.parse(
        JSON.stringify(await Session.findById(sessionId))
      );

      return NextResponse.json({
        status: "success",
        data: session,
      });
    } else {
      const sessions = JSON.parse(JSON.stringify(await Session.find()));
      return NextResponse.json({
        status: "success",
        results: sessions.length,
        data: sessions,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const session = await Session.create(data);

    return NextResponse.json({
      status: "success",
      data: session,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("id");
    const data = await req.json();

    const exercise = await Session.findByIdAndUpdate(sessionId, data);

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
    const sessionId = req.nextUrl.searchParams.get("id");

    await Session.findByIdAndDelete(sessionId);

    return NextResponse.json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
