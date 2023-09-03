import { useState } from "react";
export function useHover() {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  return {
    hovered,
    bind: {
      onMouseEnter,
      onMouseLeave,
    },
  };
}
