import mongoose, { Schema, Document, Model } from "mongoose";

interface PLan extends Document {
    name: string;
    days?: [{type: mongoose.Schema.Types.ObjectId, ref: 'Day'}];
    user?: {type: mongoose.Schema.Types.ObjectId, ref: 'User'};
}

const planSchema = new Schema<PLan>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    days: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Day',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Plan: Model<PLan> = mongoose.models.Plan || mongoose.model<PLan>("Plan", planSchema);
export default Plan;