import React, { ReactNode } from "react";

interface TitleProps {
  tailwind?: string;
  icon?: ReactNode;
  title: string;
}

/**
 * Title Component
 *
 * This component is used to render a title with an optional icon
 * alongside it. It provides a consistent styling for headings
 * across the application. The title can be used in various contexts,
 * such as section headers or labels for components.
 *
 * Props:
 * - tailwind (string): Optional Tailwind CSS classes to further customize
 *                      the styling of the title. This prop is currently
 *                      not being utilized in the component but can be
 *                      included for additional styling flexibility.
 * - icon (ReactNode): A React node that represents an icon to be
 *                     displayed next to the title text. This could be
 *                     any valid React component, typically an icon
 *                     from a library.
 * - title (string): The text to be displayed as the title. This should
 *                   be a string representing the heading or label.
 *
 * Rendering:
 * - The title is rendered as an `h3` HTML element, styled with
 *   a bold font and white text color.
 * - The component uses Flexbox to align the icon and title text
 *   horizontally with a gap between them, ensuring that both
 *   elements are vertically centered within the specified height.
 */

const Title: React.FC<TitleProps> = ({ tailwind, icon, title }) => {
  return (
    <h3
      className={`font-bold text-white h-12 flex justify-start items-center w-full gap-2 py-1 text-sm ${
        tailwind || ""
      }`}
    >
      {icon}
      {title}
    </h3>
  );
};

export default Title;
