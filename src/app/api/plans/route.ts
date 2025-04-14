import connectMongoDB from "../../../../config/mongodb";
import mongoose from "mongoose";
import Plan from "../../models/planSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const plans = await Plan.find();
    return NextResponse.json({plans});
}

export async function POST(request: NextRequest) {
    const { days, user, name } = await request.json();
    const id = new mongoose.Types.ObjectId();    
    await connectMongoDB();
    await Plan.create({ id, days, user, name });
    return NextResponse.json({message: "Plan added successfully"}, {status: 201});
}
