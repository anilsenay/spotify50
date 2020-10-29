import * as React from "react";

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 510 510" {...props}>
      <g fillOpacity={0.9}>
        <path d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z" />
        <path d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z" />
      </g>
    </svg>
  );
}

export default ClockIcon;
