/* eslint-disable @next/next/no-img-element */
"use client";

import { Table, Pagination, Spinner } from "flowbite-react";
import { fetchProducts, Product } from "@/app/api/mock/productService";
import { useState, useEffect } from "react";

export default function NewsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-opacity-5">
        <Spinner size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto border border-slate-100 rounded-lg">
      <Table hoverable>
        <Table.Head className="bg-blue-200">
          <Table.HeadCell>รหัสสินค้า</Table.HeadCell>
          <Table.HeadCell>รูปภาพ</Table.HeadCell>
          <Table.HeadCell>ชื่อสินค้า</Table.HeadCell>
          <Table.HeadCell>ราคา</Table.HeadCell>
          <Table.HeadCell>วัสดุ</Table.HeadCell>
          <Table.HeadCell>ADJ</Table.HeadCell>
          <Table.HeadCell>คำอธิบาย</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">จัดการ</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products && products.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.id}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={product.image}
                    height={0}
                    width={0}
                    alt={product.name}
                    className="w-16 h-auto object-cover object-center rounded-lg"
                  />
                </Table.Cell>
                <Table.Cell>{product.product}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.adj}</Table.Cell>
                <Table.Cell>{product.material}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">
                No products found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
