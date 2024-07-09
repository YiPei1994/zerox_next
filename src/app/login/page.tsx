import GoogleSignIn from "./GoogleSignIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
import { HiArrowSmallRight } from "react-icons/hi2";
import TestCret from "./TestCret";

export default function Loginpage() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <Tabs
        defaultValue="signIn"
        className="w-full py-4 mb-4 border-t border-b "
      >
        <TabsList>
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInForm />
          <TestCret />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpForm />
        </TabsContent>
      </Tabs>
      <div className=" mx-auto flex flex-col gap-4">
        <Link
          className="flex gap-4 items-center text-primary"
          href="/login/forgotPassword"
        >
          <span> Forgot password? Lets reset it.</span>
          <HiArrowSmallRight />
        </Link>
        <GoogleSignIn />
      </div>
    </div>
  );
}
