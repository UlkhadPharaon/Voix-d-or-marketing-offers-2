"use client";
import React from "react";
import { Radar, IconContainer } from "./radar-effect";
import { Target, Search, BarChart, ShoppingCart, UserCheck, MessageSquare, Bot, Plus } from "lucide-react";

export function EcosystemRadar() {
  return (
    <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-[8px] bg-foreground/[0.03] backdrop-blur-md border border-foreground/10 shadow-[0_8px_32px_rgba(212,175,55,0.05)] mt-12 mb-20 py-10">
      <div className="z-50 text-center px-4 mb-4 md:mb-8">
        <h3 className="text-[18px] sm:text-[22px] font-heading uppercase tracking-[1px] text-foreground">Le Radar de L'Employé Virtuel</h3>
        <p className="text-[14px] text-muted-foreground mt-2 max-w-2xl mx-auto">Une surveillance continue à 360° de votre écosystème commercial.</p>
      </div>

      <div className="mx-auto w-full max-w-3xl px-2 md:px-4 z-50">
        <div className="flex w-full items-center justify-center space-x-4 sm:space-x-10 md:justify-between md:space-x-0">
          <IconContainer text="Acquisition" icon={<Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />} delay={0.2} />
          <IconContainer
            text="Prospection"
            delay={0.4}
            icon={<Search className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
          />
          <IconContainer
            text="Vente Web"
            icon={<ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            delay={0.8}
          />
        </div>
      </div>
      
      <div className="mx-auto my-8 md:my-12 w-full max-w-md px-2 md:px-4 relative z-50">
        <div className="flex w-full items-center justify-center space-x-4 sm:space-x-10 md:justify-between md:space-x-0">
          <IconContainer
            text="Support WA"
            delay={0.5}
            icon={<MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
          />
          
          <div className="relative z-50 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-primary/50 bg-card/90 dark:bg-foreground/10 backdrop-blur-xl shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 opacity-50" style={{ animationDuration: '3s' }}></div>
            <Bot className="h-8 w-8 md:h-10 md:w-10 text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          </div>

          <IconContainer
            text="Analyse Data"
            icon={<BarChart className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            delay={0.8}
          />
        </div>
      </div>
      
      <div className="mx-auto w-full max-w-3xl px-2 md:px-4">
        <div className="flex w-full items-center justify-center space-x-4 sm:space-x-10 md:justify-between md:space-x-0">
          <IconContainer
            text="Qualification"
            delay={0.6}
            icon={<UserCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
          />
          <IconContainer
            text="Création"
            icon={<Plus className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            delay={0.7}
          />
        </div>
      </div>

      {/* Radar Centered */}
      <Radar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 opacity-80" />
      <div className="absolute bottom-0 z-[41] h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}
