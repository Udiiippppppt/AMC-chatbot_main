"use client";

import React, { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User} from 'lucide-react';
import Image from "next/image";

export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }));

  // Update the date every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    console.log("📤 Sending message:", input); // Debugging log

    try {
      handleSubmit(e);
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top navigation bar */}
      <div className="bg-[#1a3a68] text-white px-7 py-2 flex justify-between items-center text-sm">
        <div className="flex space-x-6">
          <a href="https://ahmedabadcity.gov.in/Home/" className="hover:underline">HOME</a>
          <a href="https://ahmedabadcity.gov.in/Home/AboutTheCorporation" className="hover:underline">ABOUT US</a>
          <a href="https://ahmedabadcity.gov.in/Feedback/Index" className="hover:underline">FEEDBACK</a>
          <a href="https://ahmedabadcity.gov.in/Home/sitemap" className="hover:underline">SITEMAP</a>
          <a href="http://heritage.ahmedabadcity.gov.in/" className="hover:underline">HERITAGE WEBSITE <span className="bg-green-500 text-xs px-1 rounded">NEW</span></a>
          <a href="https://gujfiresafetycop.in/" className="hover:underline">GUJARAT FIRE SAFETY COMPLIANCE PORTAL <span className="bg-green-500 text-xs px-1 rounded">NEW</span></a>
          <a href="https://ahmedabadcity.gov.in/StaticPage/AMCOfficersTelephoneNumber_Dynamic " className="hover:underline">CONTACT US</a>
          <a href="https://email.gov.in/" className="hover:underline">E-MAIL</a>
        </div>
        <div className="flex items-center">
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Logo and search bar */}
      <div className="bg-white px-4 py-2 flex justify-between items-center border-b">
        <div className="flex items-center">
          <div className="bg-white rounded-full mr-7 absolute">
            <Image 
              src="/img/Amdavad_Municipal_Corporation_logo.png" 
              alt="AMC Logo" 
              width={90} 
              height={90} 
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold ml-24">AMDAVAD MUNICIPAL CORPORATION</h1>
            <p className="text-gray-600 ml-24">અમદાવાદ મ્યુનિસિપલ કોર્પોરેશન</p>
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      <div className="bg-[#1a3a68] text-white px-4 py-3 flex justify-center items-center text-lg text-center">
  <h2 className="text-center">AI Agents for the Ahmedabad Municipal Corporation</h2>
   </div>

      {/* Main content - Chatbot */}
      <div
        className="flex-1 flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: 'url("/img/home-banner.jpg")' }}>
        <Card className="w-full max-w-2xl shadow-xl">
          <CardContent className="p-4">
            <ScrollArea className=" pr-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2 mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role !== "user" && (
                    <Avatar>
                      <AvatarFallback className="bg-[#1a3a68] text-white">
                        <Bot size={24} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <Avatar>
                      <AvatarFallback className="bg-blue-600 text-white">
                        <User size={24} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-[#1a3a68] text-white">
                      <Bot size={24} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-gray-200 text-black">Typing...</div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-[12px]">
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" disabled={isTyping} className="bg-[#1a3a68] hover:bg-blue-800">
                <Send size={18} />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
