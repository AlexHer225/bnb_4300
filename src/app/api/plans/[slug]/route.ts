import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Plan from "../../../models/planSchema";

interface RouteParams {
    params: { slug: string };
}


export async function PUT(request:NextRequest, { params}:RouteParams ) {
    const { slug: id } = await params;
    const { days, user, name  } = await request.json();
    await connectMongoDB();
    await Plan.findByIdAndUpdate(id, { days, user, name });
    return NextResponse.json({ message: "Plan updated" }, { status: 200 });
  }
  
  // export async function GET(request:NextRequest, { params }:RouteParams) {
  //   const { slug: userId } = await params;
  //   await connectMongoDB();
  //   const plan = await Plan.find({ user: userId });
  //   // console.log('RETURNING PLAN: ', plan);
  //   return NextResponse.json(plan, { status: 200 });
  // }

 export async function GET(request:NextRequest, { params }:RouteParams) {
    const { slug: id } = await params;
    await connectMongoDB();
    const plan = await Plan.find({ _id: id });
    // console.log('RETURNING PLAN: ', plan);
    return NextResponse.json(plan, { status: 200 });
}
  
  
  export async function DELETE(request: NextRequest, { params }: RouteParams) {
      const { slug: id } = await params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
    
      await connectMongoDB();
      const deletedItem = await Plan.findByIdAndDelete(id);
    
      if (!deletedItem) {
        return NextResponse.json({ message: "Plan not found" }, { status: 404 });
      }
    
      return NextResponse.json({ message: "Plan deleted" }, { status: 200 });
    }