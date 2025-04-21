import { NextRequest, NextResponse } from "next/server";
import Day from "../../../../models/daySchema";
import connectMongoDB from "../../../../../../config/mongodb";

interface RouteParams {
    params: {id: string}
}

export async function PUT(request:NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { mealId } = await request.json();
    try {
        await connectMongoDB();
        const updatedDay = await Day.findByIdAndUpdate(
            id,
            { $pull: { meals: mealId } },
            { new: true }
        );
            // If no document was found, return 404
        if (!updatedDay) {
            return NextResponse.json({ message: "Day not found" }, { status: 404 });
        }
        return NextResponse.json({updatedDay}, {status: 200});
    } catch (err) {
        return NextResponse.json({message: 'error: Failed to remove meal from day'}, {status: 500});
    }
}  