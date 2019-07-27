import React, { useState, useEffect, useRef } from 'react';

const AutoScalingText = props => {
  const [scale, setScale] = useState(1);
  const node = useRef(null);

  const handleChange = () => {
    const parentNode = node.current;
    let actualScale;
    // const availableWidth = parentNode.offsetWidth;
    // const actualWidth = node.offsetWidth;
    // console.log(parentNode, 'Parent');
    // console.log(actualWidth, 'WIDTH');
    // const actualScale = availableWidth / actualWidth;

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

  return (
    <div
      onChange={handleChange}
      className="auto-scaling-text"
      style={{ transform: `scale(${scale},${scale})` }}
      ref={node}>
      {props.children}
    </div>
  );
};
export default AutoScalingText;
