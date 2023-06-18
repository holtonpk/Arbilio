"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { Icons } from "@/components/icons";
import { useAuth } from "@/context/user-auth";
import KeyFeatures from "@/app/(dashboard)/dashboard/key-features";
import { siteConfig } from "@/config/site";
import Confetti from "react-dom-confetti";
import { useUserData } from "@/context/user-data";
import { ScrollArea } from "@/components/ui/scroll-area";

const Welcome = () => {
  const { currentUser } = useAuth()!;
  const { completeWelcomeIntro } = useUserData()!;

  const [showWelcomeCard, setShowWelcomeCard] = React.useState(
    // !currentUser?.welcome_intro
    true
  );

  if (!showWelcomeCard) return null;

  const closeWelcomeCard = () => {
    setShowWelcomeCard(false);
    completeWelcomeIntro();
  };

  return <WelcomeCard closeWelcomeCard={closeWelcomeCard} />;
};

export default Welcome;

const WelcomeCard = ({
  closeWelcomeCard,
}: {
  closeWelcomeCard: () => void;
}) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  useLockBody();

  setTimeout(() => {
    setShowConfetti(true);
  }, 500);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        onClick={closeWelcomeCard}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />
      <div className="fixed z-50  flex flex-col w-[80vw]  h-[80vh] md:h-[80vh]  scale-100  border bg-background opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 ">
        <div className="w-full flex justify-between border-b h-fit p-4 items-center ">
          <h3 className=" text-sm md:text-lg font-semibold leading-none tracking-tight">
            Getting started
          </h3>

          <Button onClick={closeWelcomeCard} variant="ghost">
            <Icons.close className="h-4 w-4 md:w-6 md:h-6" />
          </Button>
        </div>

        <div className="flex flex-col space-y-1.5 border-b pb-2 md:pb-6 p-4">
          <span className="text-3xl whitespace-nowrap md:text-5xl font-semibold leading-none tracking-tight relative flex flex-col items-center md:flex-row flex-wrap">
            Welcome to{" "}
            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#F66896] to-[#7640DF] flex items-center ">
              {siteConfig.name}
              <span className="ml-1 relative flex text-primary">
                🎉
                <div className="relative ">
                  <Confetti
                    active={showConfetti}
                    config={{ elementCount: 200, spread: 200 }}
                  />
                </div>
              </span>
            </span>
          </span>
          <h3 className="text-sm md:text-base text-muted-foreground text-center md:text-left">
            Let&apos;s start accelerating your e-commerce journey
          </h3>
        </div>
        <h1 className="text-base md:text-xl font-bold mb-2 pl-4 mt-2">
          Where to start?
        </h1>
        <ScrollArea className=" flex-grow relative overflow-scroll p-4 pt-0">
          <KeyFeatures />
        </ScrollArea>
      </div>
    </div>
  );
};
