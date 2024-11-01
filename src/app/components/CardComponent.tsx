"use client";

import { useState } from "react";
import ResizableDraggableBox from "./RndComponent"; // Adjust the import path as necessary

const ResizableDraggableBoxContainer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Start with the first box active
  const [isBox2Visible, setBox2Visible] = useState(false);
  const [isBox3Visible, setBox3Visible] = useState(false);

  const boxes = [
    { heading: "Box 1", text: (
      <div>
        <p>root</p>
        <div><button onClick={() => { setBox2Visible(true); setActiveIndex(1); }}>Show Box 2</button>
        </div>
        <button onClick={() => { setBox3Visible(true); setActiveIndex(2); }}>Show Box 3</button>
      </div>
    )},
    { heading: "Box 2", text: <p>This is the text for Box 2.</p> },
    { heading: "Box 3", text: <p>This is the text for Box 3.</p> },
  ];

  return (
    <div>
      {boxes.map((box, index) => (
        (index === 0 || (index === 1 && isBox2Visible) || (index === 2 && isBox3Visible)) && (
          <ResizableDraggableBox
            key={index}
            heading={box.heading}
            text={box.text}
            defaultSize={{ width: 200, height: 200 }}
            onClick={() => setActiveIndex(index)} // Set active index on click
            zIndex={activeIndex === index ? 10 : 1} // Bring active box to front
          />
        )
      ))}
    </div>
  );
};

export default ResizableDraggableBoxContainer;
