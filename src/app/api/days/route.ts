import connectMongoDB from "../../../../config/mongodb";
import mongoose, { mongo } from "mongoose";
import Day from "../../models/daySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const days = await Day.find();
    return NextResponse.json({days});
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { dayOfWeek, date, meals } = body;

    if (!dayOfWeek ) {
        return NextResponse.json({ error: 'Missing required fields: dayOfWeek' }, { status: 400 });
    }

    const formattedDate = date ? new Date(date) : null;
    const formattedMeals = meals ? meals : null;
    const id = new mongoose.Types.ObjectId();

    await connectMongoDB();
    // console.log(`CREATING DAY with meals: `, formattedMeals);
    const day = await Day.create({ id, dayOfWeek, date: formattedDate, meals: formattedMeals });
    return NextResponse.json(day, { status: 201 });
}