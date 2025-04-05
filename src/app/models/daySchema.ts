import mongoose, { Schema, Document, Model } from "mongoose";
import ObjectId from "mongodb";


interface DAy extends Document {
    dayOfWeek: string;
    date: string;
    meal: Object;
}

const daySchema = new Schema<DAy>({
    dayOfWeek: {
        type: String,
    },
    date: {
        type: String,
    },
    meal: {
        type: Object,
    },
});

const Day: Model<DAy> = mongoose.models.Day || mongoose.model<DAy>("Day", daySchema);
export default Day;