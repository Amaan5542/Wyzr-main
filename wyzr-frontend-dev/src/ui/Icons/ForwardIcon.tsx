const ForwardIcon = ({
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
      d="M21.28 14.4401H17.2L16.1866 17.4934H19.2399C20.3599 17.4934 21.28 18.4001 21.28 19.5334C21.28 20.6534 20.3733 21.5734 19.2399 21.5734H16.1866"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.72 21.56V14.4401L10.72 16.6667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.64 5.95992L16 2.66663"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25.4533 10.3999C26.9333 12.3733 27.8533 14.8133 27.8533 17.4799C27.8533 24.0266 22.5466 29.3333 16 29.3333C9.45329 29.3333 4.14661 24.0266 4.14661 17.4799C4.14661 10.9333 9.45329 5.62659 16 5.62659C16.9066 5.62659 17.7866 5.74666 18.6399 5.94666"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default ForwardIcon;
