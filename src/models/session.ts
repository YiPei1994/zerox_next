import { Schema, model, models } from "mongoose";

const setsDataSchema = new Schema(
  {
    reps: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  },
  { _id: false }
); // This prevents _id creation for setsData objects

const exerciseSchema = new Schema(
  {
    exerciseId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Exercise",
    },
    setsData: [setsDataSchema],
    unit: String,
    sets: Number,
  },
  { _id: false }
); // This prevents _id creation for exercise objects

const sessionSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  note: {
    type: String,
  },
  exercises: [exerciseSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false, // Exclude from query results by default
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Session = models.Session || model("Session", sessionSchema);

export default Session;
