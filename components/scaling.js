import React, { useState, useEffect, useRef } from 'react';

const AutoScalingText = props => {
  const [scale, setScale] = useState(1);
  const node = useRef(null);

  console.log(node, 'NODE');
  const handleChange = () => {
    const parentNode = node.current;
    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale) return;

    actualScale < 1
      ? setScale(actualScale)
      : scale < 1
      ? setScale(1)
      : console.error(
          actualScale,
          'actualscale',
          scale,
          'scale',
          parentNode,
          'ParentNode'
        );
  };

  useEffect(() => {
    handleChange();
    return () => handleChange();
  }, [node]);

  return (
    <div
      className="auto-scaling-text"
      style={{ transform: `scale(${scale},${scale})` }}
      ref={node}>
      {props.children}
    </div>
  );
};
export default AutoScalingText;
