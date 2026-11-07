import { MotionProps } from "framer-motion";

export interface MotionComponentProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  tag: keyof React.JSX.IntrinsicElements;
  initialY?: number;
  animateY?: number;
  initialX?: number;
  animateX?: number;
  duration?: number;
  delay?: number;
}
