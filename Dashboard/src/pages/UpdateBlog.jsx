import { Label } from "@/components/ui/label";
import { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  clearAllBlogErros,
  getAllBlogs,
  resetBlogSlice,
  updateBlog,
} from "@/store/slices/blogSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-componets/LoadingButton";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";

export default function UpdateBlog() {
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [Postdate, setPostdate] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const { loading, error, message } = useSelector((state) => state.blogs);
  const { id } = useParams();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleBlogImagePreview = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImage(file);
      setBlogImagePreview(reader.result);
    };
  };

  useEffect(() => {
    const getBlog = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/blog/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.blog.title);
          setDescription(res.data.blog.description);
          setTag(res.data.blog.tag);
          setAuthor(res.data.blog.author);
          setPostdate(res.data.blog.Postdate);
          setBlogImage(res.data.blog.blogImage && res.data.blog.blogImage.url);
          setBlogImagePreview(
            res.data.blog.blogImage && res.data.blog.blogImage.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getBlog();

    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErros());
    }

    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
      dispatch(getAllBlogs());
    }
  }, [id, message, error, loading]);

  const handleUpdateBlog = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("Postdate", Postdate);
    formData.append("author", author);
    formData.append("blogImage", blogImage);

    dispatch(updateBlog(id, formData));
    navigate("/manage/blogs")
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          onSubmit={handleUpdateBlog}
          className="w-[100%] px-5 md:w-[1000px]"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                UPDATE Blog
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <img
                    src={blogImagePreview ? blogImagePreview : "./vite.svg"}
                    alt=""
                    className="w-full h-auto"
                  />

                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleBlogImagePreview}
                      className="avatar-update-btn mt-4 w-full"
                    />
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Blog Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        placeholder="Enter Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    placeholder="Write Somethins......"
                    value={description}
                    className="h-72 mb-12 bg-white"
                    onChange={(content) => setDescription(content)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-x-10">
                  <div className="w-full sm:col-span-1">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      AUTHOR
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <Input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:col-span-1">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      TAG
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <Select
                          value={tag}
                          onValueChange={(selectedValue) =>
                            setTag(selectedValue)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blog Tag" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tag">tag</SelectItem>
                            <SelectItem value="tag1">tag1</SelectItem>
                            <SelectItem value="tag2">tag2</SelectItem>
                            <SelectItem value="tag3">tag</SelectItem>
                            <SelectItem value="tag4">tag4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:col-span-1">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      POST DATE
                    </label>
                    <div className="mt-2">
                      <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <Input
                          type="text"
                          value={Postdate}
                          onChange={(e) => setPostdate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full items-center">
              {loading ? (
                <LoadingButton content={"updating Blog"} width={"w-full"} />
              ) : (
                <Button className="w-full" onClick={handleUpdateBlog}> Update Blog </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
