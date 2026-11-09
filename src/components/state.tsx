import Icon from "@mdi/react";
import { mdiInboxOutline, mdiLoading } from "@mdi/js";

interface EmptyStateProps {
  title?: string;
  description?: string;
  /** Smaller padding, for sections inside a page (home page sliders, menus). */
  compact?: boolean;
  /** An mdi icon path. */
  icon?: string;
  className?: string;
  children?: React.ReactNode;
}

export const EmptyState = ({
  title = "Belum ada data",
  description = "Data akan segera tersedia. Silakan kembali lagi nanti.",
  compact = false,
  icon = mdiInboxOutline,
  className = "",
  children,
}: EmptyStateProps) => (
  <div
    role="status"
    className={`col-span-full flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray/40 bg-gray/5 px-6 text-center ${compact ? "py-10" : "py-16 min-h-72"} ${className}`}
  >
    <span className="flex items-center justify-center rounded-full size-16 bg-primary/10 text-primary">
      <Icon path={icon} size={1.8} />
    </span>
    <h3 className="text-lg font-semibold sm:text-xl text-dark">{title}</h3>
    <p className="max-w-md text-sm sm:text-base text-gray">{description}</p>
    {children}
  </div>
);

export const LoadingState = ({
  label = "Memuat data...",
  compact = false,
  className = "",
}: {
  label?: string;
  compact?: boolean;
  className?: string;
}) => (
  <div
    role="status"
    aria-live="polite"
    className={`col-span-full flex w-full flex-col items-center justify-center gap-3 text-gray ${compact ? "py-10" : "py-16 min-h-72"} ${className}`}
  >
    <Icon path={mdiLoading} size={1.8} className="animate-spin text-primary" />
    <span className="text-sm sm:text-base">{label}</span>
  </div>
);
