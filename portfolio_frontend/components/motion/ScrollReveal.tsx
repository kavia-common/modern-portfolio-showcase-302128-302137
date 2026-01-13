"use client";

import { motion, type MotionProps, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Props = MotionProps & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// PUBLIC_INTERFACE
export default function ScrollReveal({ children, className, delay = 0, ...rest }: Props) {
  /** Reusable viewport-triggered reveal animation wrapper. */
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={clsx(className)}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={reduce ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
