const RewindIcon = ({
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
    <path
      d="M21.28 14.4401H17.2001L16.1867 17.4934H19.24C20.36 17.4934 21.28 18.4001 21.28 19.5334C21.28 20.6534 20.3733 21.5734 19.24 21.5734H16.1867"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.72 21.56V14.4401L10.72 16.6667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.36 5.95992L16 2.66663"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.54665 10.3999C5.06665 12.3733 4.14667 14.8133 4.14667 17.4799C4.14667 24.0266 9.45335 29.3333 16 29.3333C22.5467 29.3333 27.8534 24.0266 27.8534 17.4799C27.8534 10.9333 22.5467 5.62659 16 5.62659C15.0934 5.62659 14.2134 5.74666 13.36 5.94666"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RewindIcon;
