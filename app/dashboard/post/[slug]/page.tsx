/* eslint-disable @next/next/no-img-element */

"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Spinner, TextInput, Textarea } from "flowbite-react";
import { fetchPostById, Post, updatePost } from "@/app/api/mock/postService";
import Link from "next/link";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const PostManage = () => {
  const params = useParams();
  const id = params.slug;

  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    const getPost = async () => {
      if (typeof id !== "string") {
        setError("Invalid post ID");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPostById(id);
        setPostDetail({
          ...data,
          tags: data.tags || [], 
        });
      } catch (err) {
        setError("Failed to fetch post. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPost();
    }
  }, [id]);

  const handleInputChange = (
    field: keyof Post,
    value: string | number,
    index?: number
  ) => {
    if (postDetail) {
      if (field === "tags" && index !== undefined) {
        // Update a specific tag
        const updatedTags = [...postDetail.tags];
        updatedTags[index] = value as string;

        setPostDetail({
          ...postDetail,
          tags: updatedTags,
        });
      } else {
        // Update other fields
        setPostDetail({
          ...postDetail,
          [field]: value,
        });
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postDetail || typeof id !== "string") return;

    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const updatedPost = await updatePost(id, {
        title: postDetail.title,
        body: postDetail.body,
        tags: postDetail.tags,
      });

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
        await setPostDetail(updatedPost);

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

  if (!postDetail) {
    return <div className="text-red-500">Post not found</div>;
  }

  return (
    <>
      <Link
        href="/dashboard/post"
        className="text-blue-500 hover:underline flex items-center"
      >
        <HiOutlineArrowSmLeft /> ย้อนกลับ
      </Link>
      <h1 className="mt-4 font-bold text-2xl">จัดการข่าว</h1>
      <div className="mt-4 grid grid-cols-1 lg:gap-6 gap-4">
        <div>
          <form onSubmit={handleUpdate} className="max-w-lg">
            <div className="mb-4">
              <label>ชื่อข่าว</label>
              <TextInput
                id="title"
                type="text"
                value={postDetail.title}
                onChange={(e: { target: { value: string } }) =>
                  handleInputChange("title", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4">
              <label>หมวดหมู่</label>
              {postDetail.tags.map((tag, index) => (
                <TextInput
                  key={index}
                  value={tag}
                  onChange={(e: { target: { value: string } }) =>
                    handleInputChange("tags", e.target.value, index)
                  }
                  className="mb-4"
                />
              ))}
            </div>

            <div className="mb-4">
              <label>รายละเอียด</label>
              <Textarea
                id="body"
                onChange={(e) => handleInputChange("body", e.target.value)}
                defaultValue={postDetail.body}
                placeholder="รายละเอียดข่าว"
                rows={6}
                required
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <div>
                <small>ยอดเข้าชม : {postDetail?.views || "N/A"}</small>
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
              {updating ? "กำลังอัปเดต..." : "อัปเดตข่าว"}
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

export default PostManage;
