import { useEffect, useRef } from "react";

export default function ProgressCircle({ progress = 0.9, size = 100, strokeWidth = 10 }) {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    const offset = circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
  }, [progress]);

  const center = size / 2;
  const radius = center - strokeWidth / 2;

  return (
    <svg width={size} height={size}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="#eee"
        strokeWidth={strokeWidth}
      />
      <circle
        ref={circleRef}
        className="progress-circle"
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="tomato"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{
          transition: "stroke-dashoffset 0.3s ease",
        }}
      />
    </svg>
  );
}
