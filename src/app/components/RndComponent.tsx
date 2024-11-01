"use client";

import { useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
import { CSSProperties } from "react";

interface ResizableDraggableBoxProps {
  heading: string;
  text: React.ReactNode; // Allow ReactNode instead of string
  style?: CSSProperties;
  defaultSize?: {
    width: number;
    height: number;
  };
  onResize?: RndResizeCallback;
  onDrag?: RndDragCallback;
  zIndex?: number; // Add zIndex prop
  onClick: () => void; // Callback for click event
}

const ResizableDraggableBox: React.FC<ResizableDraggableBoxProps> = ({
  heading,
  text,
  style,
  defaultSize = { width: 200, height: 200 },
  onResize,
  onDrag,
  zIndex,
  onClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResizable, setIsResizable] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      if (!prev) {
        setIsResizable(false);
      } else {
        setIsResizable(true);
      }
      return !prev;
    });
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      style={{
        ...style,
        borderRadius: "5px",
        zIndex,
      }}
      bounds="window"
      onResize={isResizable ? onResize : undefined}
      onDrag={(e, data) => {
        if (onDrag) {
          onDrag(e, data);
        }
        onClick(); // Bring this box to the front immediately while dragging
      }} 
      dragHandleClassName="drag-handle"
      enableResizing={{
        top: isResizable,
        right: isResizable,
        bottom: isResizable,
        left: isResizable,
        topRight: isResizable,
        bottomRight: isResizable,
        bottomLeft: isResizable,
        topLeft: isResizable,
      }}
      onClick={onClick} // Trigger onClick immediately on click
    >
      <div
        style={{
          border: "2px solid green",
          background: "#151515",
          overflow: "hidden",
          height: isCollapsed ? "40px" : "100%",
        }}
      >
        <h2 className="drag-handle rnd-header" style={{ margin: 0 }}>
          {heading}
          <button onClick={toggleCollapse} style={{ marginLeft: "10px" }}>
            {isCollapsed ? "+" : "-"}
          </button>
        </h2>
        <div
          style={{
            maxHeight: isCollapsed ? "0" : "calc(100% - 40px)",
            overflowY: "auto",
            transition: "max-height 0.3s ease",
          }}
        >
          {text}
        </div>
      </div>
    </Rnd>
  );
};

export default ResizableDraggableBox;
