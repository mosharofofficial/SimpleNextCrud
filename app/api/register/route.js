import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();
    await User.create({ email, password });

    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "error while registering user" },
      { status: 500 }
    );
  }
}
