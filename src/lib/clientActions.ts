import { useMutation } from "@tanstack/react-query";
import { createUserByEmailAndHash } from "./data-servise";

export const useSignUp = () => {
  const { mutate: signingUp } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      createUserByEmailAndHash(email, password),
  });

  return signingUp;
};
