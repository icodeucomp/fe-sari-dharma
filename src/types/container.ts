import { HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.JSX.Element | React.JSX.Element[];
}
