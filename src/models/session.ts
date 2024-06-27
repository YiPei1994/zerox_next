import { Schema, model, models } from "mongoose";

const sessionSchema: Schema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  note: {
    type: String,
  },
  exercises: [
    {
      exerciseId: {
        type: Schema.ObjectId,
        required: true,
        ref: "Exercise",
      },
      weights: [String],
      reps: [String],
      unit: String,
    },
  ],
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
