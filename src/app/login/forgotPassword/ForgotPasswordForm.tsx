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
import { useToast } from "@/components/ui/use-toast";
import { userForgotPassword } from "@/lib/actions/auth";

import { formForgotPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const { toast } = useToast();

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

    const { status, message } = await userForgotPassword(data);

    toast({
      title: status,
      description: message,
    });
  }

  return (
    <div>
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
                  {form.formState.isSubmitSuccessful
                    ? "Submit successful, please check your email."
                    : "Please provide your email so we can send reset token."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={
              form.formState.isSubmitting || form.formState.isSubmitSuccessful
            }
            type="submit"
          >
            {form.formState.isSubmitSuccessful ? "Success" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
