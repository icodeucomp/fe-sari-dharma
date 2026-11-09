"use client";

import { AnimatePresence, motion } from "framer-motion";

import * as React from "react";

import { Container, Pagination, Motion, Button, EmptyState, LoadingState } from "@/components";

import { SliderProps } from "@/types";
import { useRouter } from "next/navigation";

export const Slider = ({
  title,
  description,
  loading,
  children,
  totalPage,
  className,
  parentClassName,
  linkButton = "",
  page,
  setPage,
  emptyTitle,
  emptyDescription,
}: SliderProps) => {
  const router = useRouter();
  const isEmpty = !loading && React.Children.toArray(children).length === 0;
  return (
    <Container className={parentClassName ?? ""}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Motion tag="h4" initialY={-50} animateY={0} duration={0.3} className="heading">
            {title}
          </Motion>
          <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="subheading">
            {description}
          </Motion>
        </div>

        <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="flex gap-4">
          {linkButton && !isEmpty && (
            <Button className="btn-outline" onClick={() => router.push(linkButton)}>
              Lihat Semua
            </Button>
          )}
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>

      {loading ? (
        <LoadingState compact />
      ) : isEmpty ? (
        <EmptyState compact title={emptyTitle} description={emptyDescription} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={className ?? ""}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </Container>
  );
};
