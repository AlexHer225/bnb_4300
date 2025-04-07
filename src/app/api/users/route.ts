import connectMongoDB from "../../../../config/mongodb";
import User from "../../models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}

export async function POST(request: NextRequest) {
    const { username, passwordHashed, excludeCuisine, diet, intolerances, excludeIngredients } = await request.json();
    await connectMongoDB();
    await User.create({ username, passwordHashed, excludeCuisine, diet, intolerances, excludeIngredients });
    return NextResponse.json({message: "User added successfully"}, {status: 201});
}
