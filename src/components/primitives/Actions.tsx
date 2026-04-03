import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

type ActionVariant = "primary" | "ghost" | "cta";

const variantClassMap: Record<ActionVariant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  cta: "cta-action",
};

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ActionVariant;
};

export const ActionLink = forwardRef<HTMLAnchorElement, ActionLinkProps>(function ActionLink(
  { variant = "primary", className, children, ...props },
  ref,
) {
  return (
    <a ref={ref} className={cx(variantClassMap[variant], className)} {...props}>
      <span className="btn-label">{children}</span>
    </a>
  );
});

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Extract<ActionVariant, "primary" | "ghost">;
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(function ActionButton(
  { variant = "primary", className, children, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx(variantClassMap[variant], className)} {...props}>
      <span className="btn-label">{children}</span>
    </button>
  );
});

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, children, type = "button", ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx("icon-circle hover:bg-primary/20", className)} {...props}>
      {children}
    </button>
  );
});
