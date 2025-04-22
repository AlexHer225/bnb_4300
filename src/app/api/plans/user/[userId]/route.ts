import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../../config/mongodb";
import Plan from "../../../../models/planSchema";

interface RouteParams {
    params: { userId: string };
}

export async function GET(request:NextRequest, { params }:RouteParams) {
    const { userId } = await params;
    await connectMongoDB();
    const plan = await Plan.find({ user: userId });
    // console.log('RETURNING PLAN: ', plan);
    return NextResponse.json(plan, { status: 200 });
  }
  