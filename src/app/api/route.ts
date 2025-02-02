import clientPromise from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("admin");

    // Ping MongoDB
    await db.command({ ping: 1 });

    return NextResponse.json({
      message: "Pinged your deployment. You successfully connected to MongoDB!",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
