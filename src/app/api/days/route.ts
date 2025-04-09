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
    const { dayOfWeek, date, meals } = await request.json();
    const formattedDate = new Date(date);  
    const id = new mongoose.Types.ObjectId();

    await connectMongoDB();
    await Day.create({ id, dayOfWeek, date: formattedDate, meals });
    return NextResponse.json({message: "Day added successfully"}, {status: 201});
}
