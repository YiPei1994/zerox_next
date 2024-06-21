"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userForgotPassword } from "@/lib/actions";
import { formForgotPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formForgotPasswordSchema>>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formForgotPasswordSchema>) {
    // ✅ This will be type-safe and validated.

    const data = new FormData();
    data.append("email", values.email);

    await userForgotPassword(data);
  }

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Please provide your email so we can send reset token.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
