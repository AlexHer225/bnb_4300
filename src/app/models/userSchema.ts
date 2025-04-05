import mongoose, { Schema, Document, Model } from "mongoose";
import ObjectId from "mongodb";

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
        type: ObjectId,
    },
    username: {
        type: String,
    },
    passwordHashed: {
        type: String,
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