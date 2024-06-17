import { cn } from "@/lib/utils";
import Image from "next/image";

type ImageWrapperProps = {
  name: string;
  imagePath: string;
  className?: string;
  imageClassName?: string;
};

export default function ImageWrapper({
  name,
  imagePath,
  className,
  imageClassName,
}: ImageWrapperProps) {
  return (
    <div
      className={cn(`w-full overflow-hidden relative aspect-square`, className)}
    >
      <Image
        fill
        src={imagePath}
        alt={name}
        className={cn(`object-cover object-center`, imageClassName)}
      />
    </div>
  );
}
