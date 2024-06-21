"use server";

import User from "@/models/user";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../auth";
import { WEB_PASSWORD_RESET_URL } from "../constants";
import { findUserByEmail } from "../data-servise";
import {
  correctPassword,
  createToken,
  hashAndSalt,
  hashResetToken,
  sendEmail,
} from "../helpers";
import {
  formForgotPasswordSchema,
  formResetPasswordSchema,
  formSignInSchema,
  formSignUpSchema,
} from "../zodSchema";

/////////////////////// auth /////////////////////////////////////////////////
export async function userSignIn(formData: FormData) {
  /**
   * Signs in a user by validating form data, finding the user, verifying password,
   * creating a token, and setting a session cookie.
   *
   * @param formData {FormData} The user-submitted form data containing email and password.
   * @returns {Promise<{ status: string, message: string }>} An object indicating success
   *   or failure with a corresponding message.
   * @throws {Error} If form data is invalid, user is not found, or password is incorrect.
   */

  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formSignInSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(
        "Invalid form data. Please check the fields and try again."
      ); // More specific message
    }

    // 2. Find user by email
    const user = await findUserByEmail(parsed.data.email);

    if (!user) {
      throw new Error(
        "Invalid email or password. Please check your credentials."
      ); // More informative message
    }

    // 3. Verify password
    if (!(await correctPassword(parsed.data.password, user.password))) {
      throw new Error(
        "Invalid email or password. Please check your credentials."
      ); // More informative message
    }

    // 4. Create token and set cookie (assuming success at this point)
    const token = createToken(user._id);
    cookies().set("session", token, { httpOnly: true });

    return { status: "success", message: "Account logged in successfully." };
  } catch (err) {
    console.error("Error during user sign-in:", err); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred during login. Please try again.",
    };
  }
}

export async function userSignUp(formData: FormData) {
  /**
   * Signs up a new user by validating form data, hashing the password,
   * creating a user in the database, creating a token, and setting a session cookie.
   *
   * @param formData {FormData} The user-submitted form data containing email and password.
   * @returns {Promise<{ status: string, message: string }>} An object indicating success
   *   or failure with a corresponding message.
   * @throws {Error} If form data is invalid, user creation fails, or other errors occur.
   */

  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formSignUpSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(
        "Invalid form data. Please check the fields and try again."
      ); // More specific message
    }

    // 2. Hash password and create user
    const hashPassword = await hashAndSalt(parsed.data.password);
    const email = parsed.data.email;
    const newUser = {
      email,
      password: hashPassword,
      createdFrom: "email",
    };

    const user = await User.create(newUser);

    if (!user) {
      throw new Error("Failed to create user. Please try again."); // More informative message
    }

    // 3. Create token and set cookie (assuming success at this point)
    const token = createToken(user._id);
    cookies().set("session", token, { httpOnly: true });

    return { status: "success", message: "Account created successfully." };
  } catch (err) {
    console.error("Error during user sign-up:", err); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred during registration. Please try again.",
    };
  }
}
export const userForgotPassword = async (formData: FormData) => {
  /**
   * Handles the forgot password request by validating form data,
   * generating a reset token, updating the user in the database, and sending
   * a password reset email with the token.
   *
   * @param formData {FormData} The user-submitted form data containing email.
   * @returns {Promise<{ status: string, message: string }>} An object indicating success
   *   or failure with a corresponding message.
   * @throws {Error} If form data is invalid, user not found, or email sending fails.
   */

  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formForgotPasswordSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid email address. Please try again."); // More specific message
    }

    const email = String(parsed.data.email);

    // 2. Generate reset token and update user
    const passwordResetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashResetToken(passwordResetToken);

    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetToken: hashedToken }
    );

    if (!user) {
      throw new Error(
        "The email address you entered was not found. Please check and try again."
      ); // More informative message
    }

    // 3. Send email with reset token
    const message = `Forgot your password? Go to: ${WEB_PASSWORD_RESET_URL}/${passwordResetToken} to reset it.`; // Simpler and clearer message

    await sendEmail({
      toEmail: email,
      subject: "Your Password Reset Token", // Consistent capitalization
      message,
    });

    return { status: "success", message: "Email sent!" };
  } catch (err) {
    console.error("Error during forgot password request:", err); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred. Please try again later.",
    };
  }
};

export const userResetPassword = async (formData: FormData) => {
  /**
   * Resets the password for a user by validating form data,
   * verifying the reset token, checking the old password,
   * updating the user's password in the database, and saving the changes.
   *
   * @param formData {FormData} The user-submitted form data containing token, old password, and new password.
   * @returns {Promise<{ status: string, message: string }>} An object indicating success
   *   or failure with a corresponding message.
   * @throws {Error} If form data is invalid, user not found, token is invalid,
   *   old password doesn't match, or password saving fails.
   */

  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formResetPasswordSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(
        "Invalid form data. Please check the fields and try again."
      ); // More specific message
    }

    // 2. Verify reset token and user
    const hashedToken = hashResetToken(String(data.token));
    const user = await User.findOne({ passwordResetToken: hashedToken }).select(
      "+password"
    );

    if (!user) {
      throw new Error(
        "Invalid or expired password reset token. Please request a new one."
      ); // More informative message
    }

    // 3. Check old password
    if (!(await correctPassword(parsed.data.oldPassword, user.password))) {
      throw new Error("Old password is incorrect. Please try again."); // More specific message
    }

    // 4. Update password and save user
    const hashedPassword = await hashAndSalt(parsed.data.password);
    user.password = hashedPassword;
    user.passwordResetToken = undefined; // Clear reset token after successful reset
    await user.save();

    return { status: "success", message: "Password reset successfully." };
  } catch (err) {
    console.error("Error during password reset:", err); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message:
        "An error occurred during password reset. Please try again later.",
    };
  }
};

export async function userSignOut() {
  cookies().set("session", "");
  redirect("/login");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
///////////////////////// auth end ////////////////////////////////////////
