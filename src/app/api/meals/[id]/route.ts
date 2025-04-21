import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Meal from "../../../models/mealSchema";

interface RouteParams {
    params: { id: string };
}


export async function PUT(request:NextRequest, { params}:RouteParams ) {
    const { id } = await params;
    const { title, image, readyInMinutes, sourceUrl, cheap, diets, summary } = await request.json();
    await connectMongoDB();
    await Meal.findByIdAndUpdate(id, { title, image, readyInMinutes, sourceUrl, cheap, diets, summary });
    return NextResponse.json({ message: "Meal updated" }, { status: 200 });
  }
  
  export async function GET(request:NextRequest, { params }:RouteParams) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format for id: ", id }, { status: 400 });
    }
    await connectMongoDB();
    const objectId = new mongoose.Types.ObjectId(id); 
    const meal = await Meal.findOne({_id: objectId});
    return NextResponse.json({meal}, { status: 200 });
  }
  
  export async function DELETE(request: NextRequest, { params }: RouteParams) {
      const { id } = await params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
    
      await connectMongoDB();
      const deletedItem = await Meal.findByIdAndDelete(id);
    
      if (!deletedItem) {
        return NextResponse.json({ message: "Meal not found" }, { status: 404 });
      }
    
      return NextResponse.json({ message: "Meal deleted" }, { status: 200 });
    }