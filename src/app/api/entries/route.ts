import { NextResponse } from 'next/server';
import clientPromise from '@/lib/database';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('db');

    // Retrieve all documents
    const entries = await db.collection('entries').find({}).toArray();
    return NextResponse.json(entries, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('db');

    const body = await request.json();
    const { miles, totalTime, date, image } = body;

    if (!miles || !totalTime) {
      return NextResponse.json(
        { error: 'Missing required fields (miles, totalTime)' },
        { status: 400 }
      );
    }

    // Use client-provided date if available, otherwise use "now"
    let entryDate: Date;
    if (date) {
      // Attempt to parse the client date
      entryDate = new Date(date);
      if (isNaN(entryDate.getTime())) {
        // If parsing fails, fall back
        entryDate = new Date();
      }
    } else {
      entryDate = new Date();
    }

    // Create the record
    const newEntry = {
      miles,
      totalTime,
      image: image || null,
      // store as "createdAt" or "date", up to you
      createdAt: entryDate,
    };

    const result = await db.collection('entries').insertOne(newEntry);

    return NextResponse.json({
      message: 'Record created successfully',
      insertedId: result.insertedId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
