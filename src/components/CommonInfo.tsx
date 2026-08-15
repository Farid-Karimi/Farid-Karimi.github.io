interface CommonInfoProps {
  prefix?: string | null;
  title: string;
  sectionName?: string;
  className?: string;
}

export default function CommonInfo({ prefix, title, sectionName, className }: CommonInfoProps) {
  return (
    <div className={`common-info${className ? ` ${className}` : ""}`}>
      <div className="common-info__title" role="heading" aria-level={2}>
        {prefix ? (
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>{prefix}</span>
          </div>
        ) : null}
        <div className={`common-info__title--line has-label h2-fluid${prefix ? "" : " no-prefix"}`} data-section={sectionName ?? ""}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}