"use client";

import React from "react";
import Head from "next/head";
import { GoogleGenerativeAI } from "@google/generative-ai";
// Replace with your actual shadcn Button component
import { Button } from "@/components/ui/button";

// Placeholder image paths — replace with your actual URLs or /public paths
const IMAGE_PATH_1 = "/images/pic1.jpg";
const IMAGE_PATH_2 = "/images/pic2.jpg";

export default function Home() {
  const [aiResponse, setAiResponse] = React.useState("");

  // Handle button press to invoke Generative AI
  async function handleButtonPress() {
    try {
      // Initialize your GoogleGenerativeAI client
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // Get the model
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

      // Fetch images as arrayBuffers
      const imageResp1 = await fetch(IMAGE_PATH_1).then((res) => res.arrayBuffer());
      const imageResp2 = await fetch(IMAGE_PATH_2).then((res) => res.arrayBuffer());

      // Generate content
      const result = await model.generateContent([
        {
          inlineData: {
            data: Buffer.from(imageResp1).toString("base64"),
            mimeType: "image/jpeg",
          },
        },
        {
          inlineData: {
            data: Buffer.from(imageResp2).toString("base64"),
            mimeType: "image/jpeg",
          },
        },
        "Generate a list of all the objects contained in both images.",
      ]);

      // Assuming .text() returns the content string
      const textOutput = result.response.text();

      console.log("AI Response:", textOutput);
      setAiResponse(textOutput);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiResponse("Error generating AI content. Check console for details.");
    }
  }

  return (
    <>
      <Head>
        <title>CO2 Tracker</title>
        <meta name="description" content="Track your CO2 emissions easily." />
      </Head>

      <div className="flex flex-col min-h-screen bg-white">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-green-600 px-4 py-4 shadow-md">
          <h1 className="text-xl font-bold text-white">CO2 Tracker</h1>
        </header>

        {/* Main content */}
        <main className="flex-grow px-4 py-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Select a Day to Log Your Emissions
          </h2>

          {/* 
            Insert your calendar component here, e.g., 
            <Calendar /> 
            if you have one from shadcn or any other library 
          */}
          <div className="rounded-md border p-4 mb-6">
            <p className="text-gray-600">[Calendar Component Placeholder]</p>
          </div>

          {/* Button that triggers the AI call */}
          <div className="flex flex-col items-center">
            <Button variant="default" className="w-full sm:w-auto" onClick={handleButtonPress}>
              Call Generative AI
            </Button>

            {aiResponse && (
              <div className="mt-4 w-full max-w-md p-2 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">AI Response:</h3>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </main>

        {/* Optional Footer */}
        <footer className="mt-auto py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CO2 Tracker App</p>
        </footer>
      </div>
    </>
  );
}
