import connectMongoDB from "../../../../config/mongodb";
import mongoose from "mongoose";
import User from "../../models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({users});
}

export async function POST(request: NextRequest) {
    const { username, passwordHashed, excludeCuisine, diet, intolerances, excludeIngredients } = await request.json();
    const id = new mongoose.Types.ObjectId();
    await connectMongoDB();
    const hash = await bcrypt.hash(passwordHashed, 5);
    await User.create({ id, username, passwordHashed: hash, excludeCuisine, diet, intolerances, excludeIngredients });
    return NextResponse.json({message: "User added successfully"}, {status: 201});
}
