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
  _id: string | undefined;
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

export interface ExerciseData {
  exerciseId: {
    _id: string;
    name: string;
    category: string;
  };
  weights: string[];
  reps: string[];
  unit: string;
}
export interface SessionData {
  _id: string;
  user: string;
  note: string;
  exercises: ExerciseData[];
  createdAt: string;
  active: boolean;
}
