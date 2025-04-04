import Link from "next/link";
import { FaMusic } from "react-icons/fa";


export default function Footer(){
    return(
        <footer className="w-full border-t border-slate-700 bg-gradient-to-b from-slate-900 text-slate-400  to-slate-800 py-12">
        <div className="container w-11/12 sm:w-4/5 md:2/3 px-4 py-2 mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className='text-2xl text-sky-300 font-bold'><FaMusic className='inline h-7 w-7 mr-3'/>Beatocracy</div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Music streams powered by listeners. <br />
              Where every vote shapes the sound.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-foreground">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-foreground">
                  Create Stream
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Subscribe</h3>
            <p className="text-sm text-muted-foreground">Stay updated with the latest features and releases.</p>
            <div className="flex gap-2">
              <input placeholder="Enter your email" className="h-10 bg-slate-700 px-1 rounded-md" />
              <button
                
                className="h-10 bg-slate-900 hover:bg-slate-800 px-2 rounded-md border-2 border-slate-600"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 Beatocracy. All rights reserved - AKY</p>
          </div>
        </div>
      </footer>
    )
}