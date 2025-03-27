import { PaginationApiParams } from "../hooks/usePagination";
import { SortingApiParams } from "../hooks/useSorting";
import { TableRow } from "../types/table.types";

interface ApiResponse {
  rows: TableRow[];
  totalCount: number;
}

interface EmployeeData {
  id: string;
  name: string;
  department: string;
  performance: {
    text: string;
    class: string;
  };
}

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
const performances = [
  { text: "Excellent", class: "status-excellent" },
  { text: "Good", class: "status-good" },
  { text: "Average", class: "status-average" },
  { text: "Needs Improvement", class: "status-needs-improvement" },
];

// Generate raw data
const rawData: EmployeeData[] = Array(53)
  .fill(null)
  .map((_, index) => ({
    id: `EMP${String(index + 1).padStart(3, "0")}`,
    name: `Employee ${index + 1}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    performance: performances[Math.floor(Math.random() * performances.length)],
  }));

// Convert raw data to table row format
const convertToTableRow = (data: EmployeeData): TableRow => ({
  selectIdentifier: `emp-${data.id}`,
  cells: [
    { content: data.id, isNumber: true },
    { content: data.name },
    { content: data.department },
    { content: data.performance.text, className: data.performance.class },
  ],
});

export const getRows = async (
  paginationParams: PaginationApiParams | unknown = { limit: 10, offset: 0 },
  sortingParams: SortingApiParams | unknown = { ordering: "id" }
): Promise<ApiResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { limit, offset } = paginationParams as PaginationApiParams;
  const { ordering } = sortingParams as SortingApiParams;

  const filteredData = [...rawData];

  // Handle sorting
  if (ordering) {
    const isDesc = ordering.startsWith("-");
    const field = isDesc ? ordering.slice(1) : ordering;

    filteredData.sort((a, b) => {
      const aValue = getValueByField(a, field);
      const bValue = getValueByField(b, field);

      if (isDesc) {
        return bValue.localeCompare(aValue);
      }
      return aValue.localeCompare(bValue);
    });
  }

  // Handle pagination
  const paginatedData = filteredData.slice(offset, offset + limit);

  return {
    rows: paginatedData.map(convertToTableRow),
    totalCount: rawData.length,
  };
};

// Helper function to get value based on field name from raw data
const getValueByField = (data: EmployeeData, field: string): string => {
  const fieldMap: Record<string, (data: EmployeeData) => string> = {
    id: (data) => data.id,
    name: (data) => data.name,
    department: (data) => data.department,
    performance: (data) => data.performance.text,
  };

  return fieldMap[field]?.(data) || "";
};
