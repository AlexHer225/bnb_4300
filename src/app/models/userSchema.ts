import mongoose, { Schema, Document, Model } from "mongoose";

interface USer extends Document {
    username: string;
    passwordHashed: string;
    excludeCuisine?: string;
    diet?: string;
    intolerances?: string;
    excludeIngredients?: string;
}

const userSchema = new Schema<USer>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    passwordHashed: {
        type: String,
        required: true,
    },
    excludeCuisine: {
        type: String,
    },
    diet: {
        type: String,
    },
    intolerances: {
        type: String,
    },
    excludeIngredients: {
        type: String,
    },
});

const User: Model<USer> = mongoose.models.User || mongoose.model<USer>("User", userSchema);
export default User;