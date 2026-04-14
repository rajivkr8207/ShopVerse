import React from "react";

interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
}

const DataTable = <T extends Record<string, any>>({ data, columns, loading }: DataTableProps<T>) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-48 bg-neutral-900 rounded-xl border border-neutral-800" style={{ backgroundColor: "var(--secondary)" }}>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-48 bg-neutral-900 rounded-xl border border-neutral-800 text-gray-400" style={{ backgroundColor: "var(--secondary)" }}>
                No records found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-neutral-700 shadow-md">
            <table className="min-w-full text-left text-sm whitespace-nowrap text-white" style={{ backgroundColor: "var(--secondary)" }}>
                <thead className="border-b border-neutral-700 uppercase bg-neutral-800/50">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col" className="px-6 py-4 font-semibold text-gray-300">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-neutral-800/30 transition-colors">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-normal">
                                    {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey] ?? "") : "")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
