import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/40 border-t bg-muted/50 p-20 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-24">
          <div className="col-span-2">
            <Link href="/" className="font-serif text-3xl font-bold tracking-tight">
              lib<span className="text-primary/60">4</span>me
            </Link>
            <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-muted-foreground">
              A premium, minimalist book tracking application designed for readers 
              who value simplicity and aesthetics. Your sanctuary for tracking, 
              organizing, and discovering your next favorite book.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg font-normal">Platform</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-medium text-muted-foreground transition-all">
              <li><Link href="/dashboard" className="hover:text-primary">My Library</Link></li>
              <li><Link href="#" className="hover:text-primary">Book Search</Link></li>
              <li><Link href="#" className="hover:text-primary">Reading Stats</Link></li>
              <li><Link href="#" className="hover:text-primary">Public Profiles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-normal">Legal</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} lib4me. All rights reserved. 
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary">English (US)</Link>
            <Link href="#" className="hover:text-primary">RSS Feed</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
