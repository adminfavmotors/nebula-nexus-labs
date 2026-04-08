import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type SurfaceCardProps = ComponentPropsWithoutRef<"div"> & {
  spotlight?: boolean;
  variant?: "default" | "editorial" | "showcase" | "deep" | "summary";
};

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(function SurfaceCard(
  { className, children, spotlight = false, variant = "default", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        "card-surface",
        variant !== "default" && `card-surface-${variant}`,
        spotlight && "card-surface-spotlight",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
