import GoogleSignIn from "./GoogleSignIn";
import SignForm from "./SignForm";

export default function Loginpage() {
  return (
    <>
      <SignForm />
      <div className="divider"></div>
      <GoogleSignIn />
    </>
  );
}
