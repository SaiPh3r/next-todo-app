import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db";
import { ToDoModel } from "@/models/todoModels";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("✅ Received ToDo Request:", body);

    const todo = new ToDoModel({
      userId,
      title: body.title,
      completed: body.completed ?? false,
    });

    await todo.save();

    return NextResponse.json({ success: true, data: todo });
  } catch (error: any) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
