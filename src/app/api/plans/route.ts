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

    const body = await request.json();
    const { days, user, name } = body;

    const _id = new mongoose.Types.ObjectId();

    // console.log('POSTING PLAN DAY IDS = ', days);

    let dayIds: mongoose.Types.ObjectId[] = [];
    if (Array.isArray(days)) {
        dayIds = days
            .filter((day: string) => mongoose.Types.ObjectId.isValid(day))
            .map((day: string) => new mongoose.Types.ObjectId(day));
    }

    await connectMongoDB();

    const planData: any = { _id, user, name };
    if (dayIds.length > 0) {
        planData.days = dayIds;
    }

    const plan = await Plan.create(planData);
    return NextResponse.json(plan.id, { status: 201 });

    // const { days, user, name } = await request.json();
    // const _id = new mongoose.Types.ObjectId();
    // console.log('POSTING PLAN DAY IDS = ', days);
    // const dayIds = days.map((day: string) => new mongoose.Types.ObjectId(day));

    // await connectMongoDB();
    // await Plan.create({ _id, days: dayIds, user, name });
    // return NextResponse.json({message: "Plan added successfully"}, {status: 201});
}
