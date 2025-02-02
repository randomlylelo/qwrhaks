"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LogRunPopupProps {
  onEntryCreated?: () => void; // Parent callback
}

export default function LogRunPopup({ onEntryCreated }: LogRunPopupProps) {
  const [open, setOpen] = useState(false);
  const [miles, setMiles] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // For demonstration, we're just sending the current date/time.
      // If you'd like the user to pick a date, store that in state and pass it here.
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          miles: Number(miles),
          totalTime,
          date: new Date().toISOString(), // or user-chosen date
          // If you want to convert the image to base64, do that here
          // image: image ? await fileToBase64(image) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating record:", errorData.error);
        return;
      }

      const data = await response.json();
      console.log("Record created successfully:", data);

      // Trigger parent callback to refetch entries, if provided
      if (onEntryCreated) {
        onEntryCreated();
      }

      // Close popup & reset
      setOpen(false);
      setMiles("");
      setTotalTime("");
      setImage(null);
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded">
          Enter Daily Input
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Your Emissions</DialogTitle>
          <DialogDescription>Fill in the details of your trip below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="miles" className="block text-sm font-medium text-gray-700">
                Number of Miles
              </label>
              <Input
                id="miles"
                type="number"
                step="any"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                placeholder="Enter miles"
                className="mt-1 block w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="totalTime" className="block text-sm font-medium text-gray-700">
                Total Time
              </label>
              <Input
                id="totalTime"
                type="text"
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
                placeholder="e.g., 45:30"
                className="mt-1 block w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Upload Image (optional)
              </label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
