export default function UiLogo() {
  return (
    <span className="ui-logo">
      <svg width="38" height="20" viewBox="0 0 38 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#ui-logo-clip)">
          <path
            d="M10.0324 10.1045V9.87229L0 6.48709V2.58594L13.5121 7.43013V12.5438L0 17.3421V13.4409L10.0324 10.1045Z"
            fill="var(--off-white)"
          />
          <path d="M17.1514 19.93V0H20.8777V19.93H17.1514Z" fill="var(--off-white)" />
          <path
            d="M37.9311 17.3421L24.4189 12.5438V7.43013L37.9311 2.58594V6.48709L27.8987 9.87229V10.1045L37.9311 13.4409V17.3421Z"
            fill="var(--off-white)"
          />
        </g>
        <defs>
          <clipPath id="ui-logo-clip">
            <rect width="37.931" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}
