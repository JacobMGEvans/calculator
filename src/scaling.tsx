import { useState, useEffect, useRef, PropsWithChildren } from "react";

export function AutoScalingText(props: PropsWithChildren) {
  const [scale, setScale] = useState(1);
  const node = useRef<HTMLElement | undefined>();

  const handleChange = () => {
    if (node.current === undefined) return;

    const scale = node.current;
    const parentNode = scale.parentNode as HTMLElement | null;
    if (parentNode === null) return;

    const actualWidth = scale.scrollWidth;
    const actualHeight = scale.scrollHeight;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    const nextScale =
      Math.min(maxWidth / actualWidth, maxHeight / actualHeight, 1) * 0.9;

    setScale(nextScale);
  };

  useEffect(() => {
    handleChange();
    return () => handleChange();
  }, [node]);

  return (
    <div
      className="auto-scaling-text"
      style={{ transform: `scale(${scale},${scale})` }}
      ref={(node) => node}
    >
      {props.children}
    </div>
  );
}
