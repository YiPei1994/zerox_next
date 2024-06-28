"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "./ui/button";

export default function NavBack() {
  const router = useRouter();
  return (
    <Button className="mb-2" onClick={() => router.back()}>
      <IoArrowBack />
      <span>Back</span>
    </Button>
  );
}
