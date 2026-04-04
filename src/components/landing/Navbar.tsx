"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6"
    >
      <nav className="bg-background/60 border-border/40 flex w-full max-w-5xl items-center justify-between rounded-2xl border px-6 py-3 shadow-lg backdrop-blur-xl">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          lib<span className="text-primary/60">4</span>me
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary/60"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium transition-colors hover:text-primary/60"
          >
            About
          </Link>
          <Link
            href="#community"
            className="text-sm font-medium transition-colors hover:text-primary/60"
          >
            Community
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="cursor-pointer">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="cursor-pointer">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
