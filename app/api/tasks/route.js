import { connectMongoDB } from "@/app/lib/mongodb";
import Task from "@/app/models/task";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  //   console.log(searchParams);
  const email = searchParams.get("email");
    // console.log(email)

  try {
    await connectMongoDB();
    const tasks = await Task.find({email});
    // console.log({tasks})
    return NextResponse.json({tasks});
  } catch (error) {
    console.log(error);
  }
}
