import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cx("form-field", className)} {...props} />;
});

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(function FormTextarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cx("form-field resize-none", className)} {...props} />;
});
