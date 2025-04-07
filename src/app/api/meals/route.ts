import connectMongoDB from "../../../../config/mongodb";
import Meal from "../../models/mealSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const meals = await Meal.find();
    return NextResponse.json({meals});
}

export async function POST(request: NextRequest) {
    const { title, image, readyInMinutes, sourceUrl, cheap, instructions, extendedIngredients, summary } = await request.json();
    await connectMongoDB();
    await Meal.create({ title, image, readyInMinutes, sourceUrl, cheap, instructions, extendedIngredients, summary });
    return NextResponse.json({message: "Meal added successfully"}, {status: 201});
}
