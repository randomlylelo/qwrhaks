"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Example slides. Replace with real data or props:
const sampleSlides = [
  {
    title: "Your Carbon Overview",
    description: "You traveled 250 miles this month, emitting ~50kg of CO2.",
    imageUrl: "/images/footprint.png",
  },
  {
    title: "Most Frequent Trip",
    description: "Your daily commute was repeated 20 times this month!",
    imageUrl: "/images/commute.png",
  },
  {
    title: "Longest Trip",
    description: "A 150-mile road trip on the 15th contributed ~30kg of CO2.",
    imageUrl: "/images/roadtrip.png",
  },
  {
    title: "Keep It Up!",
    description: "You've saved 10% more CO2 than last month by carpooling.",
    imageUrl: "/images/savings.png",
  },
];

export default function EmissionsWrappedPopup() {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle arrow keys
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, currentSlide]);

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % sampleSlides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) =>
      prev === 0 ? sampleSlides.length - 1 : prev - 1
    );
  }

  function handleClose() {
    setOpen(false);
    setCurrentSlide(0);
  }

  const slide = sampleSlides[currentSlide];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button to open popup */}
      <DialogTrigger asChild>
        <Button className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded">
          View Your Emissions Wrapped
        </Button>
      </DialogTrigger>

      {/* Responsive dialog content */}
      <DialogContent className="w-full max-w-full sm:max-w-lg p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{slide.title}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {slide.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-4 mt-4">
          {/* Responsive image size */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />

          {/* Buttons: stack on mobile, side-by-side on larger screens */}
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
            <Button variant="outline" onClick={prevSlide} className="w-full sm:w-auto">
              ← Previous
            </Button>
            <Button variant="outline" onClick={nextSlide} className="w-full sm:w-auto">
              Next →
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
