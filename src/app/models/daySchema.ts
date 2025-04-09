import mongoose, { Schema, Document, Model } from "mongoose";
import Meal from "./mealSchema";

interface DAy extends Document {
    dayOfWeek?: string;
    date?: Date;
    meals?: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}];
}

const daySchema = new Schema<DAy>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },    
    dayOfWeek: {
        type: String,
    },
    date: {
        type: Date,
    },
    meals: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal',
    },
});

const Day: Model<DAy> = mongoose.models.Day || mongoose.model<DAy>("Day", daySchema);
export default Day;