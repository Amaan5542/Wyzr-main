const ThunderIcon = ({
  className = "stroke-gray-400",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.04456 6.63995H4.58956V10.2399C4.58956 11.0799 5.04456 11.2499 5.59956 10.6199L9.38456 6.31995C9.84956 5.79495 9.65456 5.35995 8.94956 5.35995H7.40456V1.75995C7.40456 0.919949 6.94956 0.749949 6.39456 1.37995L2.60956 5.67995C2.14956 6.20995 2.34456 6.63995 3.04456 6.63995Z"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ThunderIcon;
