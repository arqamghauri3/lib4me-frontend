"use client";

import { motion } from "framer-motion";
import { BookOpen, BarChart3, Cloud, Users, CheckCircle2, Bookmark } from "lucide-react";

const features = [
  {
    title: "Track Reading Progress",
    description: "Monitor your reading journey with beautiful progress bars and detailed page tracking.",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Insightful Statistics",
    description: "Visualize your reading habits through beautifully curated charts and metrics.",
    icon: BarChart3,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Personal Collections",
    description: "Organize your digital library with custom statuses: Reading, Completed, and Want to Read.",
    icon: Bookmark,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Seamless Cloud Sync",
    description: "Access your library from any device, anywhere, anytime. Your books are always with you.",
    icon: Cloud,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Reading Community",
    description: "Join a curated space where your digital sanctuary for reading comes to life.",
    icon: Users,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Verified Metadata",
    description: "Accurate book info powered by OpenLibrary. All your favorite titles, beautifully presented.",
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-20 md:py-32">
      <div className="mb-16 text-center">
        <h2 className="font-serif text-3xl font-normal tracking-tight md:text-5xl">
          Everything You Need to <span className="italic">Elevate</span> Your Reading.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Intuitive, elegant tools designed to cultivate a deeper connection with your personal library.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group hover:bg-muted/50 border-border/40 relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-8 transition-all hover:translate-y-[-4px] hover:shadow-xl"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg}`}>
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="bg-primary/5 absolute -right-4 -bottom-4 h-24 w-24 rounded-full transition-all group-hover:scale-150" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
