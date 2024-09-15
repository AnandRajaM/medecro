import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconHome } from "@tabler/icons-react";
import { cn } from "../lib/utils";
import GradientBackground from "./gradientbg2";
import { useNavigate } from "react-router-dom";

const FloatingNav = ({ className }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-5 left-5 border border-transparent dark:border-white/[0.2] rounded-full bg-color1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] p-3 items-center justify-center",
          className
        )}
      >
        <motion.div
          className="relative flex items-center justify-center text-black cursor-pointer"
          whileHover={{
            scale: 1.1,
            color: "#ffd687",
            transition: { duration: 0.3 },
          }}
        >
          <IconHome className="h-7 w-7" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  isVisible,
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {Array.from({ length: numCircles }, (_, i) => {
            const size = mainCircleSize + i * 70;
            const opacity = mainCircleOpacity - i * 0.03;
            const animationDelay = `${i * 0.06}s`;
            const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
            const borderOpacity = 5 + i * 5;

            return (
              <div
                key={i}
                className={`absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border [--i:${i}]`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animationDelay,
                  borderStyle,
                  borderWidth: "1px",
                  borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1)",
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState(null); // Store the audio URL here
  const [navigateTo, setNavigateTo] = useState(""); // Store the navigation path

  const navigate = useNavigate(); // useNavigate from react-router-dom

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo); // Navigate to the path returned from the backend
    }
  }, [navigateTo, navigate]);

  const handleListen = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
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

    recognition.onresult = async (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);

      try {
        // Fetching from the Flask backend running on 127.0.0.1:5000
        const response = await fetch(
          "http://127.0.0.1:5000/handle-voice-command",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ command: speechResult }),
          }
        );

        const data = await response.json();

        // Set the audio URL and navigation path
        if (data.audio_url) {
          setAudioUrl(`http://127.0.0.1:5000${data.audio_url}`); // Ensure correct URL path
        }
        if (data.navigate_to) {
          setNavigateTo(data.navigate_to); // Navigate to the correct path
        }
      } catch (error) {
        console.error("Error handling voice command:", error);
      }
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
    <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      <GradientBackground />

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Ripple isVisible={isListening} />

        <FloatingNav />

        <div className="h-screen w-full relative flex flex-col items-center justify-center antialiased">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className={cn(
                "relative w-96 h-96 p-[4px] group",
                isListening ? "animate-pulse" : ""
              )}
              onClick={handleListen}
            >
              {/* Static white circle with a smaller size */}
              <div
                className="absolute inset-0 z-10 rounded-full bg-white"
                style={{
                  width: "85%",
                  height: "85%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Gradient background with a larger size */}
              <motion.div
                initial={isListening ? "initial" : undefined}
                animate={isListening ? "animate" : undefined}
                transition={
                  isListening
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
                  width: "87%", // Make the gradient larger than the white circle
                  height: "87%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute inset-0 z-[9] rounded-full will-change-transform bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
              />

              <div className="relative z-20 flex items-center justify-center w-full h-full">
                <p className="text-black font-serif text-center">
                  {isListening ? "Listening..." : "Click to Speak"}
                </p>
              </div>
            </div>
          </div>

          {transcript && (
            <p className="text-lg text-black mt-5">You said: "{transcript}"</p>
          )}

          {/* Play the audio if the audio URL is available */}
          {audioUrl && (
            <div className="mt-5">
              <audio controls src={audioUrl} autoPlay />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VoiceInteraction;
