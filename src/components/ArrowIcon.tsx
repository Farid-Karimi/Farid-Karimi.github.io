interface ArrowIconProps {
  className?: string;
  flip?: boolean;
  variant?: "diagonal" | "external" | "horizontal";
}

export default function ArrowIcon({ className, flip, variant = "diagonal" }: ArrowIconProps) {
  const classes = ["ui-icon", className].filter(Boolean).join(" ");
  const style = flip ? { transform: "scaleX(-1)" } : undefined;

  if (variant === "external") {
    return (
      <span className={classes} style={style}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="4" height="4" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)" fill="var(--black)" />
          <rect width="4" height="4" transform="matrix(4.37114e-08 1 1 -4.37114e-08 6 6)" fill="var(--black)" />
          <rect width="4" height="4" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 10 4)" fill="var(--black)" />
        </svg>
      </span>
    );
  }

  if (variant === "horizontal") {
    return (
      <span className={classes} style={style}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="4" height="4" transform="matrix(-1 0 0 1 16 6.99382e-07)" fill="var(--theme-contrast)" />
          <rect width="4" height="4" transform="matrix(-1 0 0 1 4 6.99382e-07)" fill="var(--theme-contrast)" />
          <rect width="4" height="4" transform="matrix(1 8.74228e-08 8.74228e-08 -1 6 10)" fill="var(--theme-contrast)" />
        </svg>
      </span>
    );
  }

  return (
    <span className={classes} style={style}>
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="4" height="4" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 0)" fill="var(--black)" />
        <rect width="4" height="4" transform="matrix(4.37114e-08 1 1 -4.37114e-08 0 12)" fill="var(--black)" />
        <rect width="4" height="4" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 10 10)" fill="var(--black)" />
      </svg>
    </span>
  );
}
