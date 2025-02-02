import { NextResponse } from 'next/server';
import clientPromise from '@/lib/database';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('db');

    // For JSON requests, parse the request body as JSON
    const body = await request.json();

    const { miles, totalTime, image } = body; // Destructure fields you expect
    
    // (Optional) Validate your incoming data here
    if (!miles || !totalTime) {
      return NextResponse.json(
        { error: 'Missing required fields (miles, totalTime)' },
        { status: 400 }
      );
    }

    // Create a record to insert
    const newEntry = {
      miles,
      totalTime,
      // If you're storing just a string or base64 for the image, you can include it
      image: image || null,
      createdAt: new Date(),
    };

    // Insert into your collection (e.g., "runs")
    const result = await db.collection('entries').insertOne(newEntry);

    return NextResponse.json({
      message: 'Record created successfully',
      insertedId: result.insertedId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
