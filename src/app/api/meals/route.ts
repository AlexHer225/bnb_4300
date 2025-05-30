import connectMongoDB from "../../../../config/mongodb";
import mongoose from "mongoose";
import Meal from "../../models/mealSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();

    const url = new URL(request.url);
    var size = null;
    if (url.searchParams)
        size = url.searchParams.get('size');
    var meals = null;
    if (size && !isNaN(Number(size))) {
        meals = await Meal.aggregate([{ $sample: { size: Number(size) }}]);
    } else {
        meals = await Meal.find();
    }

    return NextResponse.json({meals});
}


export async function POST(request: NextRequest) {
    const { search, cuisine, diet, intolerances, includeIngredients, maxReadyTime, maxPrice } = await request.json();
    const id = new mongoose.Types.ObjectId();

    const apiKey = '1f610de2a16e4a07b958e9335c928208';
    const params = new URLSearchParams({
        apiKey,
        ...({addRecipeInformation: true}),
        ...(search && { query: search }),
        ...(cuisine && { cuisine }),
        ...(diet && { diet }),
        ...(intolerances && { intolerances }),
        ...(includeIngredients && { includeIngredients }),
        ...(maxReadyTime && { maxReadyTime: maxReadyTime.toString() }),
        ...(maxPrice && { maxPrice: maxPrice.toString() }),
        number: '1',
      });
    
    const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
    const response = await fetch(spoonacularUrl);
    const data = await response.json();
    const newMeal = await data.results[0];

    if (newMeal) {
        const { id, title, image, readyInMinutes, sourceUrl, cheap, diets, summary } = newMeal
        await connectMongoDB();

        const meal = await Meal.create({ id, title, image, readyInMinutes, sourceUrl, cheap, diets, summary });
        return NextResponse.json(meal, {status: 201});    
    } else {
        return new NextResponse(null, { status: 204 });
    }
}
