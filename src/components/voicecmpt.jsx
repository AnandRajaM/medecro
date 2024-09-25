import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

// VoiceContainer Component
const VoiceContainer = ({
  children,
  className,
  containerClassName,
  animate = true,
  onClick,
}) => {
  const gradientVariants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div
      className={cn("relative w-96 h-96 p-[4px] group", containerClassName)}
      onClick={onClick}
    >
      {/* Static gray background */}
      <div
        className={cn(
          "absolute inset-0  z-0 rounded-full",
          "w-full h-full"
        )}
      />

      {/* Pulsing gradient overlay */}
      <motion.div
        variants={animate ? gradientVariants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : undefined
        }
        style={{
          backgroundSize: "400% 400%",
          backgroundPosition: "0 50%",
        }}
        className={cn(
          "absolute inset-0 rounded-full z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      
    </div>
  );
};

// Main Component
const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleListen = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Sorry, your browser does not support the Web Speech API.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="h-screen w-full  relative flex flex-col items-center justify-center antialiased">
      <div className="flex items-center justify-center min-h-screen">
        <VoiceContainer
          className="rounded-full bg-primary cursor-pointer"
          containerClassName={isListening ? "animate-pulse" : ""}
          onClick={handleListen}
        >
          <p className="text-white text-center">
            {isListening ? "Listening..." : "Click to Speak"}
          </p>
        </VoiceContainer>
      </div>

      {transcript && (
        <div className="mt-6 p-4 bg-white text-black shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Transcript:</h2>
          <p className="mt-2 text-lg">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInteraction;
