import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("id");
    if (userId) {
      const user = JSON.parse(JSON.stringify(await User.findById(userId)));

      return NextResponse.json({
        status: "success",
        data: user,
      });
    } else {
      const users = JSON.parse(JSON.stringify(await User.find()));
      return NextResponse.json({
        status: "success",
        results: users.length,
        data: users,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
