"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Background decoration */}
      <div className="bg-primary/5 absolute top-0 -z-10 aspect-square w-full max-w-7xl rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute -right-20 top-40 -z-10 aspect-square w-full max-w-3xl rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="bg-primary h-2 w-2 rounded-full animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary/80">
            Welcome to Your Reading Sanctuary
          </span>
          <ChevronRight className="h-3 w-3 text-primary/40" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-5xl leading-tight font-normal tracking-tight md:text-7xl lg:text-8xl"
        >
          Your Digital <span className="italic text-primary/70">Sanctuary</span>{" "}
          for Reading.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl"
        >
          Track your progress, organize your collection, and rediscover the joy of
          reading with lib4me. A beautifully curated space for every book in
          your life.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="h-12 border-b-4 border-primary/80 px-8 text-base shadow-xl transition-all hover:translate-y-[-2px] hover:shadow-2xl active:translate-y-[2px]" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base transition-all hover:bg-secondary/50" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mt-20 perspective-1000"
        >
          <div className="border-border/40 relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-3xl lg:translate-z-10 lg:rotate-x-1 lg:rotate-y-1">
            <Image
              src="/public/hero-illustration.png"
              alt="Digital Library Sanctuary"
              width={1200}
              height={675}
              priority
              className="w-full object-cover"
            />
          </div>
          {/* Decorative frames */}
          <div className="bg-primary/20 absolute -top-10 -left-10 -z-10 h-64 w-64 rounded-full blur-3xl opacity-50" />
          <div className="bg-secondary/30 absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full blur-3xl opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
