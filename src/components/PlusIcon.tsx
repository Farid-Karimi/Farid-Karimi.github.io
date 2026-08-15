export default function PlusIcon({ className }: { className?: string }) {
  const classes = ["ui-icon", className].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" width="4" height="4" transform="rotate(90 10 0)" fill="var(--theme-contrast)" />
        <rect x="16" y="6" width="4" height="4" transform="rotate(90 16 6)" fill="var(--theme-contrast)" />
        <rect x="10" y="12" width="4" height="4" transform="rotate(90 10 12)" fill="var(--theme-contrast)" />
        <rect x="6" y="10" width="4" height="4" transform="rotate(-90 6 10)" fill="var(--theme-contrast)" />
        <rect x="4" y="6" width="4" height="4" transform="rotate(90 4 6)" fill="var(--theme-contrast)" />
      </svg>
    </span>
  );
}