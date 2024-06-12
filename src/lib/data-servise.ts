import User from "@/models/users";
import dbConnect from "./mongodb";

//////////////////////////////////////////////////////////////// users /////////////////////////////////////////////////////////////////////
export const getUserByEmail = async (email: string | undefined | null) => {
  try {
    await dbConnect();

    await User.findOne({ email });

    return true;
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async ({
  email,
  name,
}: {
  email: string | undefined | null;
  name: string | undefined | null;
}) => {
  try {
    await dbConnect();
    await User.create({ email, name });
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
