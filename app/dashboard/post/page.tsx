/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Table } from "flowbite-react";
import { fetchPosts, deletePost, Post } from "@/app/api/mock/postService";
import DataTable from "@/app/components/DataTable/DataTable";
import { HiSwitchVertical } from "react-icons/hi";
import Link from "next/link";
import Swal from "sweetalert2";

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleDelete = async (postId: number) => {
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
        await deletePost(postId.toString());
        setPosts((prev) => prev.filter((p) => p.id !== postId));

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

    setPosts((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (type === "number") {
          return direction === "asc"
            ? (a[key as keyof Post] as number) -
                (b[key as keyof Post] as number)
            : (b[key as keyof Post] as number) -
                (a[key as keyof Post] as number);
        }
        if (type === "string") {
          return direction === "asc"
            ? String(a[key as keyof Post]).localeCompare(
                String(b[key as keyof Post])
              )
            : String(b[key as keyof Post]).localeCompare(
                String(a[key as keyof Post])
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
        <Spinner size="lg" aria-label="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <DataTable
      data={posts}
      currentPage={currentPage}
      totalPages={Math.ceil(posts.length / 10)}
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
              รหัสข่าว
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("title", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              หัวข้อ
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("category", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              รายละเอียด
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("price", "number")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              หมวดหมู่
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("stock", "number")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              ยอดเข้าชม
            </span>
          </Table.HeadCell>
          <Table.HeadCell
            onClick={() => handleSort("availabilityStatus", "string")}
            className="cursor-pointer"
          >
            <span className="flex gap-2">
              <HiSwitchVertical fontSize={16} />
              รหัสผู้โพสต์
            </span>
          </Table.HeadCell>
          <Table.HeadCell>จัดการ</Table.HeadCell>
        </>
      )}
      renderRow={(post) => (
        <>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {post.id}
          </Table.Cell>
          <Table.Cell className="truncate ... max-w-52">
            {post.title}
          </Table.Cell>
          <Table.Cell className="truncate ... max-w-72">{post.body}</Table.Cell>
          <Table.Cell>
            {post.tags.map((tag, index) => {
              const tagColors: Record<string, string> = {
                history: "bg-purple-700",
                crime: "bg-red-700",
                american: "bg-blue-700",
                french: "bg-green-700",
                english: "bg-cyan-700",
                mystery: "bg-yellow-500",
                magical: "bg-purple-500",
                default: "bg-gray-700",
              };

              const tagColor = tagColors[tag] || tagColors.default;

              return (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm text-white capitalize rounded-full mr-1 ${tagColor}`}
                >
                  {tag}
                </span>
              );
            })}
          </Table.Cell>
          <Table.Cell>{post.views}</Table.Cell>
          <Table.Cell>{post.userId}</Table.Cell>
          <Table.Cell>
            <Link
              href={`/dashboard/post/${post.id}?name=${post.title}`}
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
            >
              จัดการ
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
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

export default PostTable;
