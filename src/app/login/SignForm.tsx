import { signInFormAction } from "@/lib/actions";
import { cookies } from "next/headers";

export default function SignForm() {
  const csrfToken = cookies().get("authjs.csrf-token")?.value ?? "";
  return (
    <form action={signInFormAction}>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label className="input input-bordered flex items-center gap-2">
        Email
        <input
          type="email"
          name="email"
          className="grow"
          placeholder="daisy@site.com"
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Password
        <input type="password" name="password" className="grow" />
      </label>
      <button className="btn">Log in</button>
    </form>
  );
}
