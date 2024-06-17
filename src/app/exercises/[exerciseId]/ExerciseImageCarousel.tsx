"use client";
import ImageWrapper from "@/components/ImageWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

type ExerciseImageCarouselProps = {
  name: string;
};

export default function ExerciseImageCarousel({
  name,
}: ExerciseImageCarouselProps) {
  const imagePath1 = `/exercises/${name
    .replaceAll(" ", "_")
    .replaceAll("/", "_")}/images/1.jpg`;
  const imagePath2 = `/exercises/${name
    .replaceAll(" ", "_")
    .replaceAll("/", "_")}/images/0.jpg`;

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        <CarouselItem>
          <ImageWrapper
            name={name}
            imagePath={imagePath1}
            className="h-fit max-h-[30vh]"
          />
        </CarouselItem>

        <CarouselItem>
          <ImageWrapper
            name={name}
            imagePath={imagePath2}
            className="h-fit max-h-[30vh]"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
