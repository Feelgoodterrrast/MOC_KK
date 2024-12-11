/* eslint-disable @next/next/no-img-element */

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, Key } from "react";
import { Spinner } from "flowbite-react";
import {
  fetchProductById,
  Product,
  updateProduct,
} from "@/app/api/mock/productService";
import Link from "next/link";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const ProductManage = () => {
  const params = useParams();
  const id = params.slug;

  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      if (typeof id !== "string") {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductById(id);
        setProductDetail(data);
      } catch (err) {
        setError("Failed to fetch product. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (productDetail) {
      setProductDetail({
        ...productDetail,
        [field]: value,
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productDetail || typeof id !== "string") return;

    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const updatedProduct = await updateProduct(id, {
        title: productDetail.title,
        price: productDetail.price,
      });

      updatedProduct.meta = {
        ...updatedProduct.meta,
        updatedAt: new Date().toISOString(),
      };

      const result = await Swal.fire({
        title: "คุณต้องการอัปเดตข้อมูลนี้หรือไม่ ?",
        text: "กรุณาตรวจสอบข้อมูลก่อนการอัปเดตทุกครั้ง.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        await setProductDetail(updatedProduct);

        await Swal.fire({
          title: "อัปเดตข้อมูลสำเร็จ",
          text: "ข้อมูลดังกล่าวถูกอัปเดตแล้ว",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error(error);

      await Swal.fire({
        title: "ไม่สามารถดำเนินการได้",
        text: "ขออภัย ในขณะนี้ระบบไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-opacity-5">
        <Spinner size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!productDetail) {
    return <div className="text-red-500">Product not found</div>;
  }

  return (
    <>
      <Link
        href="/dashboard/product"
        className="text-blue-500 hover:underline flex items-center"
      >
        <HiOutlineArrowSmLeft /> ย้อนกลับ
      </Link>
      <h1 className="mt-4 font-bold text-2xl">จัดการสินค้า</h1>
      <div className="mt-4 grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-4">
        <div className="col-span-1">
          {productDetail.images.map((image: string, index: Key) => (
            <img
              key={index}
              src={image}
              alt={`${productDetail.title} - Image`}
              className="w-full h-auto object-cover border border-gray-200 rounded-lg"
            />
          ))}
        </div>
        <div className="col-span-3">
          <form onSubmit={handleUpdate} className="max-w-sm">
            <div className="mb-4">
              <label>ชื่อสินค้า</label>
              <input
                id="title"
                type="text"
                value={productDetail.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm min-w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-4">
              <label>ราคา</label>
              <input
                id="price"
                type="number"
                value={productDetail.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm min-w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <div>
                <small>
                  อัปเดตล่าสุดเมื่อ : {productDetail.meta?.updatedAt || "N/A"}
                </small>
              </div>
            </div>
            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 text-white rounded-lg ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {updating ? "กำลังอัปเดต..." : "อัปเดตสินค้า"}
            </button>
          </form>
          {updateSuccess && (
            <p className="text-green-500 mt-4">{updateSuccess}</p>
          )}
          {updateError && <p className="text-red-500 mt-4">{updateError}</p>}
        </div>
      </div>
    </>
  );
};

export default ProductManage;
