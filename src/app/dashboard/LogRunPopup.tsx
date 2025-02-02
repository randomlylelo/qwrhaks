// LogRunPopup.tsx
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'; // Adjust the import paths as needed
import { Input } from '@/components/ui/input'; // Adjust the import paths as needed
import { Button } from '@/components/ui/button'; // Adjust the import paths as needed

export default function LogRunPopup() {
  const [open, setOpen] = useState(false);
  const [miles, setMiles] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Process the form data (replace this with your actual processing logic)
    console.log('Number of Miles:', miles);
    console.log('Total Time:', totalTime);
    console.log('Image File:', image);

    // Reset the form or perform any additional processing

    // Close the popup after submission
    setOpen(false);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button to Open the Popup */}
      <DialogTrigger asChild>
        <Button
          className='mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded'
        >
          Enter Daily Input
        </Button>
      </DialogTrigger>

      {/* Popup Content */}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Log Your Run</DialogTitle>
          <DialogDescription>
            Fill in the details of your run below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4 py-4'>
            {/* Number of Miles Input */}
            <div>
              <label
                htmlFor='miles'
                className='block text-sm font-medium text-gray-700'
              >
                Number of Miles
              </label>
              <Input
                id='miles'
                type='number'
                step='any'
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                placeholder='Enter miles'
                className='mt-1 block w-full'
              />
            </div>

            {/* Total Time Input */}
            <div>
              <label
                htmlFor='totalTime'
                className='block text-sm font-medium text-gray-700'
              >
                Total Time
              </label>
              <Input
                id='totalTime'
                type='text'
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
                placeholder='e.g., 45:30'
                className='mt-1 block w-full'
              />
            </div>

            {/* Image Upload Input */}
            <div>
              <label
                htmlFor='image'
                className='block text-sm font-medium text-gray-700'
              >
                Upload Image
              </label>
              <Input
                id='image'
                type='file'
                onChange={handleImageChange}
                className='mt-1 block w-full'
              />
            </div>
          </div>

          {/* Cancel and Submit Buttons */}
          <DialogFooter>
            <Button
              variant='outline'
              type='button'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
