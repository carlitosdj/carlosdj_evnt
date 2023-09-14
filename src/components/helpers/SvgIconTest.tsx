export const SvgIconTest = () => {
  return (
    <svg
      width={56}
      height={56}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <radialGradient
          cx="50%"
          cy="89.845%"
          fx="50%"
          fy="89.845%"
          r="89.85%"
          id="icon1-b"
        >
          <stop stopColor="#3B82F6" stopOpacity=".64" offset="0%" />
          <stop stopColor="#F472B6" stopOpacity=".876" offset="100%" />
        </radialGradient>
        <circle id={"icon1-a"} cx={28} cy={28} r={28} />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="url(#icon1-b)" xlinkHref="#icon1-a" />
        <g stroke="#FDF2F8" strokeLinecap="square" strokeWidth={2}>
          <path d="M17 28h22" opacity=".64" />
          <path d="M20 23v-3h3M33 20h3v3M36 33v3h-3M23 36h-3v-3" />
        </g>
      </g>
    </svg>
  );
};
