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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LogRunPopup() {
  const [open, setOpen] = useState(false);
  const [miles, setMiles] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // If you just want to send text or numeric fields, you can do JSON
      // (Assuming the image is handled elsewhere or as a URL/base64)
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          miles,
          totalTime,
          // If you plan to store the image as base64 or a URL, handle that here.
          // For example, if you want to do a quick base64 convert (not recommended for large images):
          // image: image ? await fileToBase64(image) : null,
        }),
      });

      if (!response.ok) {
        // Handle error responses
        const errorData = await response.json();
        console.error('Error creating record:', errorData.error);
        return;
      }

      // Success
      const data = await response.json();
      console.log('Record created successfully:', data);

      // Close popup & reset fields
      setOpen(false);
      setMiles('');
      setTotalTime('');
      setImage(null);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  // For selecting the image file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button to Open the Popup */}
      <DialogTrigger asChild>
        <Button className='mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded'>
          Enter Daily Input
        </Button>
      </DialogTrigger>

      {/* Popup Content */}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Log Your Emissions</DialogTitle>
          <DialogDescription>
            Fill in the details of your car trip today below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='space-y-4 py-4'>
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

          <DialogFooter>
            <Button variant='outline' type='button' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
