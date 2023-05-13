"use client";
import React from "react";

type HeroHeaderProps = {
  gradient: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

const HeroHeader: React.FC<HeroHeaderProps> = ({
  gradient,
  number,
  title,
  subtitle,
  description,
}) => {
  return (
    <section className="flex flex-col items-center container gap-3">
      <div className="flex items-center flex-col">
        <div className={`h-[200px] w-[1px] bg-gradient-to-t ${gradient}`} />
        <div
          className={`p-2 h-10 w-10 text-xl flex justify-center items-center text-background rounded-full aspect-square ${gradient}`}
        >
          {number}
        </div>
      </div>
      <h1
        className={`bg-clip-text text-transparent font-bold text-3xl ${gradient}`}
      >
        {title}
      </h1>
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-center">
        {subtitle}
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
        {description}
      </p>
    </section>
  );
};

export default HeroHeader;
