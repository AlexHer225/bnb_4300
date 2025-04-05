import mongoose, { Schema, Document, Model } from "mongoose";
import ObjectId from "mongodb";


interface MEal extends Document {
    title: string;
    image: string;
    readyInMinutes: number;
    sourceUrl: string;
    cheap: boolean;
    instructions: string;
    extendedIngredients: Array<string>;
    summary: string;

}

const mealSchema = new Schema<MEal>({
    _id: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    readyInMinutes: {
        type: Number,
    },
    sourceUrl: {
        type: String,
    },
    cheap: {
        type: Boolean,
    },
    instructions: {
        type: String,
    },
    extendedIngredients: {
        type: [String],
    },
    summary: {
        type: String,
    },
});

const Meal: Model<MEal> = mongoose.models.Meal || mongoose.model<MEal>("Meal", mealSchema);
export default Meal;