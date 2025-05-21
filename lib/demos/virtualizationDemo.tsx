import React, { useState } from "react";
import AtomGridTable from "../AtomGridTable";
import { TableRow, ColOption } from "../types/table.types";

// Define column options with 5 columns
const columnOptions: ColOption[] = [
  {
    name: "id",
    label: "ID",
    width: "80px",
    isResizable: true,
  },
  {
    name: "name",
    label: "Name",
    isResizable: true,
  },
  {
    name: "description",
    label: "Description",
    width: "300px",
    isResizable: true,
  },
  {
    name: "position",
    label: "Position",
    isResizable: true,
  },
  {
    name: "status",
    label: "Status",
    isResizable: true,
  },
];

// Generate lorem ipsum paragraph for descriptions
const generateDescription = (id: number): string => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, est justo tincidunt massa, eget facilisis nunc nunc eget risus. Proin viverra, ligula nec tempus semper.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas.",
    "Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla.",
    "Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti. Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque.",
    "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit.",
  ];

  return descriptions[id % descriptions.length];
};

// Function to generate specified number of rows
const generateRows = (count: number): TableRow[] => {
  const positions = ["Manager", "Senior", "Junior", "Intern", "Director", "Lead"];
  const statuses = ["Active", "Inactive", "On Leave", "Remote", "Pending"];

  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    return {
      selectIdentifier: id.toString(),
      cells: [
        { content: id.toString() },
        { content: `User ${id}` },
        { content: generateDescription(id) },
        { content: positions[id % positions.length] },
        { content: statuses[id % statuses.length] },
      ],
    };
  });
};

export const VirtualizationDemo = () => {
  const [rowCount, setRowCount] = useState(1000);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const rows = generateRows(rowCount);

  return (
    <div className="virtualization-demo">
      <div className="demo-controls">
        <label>
          Row Count:
          <input
            type="number"
            value={rowCount}
            onChange={(e) => setRowCount(parseInt(e.target.value) || 100)}
            min={10}
            max={10000}
          />
        </label>
      </div>

      <AtomGridTable
        colOptions={columnOptions}
        rows={rows}
        tableStyleOptions={{
          isZebra: true,
          isSmallCellPadding: true,
        }}
        // isVirtualization
        selectedRows={selectedRows}
        setSelected={setSelectedRows}
        isHasSelect
      />
    </div>
  );
};

export default VirtualizationDemo;
