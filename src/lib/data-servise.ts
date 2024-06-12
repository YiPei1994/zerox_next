import User from "@/models/users";
import dbConnect from "./mongodb";

//////////////////////////////////////////////////////////////// users /////////////////////////////////////////////////////////////////////
export const getUserByEmail = async (
  email: string | undefined | null | unknown,
  password: string | undefined | null | unknown
) => {
  try {
    await dbConnect();

    const user = await User.findOne({ email, password });

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
    await dbConnect();
    const user = await User.create({ email, password });
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const getUserGoogleAuth = async (
  email: string | undefined | null | unknown
) => {
  try {
    await dbConnect();

    const user = await User.findOne({ email });

    return user;
  } catch (err) {
    console.error(err);
  }
};

export const createUserGoogleAuth = async ({
  email,
  name,
}: {
  email: string | undefined | null;
  name: string | undefined | null;
}) => {
  try {
    await dbConnect();
    const user = await User.create({ email, name });
    return user;
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////// users end //////////////////////////////////////////////

/////////////////////////////////////////////// products ////////////////////////////////////////////
export const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) {
      throw new Error("problem fetching products");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
///////////////////////////////////////////// products end /////////////////////////////////////////
