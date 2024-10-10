import React, { ReactNode } from "react";

interface TagProps {
  icon: ReactNode;
  info: string | number;
}

/**
 * Tag Component
 *
 * This component displays a tag with an icon and accompanying information.
 * It is designed to have a visually appealing gradient background and
 * is styled to stand out in a user interface. The component is flexible
 * in terms of the icon it displays, allowing for various use cases.
 *
 * Props:
 * - icon (ReactNode): The icon to be displayed alongside the info text.
 *                     Can be any valid React node, typically an icon component.
 * - info (string | number): The text or numeric information to be displayed within the tag.
 *
 * Rendering:
 * - The tag consists of a flex container that aligns items in a row.
 * - It has a gradient background and border, making it visually distinct.
 * - The icon is displayed on the left with some margin to separate it from the info text.
 * - The overall size and styling make the tag bold and prominent,
 *   suitable for displaying key information in a user interface.
 */

interface TagProps {
  icon: ReactNode;
  info: string | number;
}

export default function Tag({ icon, info }: TagProps) {
  return (
    <div className="flex items-center bg-gradient-to-r from-[#171b23] to-[#242b3a] text-white border border-[#242a38] rounded-md px-3 py-1.5 text-sm text-primary-foreground w-[25%] grow h-12 font-bold">
      <span className="mr-2">{icon}</span>
      <span>{info}</span>
    </div>
  );
}
