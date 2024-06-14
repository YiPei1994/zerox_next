import { Document, Schema, model, models, Types } from "mongoose";

export interface IExercise extends Document {
  _id: Types.ObjectId;
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  createdAt: string;
}

const exerciseSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, "An exercise must have a name."],
    unique: true,
  },
  force: {
    type: String,
    require: [true, "An exercise must have a force type ex. pull,push..."],
  },
  level: {
    type: String,
    require: [true, "An exercise must have a difficulity level"],
  },
  mechanic: {
    type: String,
    require: [true, "An exercise must have a exercise mechanic"],
  },
  equipment: {
    type: String,
  },
  primaryMuscles: {
    type: [String],
    require: [true, "An exercise must have a primary target muscles."],
  },
  secondaryMuscles: {
    type: [String],
  },
  instructions: {
    type: [String],
    require: [true, "An exercise must have a basic instructions."],
  },
  category: {
    type: String,
    require: [true, "An exercise must have a category."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Exercise =
  models.Exercise || model<IExercise>("Exercise", exerciseSchema);

export default Exercise;
