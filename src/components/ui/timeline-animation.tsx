"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children?: React.ReactNode;
  animationNum: number;
  timelineRef?: React.RefObject<Element | null>;
  customVariants?: any;
  className?: string;
  style?: React.CSSProperties;
  as?: any;
  key?: string | number;
}

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as = "div",
  style,
}: TimelineContentProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = timelineRef || localRef;
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const MotionComponent = motion(as);

  return (
    <MotionComponent
      ref={localRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};
