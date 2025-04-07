import connectMongoDB from "../../../../config/mongodb";
import Day from "../../models/daySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const days = await Day.find();
    return NextResponse.json({days});
}

export async function POST(request: NextRequest) {
    const { dayOfWeek, date, meal } = await request.json();
    await connectMongoDB();
    await Day.create({ dayOfWeek, date, meal });
    return NextResponse.json({message: "Day added successfully"}, {status: 201});
}
