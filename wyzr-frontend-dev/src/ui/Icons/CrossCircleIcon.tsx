const CrossCircleIcon = ({
  className = "stroke-gray-400",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00008 12.8333C10.2084 12.8333 12.8334 10.2083 12.8334 6.99996C12.8334 3.79163 10.2084 1.16663 7.00008 1.16663C3.79175 1.16663 1.16675 3.79163 1.16675 6.99996C1.16675 10.2083 3.79175 12.8333 7.00008 12.8333Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.34912 8.65079L8.65079 5.34912"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.65079 8.65079L5.34912 5.34912"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CrossCircleIcon;
