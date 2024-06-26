import { Document, Schema, model, models, Types } from "mongoose";

type Exercise = {
  name: string;
  sets?: number[];
  reps?: number[];
  unit?: string; // optional field for
  duration?: number; // Optional minutes
};

export interface ISession extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  exercises: Exercise[];
  notes: string; // Optional field for session notes
}

const sessionSchema: Schema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  notes: {
    type: String,
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
});

const Session = models.Session || model<ISession>("Session", sessionSchema);

export default Session;
