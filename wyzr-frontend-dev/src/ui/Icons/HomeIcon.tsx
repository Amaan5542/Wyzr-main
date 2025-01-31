import React from "react";

const HomeIcon = ({
  className = "stroke-primary-300 stroke-2 h-fit w-fit",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0265 3.78672L4.83984 9.38672C3.63984 10.3201 2.6665 12.3067 2.6665 13.8134V23.6934C2.6665 26.7867 5.1865 29.3201 8.27984 29.3201H23.7198C26.8132 29.3201 29.3332 26.7867 29.3332 23.7067V14.0001C29.3332 12.3867 28.2532 10.3201 26.9332 9.40005L18.6932 3.62672C16.8265 2.32005 13.8265 2.38672 12.0265 3.78672Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 23.9867V19.9867"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
