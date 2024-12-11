/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Table } from "flowbite-react";
import {
  fetchProducts,
  deleteProduct,
  Product,
} from "@/app/api/mock/productService";
import DataTable from "@/app/components/DataTable/DataTable";
import { HiSwitchVertical } from "react-icons/hi";
import Link from "next/link";
import Swal from "sweetalert2";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    try {
      const result = await Swal.fire({
        title: "คุณต้องการลบข้อมูลนี้หรือไม่ ?",
        text: "หากลบข้อมูลนี้แล้วจะไม่สามารถกู้คืนได้.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        await deleteProduct(productId.toString());
        setProducts((prev) => prev.filter((p) => p.id !== productId));

        await Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          text: "ข้อมูลดังกล่าวถูกลบแล้ว",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (err) {
      console.error("Error deleting product:", err);

      await Swal.fire({
        title: "ไม่สามารถดำเนินการได้",
        text: "ขออภัย ในขณะนี้ระบบไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleSort = (key: string, type: "string" | "number") => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key, direction });

    setProducts((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (type === "number") {
          return direction === "asc"
            ? (a[key as keyof Product] as number) -
                (b[key as keyof Product] as number)
            : (b[key as keyof Product] as number) -
                (a[key as keyof Product] as number);
        }
        if (type === "string") {
          return direction === "asc"
            ? String(a[key as keyof Product]).localeCompare(
                String(b[key as keyof Product])
              )
            : String(b[key as keyof Product]).localeCompare(
                String(a[key as keyof Product])
              );
        }
        return 0;
      });
      return sorted;
    });
  };

  const handleClearFilters = () => {
    console.log("Filters cleared");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-opacity-5">
        <Spinner size="lg" aria-label="Loading products..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <DataTable
      data={products}
      currentPage={currentPage}
      totalPages={Math.ceil(products.length / 10)}
      onPageChange={setCurrentPage}
      onClearFilters={handleClearFilters}
      renderHead={() => (
        <>
          <Table.HeadCell
            onClick={() => handleSort("id", "number")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              รหัสสินค้า
            </span>
          </Table.HeadCell>
          <Table.HeadCell>รูปภาพ</Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("title", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              ชื่อสินค้า
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("category", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              หมวดหมู่
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("price", "number")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              ราคา
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("stock", "number")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              สต็อก
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("availabilityStatus", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              สถานะ
            </span>
          </Table.HeadCell>
          <Table.HeadCell>จัดการ</Table.HeadCell>
        </>
      )}
      renderRow={(product) => (
        <>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {product.id}
          </Table.Cell>
          <Table.Cell>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-16 h-auto object-cover object-center rounded-lg"
            />
          </Table.Cell>
          <Table.Cell>{product.title}</Table.Cell>
          <Table.Cell>{product.category}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell>{product.stock}</Table.Cell>
          <Table.Cell>{product.availabilityStatus}</Table.Cell>
          <Table.Cell>
            <Link
              href={`/dashboard/product/${product.id}?name=${product.title}`}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
            >
              จัดการ
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              className="font-medium text-red-600 hover:underline dark:text-red-500"
            >
              ลบ
            </button>
          </Table.Cell>
        </>
      )}
    />
  );
};

export default ProductTable;
