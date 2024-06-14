import User, { IUser } from "@/models/user";
import { WEB_URL } from "./constants";

//////////////////////////////////////////////////////////////// users /////////////////////////////////////////////////////////////////////
export const findUserByEmail = async (
  email: string | undefined | null | unknown
) => {
  try {
    const query = { email }; // Start with the email condition

    const user = await User.findOne<IUser>(query); // Find one user matching both conditions (if password is provided)
    return user;
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
    return user;
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

/////////////////////////////////////////////// products ////////////////////////////////////////////
export const getAllExercises = async () => {
  try {
    const res = await fetch(`${WEB_URL}/api/exercises`);
    if (!res.ok) {
      throw new Error("problem fetching exercises");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
///////////////////////////////////////////// products end /////////////////////////////////////////
