import User, { IUser } from "@/models/user";
import { ExerciseClient, UserClient } from "@/types/types";
import { WEB_URL } from "./constants";

//////////////////////////////////////////////////////////////// users /////////////////////////////////////////////////////////////////////
export const findUserByEmail = async (
  email: string | undefined | null | unknown
) => {
  try {
    const query = { email }; // Start with the email condition

    const user = await User.findOne<IUser>(query).select("+password"); // Find one user matching both conditions (if password is provided)
    const data = JSON.parse(JSON.stringify(user));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const findUserById = async (id: string | undefined | null | unknown) => {
  try {
    // Start with the email condition

    const user = await User.findById<IUser>(id).select("+password"); // Find one user matching both conditions (if password is provided)
    const data = JSON.parse(JSON.stringify(user));
    return data as UserClient;
  } catch (err) {
    console.error(err);
  }
};

export const createUserByEmail = async (
  email: string | undefined | null | unknown,
  password: string | undefined | null | unknown
) => {
  try {
    const user = await User.create<IUser>({ email, password });
    const data = JSON.parse(JSON.stringify(user));
    return data as UserClient;
  } catch (err) {
    console.error(err);
  }
};

export const getUserGoogleAuth = async (
  email: string | undefined | null | unknown
) => {
  try {
    const user = await User.findOne<IUser>({ email });

    return user;
  } catch (err) {
    console.error(err);
  }
};

export const createUserGoogleAuth = async ({
  email,
  name,
  icon,
}: {
  email: string | undefined | null;
  name: string | undefined | null;
  icon: string | undefined | null;
}) => {
  try {
    const user = await User.create<IUser>({ email, name, icon });
    return user;
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////// users end //////////////////////////////////////////////

/////////////////////////////////////////////// Exercises ////////////////////////////////////////////
export const getAllExercises = async () => {
  try {
    const res = await fetch(`${WEB_URL}/api/exercises`);
    if (!res.ok) {
      throw new Error("problem fetching exercises");
    }
    const result = await res.json();
    const data = result.data;
    return data as ExerciseClient[];
  } catch (err) {
    console.error(err);
  }
};

export const getExercises = async (id: string) => {
  try {
    const res = await fetch(`${WEB_URL}/api/exercises?id=${id}`);
    if (!res.ok) {
      throw new Error("problem fetching exercises");
    }
    const result = await res.json();
    const data = result.data;
    return data as ExerciseClient;
  } catch (err) {
    console.error(err);
  }
};

///////////////////////////////////////////// Exercises end /////////////////////////////////////////
