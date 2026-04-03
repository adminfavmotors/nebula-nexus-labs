import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionTone = "light" | "deep";

const toneClassMap: Record<SectionTone, string> = {
  light: "section-light",
  deep: "section-deep",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone: SectionTone;
  containerClassName?: string;
  deferRendering?: boolean;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, className, containerClassName, deferRendering = true, children, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cx(
        "section-spacing scroll-mt-28 md:scroll-mt-24",
        deferRendering && "section-render-auto",
        toneClassMap[tone],
        className,
      )}
      {...props}
    >
      <div className={cx("site-shell", containerClassName)}>{children}</div>
    </section>
  );
});

type SectionTitleProps = ComponentPropsWithoutRef<"h2"> & {
  tone: SectionTone;
};

export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(function SectionTitle(
  { tone, className, children, ...props },
  ref,
) {
  return (
    <h2
      ref={ref}
      className={cx("heading-balance", tone === "light" ? "section-title-light" : "section-title-dark", className)}
      {...props}
    >
      {children}
    </h2>
  );
});

type SectionHeaderProps = {
  title: ReactNode;
  tone: SectionTone;
  titleClassName?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  tone,
  titleClassName,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx("mb-12 flex flex-col items-start justify-between gap-6 md:mb-14 sm:flex-row sm:items-center sm:gap-8", className)}>
      <SectionTitle tone={tone} className={titleClassName}>
        {title}
      </SectionTitle>
      {action}
    </div>
  );
}
