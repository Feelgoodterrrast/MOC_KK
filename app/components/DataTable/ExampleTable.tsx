"use client";

import { Table } from "flowbite-react";
import { TableHead, TableBody } from "../../api/mock/DataTable";

export function ExampleTable() {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-xl">
      <Table className="min-h-[400px]">
        <Table.Head>
          {TableHead.map((item, index) => ( 
          <Table.HeadCell key={index}>{item.title}</Table.HeadCell>
        ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {TableBody.map((item, index) => ( 
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.name}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.category}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.price}
            </Table.Cell>
            
          </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
