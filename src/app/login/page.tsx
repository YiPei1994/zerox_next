import GoogleSignIn from "./GoogleSignIn";
import GoogleSignOut from "./GoogleSignOut";
import SignForm from "./SignForm";

export default function Loginpage() {
  return (
    <div className="grid place-items-center">
      <GoogleSignIn />
    </div>
  );
}
