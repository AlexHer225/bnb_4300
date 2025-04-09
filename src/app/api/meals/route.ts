import connectMongoDB from "../../../../config/mongodb";
import mongoose from "mongoose";
import Meal from "../../models/mealSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const meals = await Meal.find();
    return NextResponse.json({meals});
}

export async function POST(request: NextRequest) {
    const { title, image, readyInMinutes, sourceUrl, cheap, diets, summary } = await request.json();
    const id = new mongoose.Types.ObjectId();    
    await connectMongoDB();
    await Meal.create({ id, title, image, readyInMinutes, sourceUrl, cheap, diets, summary });
    return NextResponse.json({message: "Meal added successfully"}, {status: 201});
}
