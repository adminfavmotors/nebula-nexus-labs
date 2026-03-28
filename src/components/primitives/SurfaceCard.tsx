import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type PointerEventHandler,
} from "react";
import { cx } from "@/lib/cx";

type SurfaceCardProps = ComponentPropsWithoutRef<"div"> & {
  spotlight?: boolean;
};

export const SurfaceCard = forwardRef<HTMLDivElement, SurfaceCardProps>(function SurfaceCard(
  { className, children, spotlight = false, onPointerMove, onPointerLeave, ...props },
  ref,
) {
  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (spotlight && event.pointerType !== "touch") {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
      event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
      event.currentTarget.style.setProperty("--spotlight-opacity", "1");
    }

    onPointerMove?.(event);
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    if (spotlight) {
      event.currentTarget.style.setProperty("--spotlight-opacity", "0");
    }

    onPointerLeave?.(event);
  };

  return (
    <div
      ref={ref}
      className={cx("card-surface", spotlight && "card-surface-spotlight", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </div>
  );
});
