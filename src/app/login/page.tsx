import GoogleSignIn from "./GoogleSignIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpFrom";

export default function Loginpage() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <Tabs defaultValue="signIn" className="w-[90%] py-4 mb-4 border-b">
        <TabsList>
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpForm />
        </TabsContent>
      </Tabs>
      <GoogleSignIn />
    </div>
  );
}
