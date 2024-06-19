import { Document, Schema, model, models, Types } from "mongoose";

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight?: number[]; // Optional field for weighted exercises
  unit: string;
  muscleGroup?: string[]; // Optional array of muscle groups targeted
};

export interface ISession extends Document {
  _id: Types.ObjectId;
  user_id: string;
  createdAt: Date;
  updatedAt?: Date;
  exercises: Exercise[];
  duration?: number; // Optional field for session duration in minutes
  notes?: string; // Optional field for session notes
}

const sessionSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  exercises: {
    type: [Schema.Types.Mixed], // Flexible schema for exercises
    required: true,
    validate: {
      validator: (exercises: Exercise[]) => exercises.length > 0,
      message: "At least one exercise is required per session.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false, // Exclude from query results by default
  },
  updatedAt: {
    type: Date,
    default: undefined, // Optional for tracking updates
  },
  duration: {
    type: Number,
    min: 0, // Enforce non-negative duration
  },
  notes: {
    type: String,
  },
});

const Session = models.Session || model<ISession>("Session", sessionSchema);

export default Session;
