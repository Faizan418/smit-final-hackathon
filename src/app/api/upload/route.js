import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/database/db";
import File from "@/models/fileModel";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) throw error;
        const newFile = await File.create({ url: result.secure_url, name: file.name });
        return NextResponse.json({ success: true, data: newFile });
      }
    );
    uploadResponse.end(buffer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
