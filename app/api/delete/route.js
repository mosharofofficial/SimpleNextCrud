import Task from "@/app/models/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("id: ", id);
  try {
    await connectMongoDB();
    // const res = await Task.deleteOne( {_id: mongoose.Types.ObjectId(id)});
    await Task.findOneAndDelete({ _id: id });
    // console.log(res);
    return NextResponse.json({ message: "deleted" });
    // console.log(id);
  } catch (error) {
    return NextResponse.json({ message: "error while deleting" });
  }
}
