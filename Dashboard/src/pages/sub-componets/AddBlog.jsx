import { useRef } from "react";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addNewBlog,
  clearAllBlogErros,
  getAllBlogs,
  resetBlogSlice,
} from "@/store/slices/blogSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddBlog() {
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [Postdate, setPostdate] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const { error, loading, message } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const handleAddNewBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    formData.append("Postdate", Postdate);
    formData.append("author", author);
    formData.append("blogImage", blogImage);

    dispatch(addNewBlog(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllBlogErros());
    }
    if (message) {
      toast.success(message);
      dispatch(resetBlogSlice());
      dispatch(getAllBlogs());
    }
  }, [dispatch, error, loading, message]);

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          onSubmit={handleAddNewBlog}
          className="w-[100%] px-5 md:w-[1000px]"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                ADD NEW Blog
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Blog Title
                  </label>
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
                          type="date"
                          value={Postdate}
                          onChange={(e) => setPostdate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Blog Banner
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {blogImagePreview ? (
                        <img
                          className="mx-auto h-[250px] w-full text-gray-300"
                          viewBox="0 0 24 24"
                          src={blogImagePreview && `${blogImagePreview}`}
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleSvg}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {loading ? (
              <LoadingButton content={"ADDING NEW Blog"} width={"w-56"} />
            ) : (
              <Button
                type="submit"
                className="rounded-md mt-5 w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Blog
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
