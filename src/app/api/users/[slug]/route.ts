import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import User from "../../../models/userSchema";

interface RouteParams {
    params: { slug: string };
}


export async function PUT(request:NextRequest, { params}:RouteParams ) {
    const { slug } = await params;
    const { username, passwordHashed, excludeCuisine, diet, intolerances, excludeIngredients } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(slug, { username, passwordHashed, excludeCuisine, diet, intolerances, excludeIngredients });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  }
  
  export async function GET(request:NextRequest, { params }:RouteParams) {
    const { slug } = await params;
    let user
    await connectMongoDB();
    if (slug.length === 36) {
      user = await User.findOne({username: slug});
    } else {
      user = await User.findOne({_id: slug});
    }

    return NextResponse.json({user}, { status: 200 });
  }
  
  export async function DELETE(request: NextRequest, { params }: RouteParams) {
      const { slug } = await params;
    
      if (!mongoose.Types.ObjectId.isValid(slug)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
    
      await connectMongoDB();
      const deletedItem = await User.findByIdAndDelete(slug);
    
      if (!deletedItem) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    }