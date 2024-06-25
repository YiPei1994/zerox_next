"use client";

import ImageWrapper from "@/components/ImageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { userUpdateData } from "@/lib/actions/user";
import { formUserDataSchema } from "@/lib/zodSchema";
import { UserClient } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MdOutlineEdit } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import UserDeleteAccountForm from "./UserDeleteAccountForm";

type UserProfileFormProps = {
  user: UserClient;
  avatars: string[];
};

export default function UserProfileForm({
  user,
  avatars,
}: UserProfileFormProps) {
  const { toast } = useToast();

  const { email, name, icon, role } = user;

  const [userIcon, setUserIcon] = useState(icon || "/avatars/Avatar01.svg");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formUserDataSchema>>({
    resolver: zodResolver(formUserDataSchema),
    defaultValues: {
      email,
      name: name || "",
      icon: userIcon,
    },
  });

  async function onSubmit(values: z.infer<typeof formUserDataSchema>) {
    // ✅ This will be type-safe and validated.

    const data = new FormData();
    data.append("email", values.email);
    data.append("name", values.name);
    data.append("icon", userIcon);

    const { status, message } = await userUpdateData(data);

    toast({
      title: status,
      description: message,
    });
  }

  return (
    <>
      <div className="mb-4 mr-4 flex flex-col gap-2 justify-center items-center">
        <Badge>{role}</Badge>
        <ImageWrapper
          name="user icon"
          className="w-1/4 h-auto mx-auto rounded-full my-4"
          imagePath={userIcon ? userIcon : ""}
        />
        <Popover>
          <PopoverTrigger>
            Change <MdOutlineEdit className="inline " />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setUserIcon(`/avatars/${avatar}`)}
                >
                  <Image
                    width={48}
                    height={48}
                    src={`/avatars/${avatar}`}
                    alt="avatars"
                  />
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting || form.formState.isSubmitSuccessful
            }
          >
            {form.formState.isSubmitSuccessful ? "Success" : "Save"}{" "}
          </Button>
        </form>
      </Form>

      <Separator className="my-6" />
      <UserDeleteAccountForm />
    </>
  );
}
