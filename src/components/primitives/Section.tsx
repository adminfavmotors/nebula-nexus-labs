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
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, className, containerClassName, children, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cx("section-spacing scroll-mt-28 md:scroll-mt-24", toneClassMap[tone], className)} {...props}>
      <div className={cx("site-shell", containerClassName)}>{children}</div>
    </section>
  );
});

type SectionTitleProps = ComponentPropsWithoutRef<"h2"> & {
  tone: SectionTone;
  revealClassName?: string;
  delay?: string;
};

export function SectionTitle({ tone, className, revealClassName, delay, children, ...props }: SectionTitleProps) {
  return (
    <h2
      className={cx("heading-balance", tone === "light" ? "section-title-light" : "section-title-dark", revealClassName, className)}
      data-delay={delay}
      {...props}
    >
      {children}
    </h2>
  );
}

type SectionHeaderProps = {
  title: ReactNode;
  tone: SectionTone;
  titleClassName?: string;
  titleRevealClassName?: string;
  titleDelay?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  tone,
  titleClassName,
  titleRevealClassName,
  titleDelay,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx("mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 sm:flex-row sm:items-center sm:gap-6", className)}>
      <SectionTitle tone={tone} className={titleClassName} revealClassName={titleRevealClassName} delay={titleDelay}>
        {title}
      </SectionTitle>
      {action}
    </div>
  );
}
