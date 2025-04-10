import { NextResponse } from "next/server";
import { connect } from "@/db/db"; 
import { UserModel } from "@/models/userModel"; 

export async function POST(req: Request) {
  try {
    await connect(); 

    const body = await req.json();
    console.log("Received Clerk Webhook:", body);

    if (body.type === "user.created") {
      const userData = {
        clerkId: body.data.id,
        email: body.data.email_addresses[0]?.email_address || "",
        username: body.data.username || "",
        firstName: body.data.first_name || "",
        lastName: body.data.last_name || "",
        createdAt: new Date(),
      };

      await UserModel.create(userData);
      console.log("✅ User saved to MongoDB");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
