import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionTone = "light" | "deep";

const toneClassMap: Record<SectionTone, string> = {
  light: "section-light",
  deep: "section-deep",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone: SectionTone;
  containerClassName?: string;
  pageEntryOrder?: number;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { tone, className, containerClassName, pageEntryOrder, style, children, ...props },
  ref,
) {
  const resolvedStyle =
    pageEntryOrder === undefined
      ? style
      : ({
          ...style,
          "--page-entry-order": pageEntryOrder,
        } as CSSProperties);

  return (
    <section
      ref={ref}
      className={cx(
        "section-spacing section-anchor-offset",
        toneClassMap[tone],
        className,
      )}
      style={resolvedStyle}
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
    <div className={cx("section-header-shell", className)}>
      <SectionTitle tone={tone} className={titleClassName}>
        {title}
      </SectionTitle>
      {action}
    </div>
  );
}
