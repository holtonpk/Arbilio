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
      <div className="fixed z-50 flex flex-col w-[80vw] h-[80vh] scale-100 gap-4 border bg-background opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 ">
        <div className="w-full flex justify-between border-b h-fit p-4 items-center ">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Getting started
          </h3>

          <Button onClick={closeWelcomeCard} variant="ghost">
            <Icons.close className="w-6 h-6" />
          </Button>
        </div>
        <div className="container flex flex-col gap-10 ">
          <div className="flex flex-col space-y-1.5 border-b pb-6">
            <h1 className="text-5xl font-semibold leading-none tracking-tight relative flex">
              Welcome to{" "}
              <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#F66896] to-[#7640DF]">
                {siteConfig.name}
              </span>{" "}
              <span className="ml-1 relative flex">
                🎉
                <div className="relative ">
                  <Confetti
                    active={showConfetti}
                    config={{ elementCount: 200, spread: 200 }}
                  />
                </div>
              </span>
            </h1>
            <h3 className="text-base text-muted-foreground">
              Let&apos;s start accelerating your e-commerce journey
            </h3>
          </div>
          <KeyFeatures />
        </div>
      </div>
    </div>
  );
};
