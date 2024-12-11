/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Pagination, Select, TextInput, Button } from "flowbite-react";

interface DataTableProps<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  renderHead: () => React.ReactNode;
  renderRow: (item: T) => React.ReactNode;
  onClearFilters: () => void;
}

export default function DataTable<T>({
  data,
  currentPage,
  totalPages,
  onPageChange,
  renderHead,
  renderRow,
  onClearFilters,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = data
    .filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
    )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalFilteredPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex flex-grow gap-4">
          <TextInput
            type="text"
            placeholder="ค้นหาข้อมูล..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => {
              setSearchQuery("");
              setItemsPerPage(10);
              onClearFilters();
            }}
            color="red"
          >
            เคลียร์ Filters
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto max-w-full min-w-96 border border-slate-100 rounded-lg">
        <Table hoverable>
          <Table.Head className="bg-blue-200">{renderHead()}</Table.Head>
          <Table.Body className="divide-y">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  {renderRow(item)}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={8} className="text-center">
                  ไม่พบข้อมูล
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-end items-center gap-4 mt-4 h-12">
        <div className="flex items-center gap-2">
          <span>แสดง</span>
          <Select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
          <span>แถว / หน้า</span>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalFilteredPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  );
}
