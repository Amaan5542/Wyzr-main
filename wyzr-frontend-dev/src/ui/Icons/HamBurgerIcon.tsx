const HamBurgerIcon = ({
  className = "stroke-gray-400",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 9.33337H28" strokeLinecap="round" />
    <path d="M4 16H28" strokeLinecap="round" />
    <path d="M4 22.6666H28" strokeLinecap="round" />
  </svg>
);
export default HamBurgerIcon;
