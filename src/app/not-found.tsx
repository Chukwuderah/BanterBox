"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BackgroundPattern from "@/components/BackgroundPattern";

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-400 px-4"
      aria-label="404 Page Not Found"
    >
      <BackgroundPattern />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="w-full max-w-xs sm:max-w-md md:max-w-lg mb-8"
        aria-hidden="true"
      >
        <DotLottieReact
          src="https://lottie.host/51fa04bd-205e-4fa7-bb33-1e1eb490cb2a/A88E4Ifq0w.lottie"
          loop
          autoplay
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center"
      >
        Oops! Page Not Found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-xl text-white/90 mb-8 text-center"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        <br />
        Let&apos;s get you back to the banter!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          aria-label="Go back home"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
}
