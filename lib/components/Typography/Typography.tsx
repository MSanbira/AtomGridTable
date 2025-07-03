import React, { forwardRef, useMemo } from "react";
import { getClasses } from "../../helpers/classNameHelper";

export const Typography = forwardRef<HTMLHeadingElement | HTMLParagraphElement, TypographyProps>((props, ref) => {
  const { children, variant = "body1", color = "primary", underline, balanced, bold, lowOpacity, ...rest } = props;

  const componentProps = useMemo(
    () => ({
      ...rest,
      className: getClasses({
        "AGT-typography": true,
        [`color-${color}`]: true,
        [rest.className ?? ""]: true,
        [variant]: variant === "body2",
        "is-underline": !!underline,
        "is-balanced": !!balanced,
        "is-bold": !!bold,
        "is-low-opacity": !!lowOpacity,
      }),
      ref, // Forward the ref to the underlying DOM element
    }),
    [rest, color, variant, underline, balanced, bold, lowOpacity, ref]
  );

  switch (variant) {
    case "h1":
      return <h1 {...componentProps}>{children}</h1>;
    case "h2":
      return <h2 {...componentProps}>{children}</h2>;
    case "h3":
      return <h3 {...componentProps}>{children}</h3>;
    case "h4":
      return <h4 {...componentProps}>{children}</h4>;
    case "h5":
      return <h5 {...componentProps}>{children}</h5>;
    case "h6":
      return <h6 {...componentProps}>{children}</h6>;
    case "body2":
      return <p {...componentProps}>{children}</p>;
    case "body1":
    default:
      return <p {...componentProps}>{children}</p>;
  }
});

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: TypographyVariantOptions | string;
  color?: TypographyColorOptions | string;
  underline?: boolean;
  balanced?: boolean;
  bold?: boolean;
  lowOpacity?: boolean;
}

export type TypographyVariantOptions = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2";
export type TypographyColorOptions = "primary" | "secondary" | "tertiary" | "error" | "warning" | "active" | "success";
