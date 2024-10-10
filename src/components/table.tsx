import React, { ReactNode } from "react";
import Title from "./title";

interface TableProps {
  heads: string[];
  children: ReactNode;
  title: string;
  icon?: ReactNode;
}

/**
 * Table Component
 *
 * This component renders a table with customizable headers and data.
 * It includes a title section at the top, which can display an icon
 * along with the title text. The table is styled for a clean appearance
 * and supports rendering child elements as rows within the table body.
 *
 * Props:
 * - heads (array): An array of strings representing the column headers for the table.
 * - children (ReactNode): The rows of the table, passed as child components.
 * - title (string): The title of the table displayed at the top.
 * - icon (ReactNode): An optional icon to be displayed alongside the title.
 *
 * Rendering:
 * - Renders a title using the Title component, passing the title and icon as props.
 * - Displays a table with a header section that maps through the `heads` prop to create
 *   column headers. The headers are styled for a dark background with light text.
 * - The table body is populated with children elements, allowing for dynamic row rendering.
 */
const Table: React.FC<TableProps> = ({ heads, children, title, icon }) => {
  return (
    <div className="w-full rounded-md overflow-hidden">
      <Title title={title} icon={icon} />
      <table className="min-w-full h-fit text-xs">
        <thead>
          <tr className="bg-[#151a22] text-[#787e8b] text-xs text-left">
            {heads.map((head, i) => (
              <th className="py-2 px-2" key={i}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
