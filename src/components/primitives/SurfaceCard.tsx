import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type SurfaceCardProps = ComponentPropsWithoutRef<"div">;

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(function SurfaceCard(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx("card-surface", className)} {...props}>
      {children}
    </div>
  );
});
