import mongoose, { Schema, Document, Model } from "mongoose";

interface MEal extends Document {
    title: string;
    image: string;
    readyInMinutes: number;
    sourceUrl: string;
    cheap: boolean;
    diets?: [string];
    summary?: string;
}

const mealSchema = new Schema<MEal>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    readyInMinutes: {
        type: Number,
        required: true,
    },
    sourceUrl: {
        type: String,
        required: true,
    },
    cheap: {
        type: Boolean,
        required: true,
    },
    diets: {
        type: [String],
    },
    summary: {
        type: String,
    },
});

const Meal: Model<MEal> = mongoose.models.Meal || mongoose.model<MEal>("Meal", mealSchema);
export default Meal;