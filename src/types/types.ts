export type UserClient = {
  _id: string | undefined;
  email: string;
  name: string;
  role: string;
  icon: string;
  password: string;
  passwordResetToken: string;
  active: boolean;
};

export type ExerciseClient = {
  _id: string;
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
};

export type setData = {
  reps: number;
  weight: number;
};
export interface ExerciseData {
  exerciseId: ExerciseClient;
  setsData: setData[];
  unit: string;
  sets: number;
}

export interface SessionData {
  _id: string;
  userId: string; // Changed from 'user' to 'userId' to match the schema
  note: string;
  exercises: ExerciseData[];
  createdAt: string;
  active: boolean;
}
