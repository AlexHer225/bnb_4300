import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Day from "../../../models/daySchema";

interface RouteParams {
    params: { id: string };
}


export async function PUT(request:NextRequest, { params}:RouteParams ) {
    const { id } = await params;
    const { dayOfWeek, date, meals } = await request.json();
    await connectMongoDB();
    await Day.findByIdAndUpdate(id, { dayOfWeek, date, meals });
    return NextResponse.json({ message: "Day updated" }, { status: 200 });
  }
  
  export async function GET(request:NextRequest, { params }:RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const day = await Day.findOne({_id: id});
    return NextResponse.json({day}, { status: 200 });
  }
  
  export async function DELETE(request: NextRequest, { params }: RouteParams) {
      const { id } = await params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
    
      await connectMongoDB();
      const deletedItem = await Day.findByIdAndDelete(id);
    
      if (!deletedItem) {
        return NextResponse.json({ message: "Day not found" }, { status: 404 });
      }
    
      return NextResponse.json({ message: "Day deleted" }, { status: 200 });
    }