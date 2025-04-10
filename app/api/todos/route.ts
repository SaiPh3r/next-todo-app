import { NextResponse } from "next/server";
import { connect } from "@/db/db";
import { ToDoModel } from "@/models/todoModels";
import { getAuth } from "@clerk/nextjs/server";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const todos = await ToDoModel.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: todos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
