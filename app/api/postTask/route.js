import { connectMongoDB } from "@/app/lib/mongodb";
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, task } = await req.json();
    // console.log("backend: ",{email, task})
    await connectMongoDB();
    Task.create({ email, task });

    return NextResponse.json({ message: "created" });
  } catch (error) {
    return NextResponse.json({ message: "error while creating task" });
  }
}
