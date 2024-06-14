export type UserClient = {
  _id: string | undefined;
  email: string;
  name: string;
  admin: string;
  icon: string;
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
