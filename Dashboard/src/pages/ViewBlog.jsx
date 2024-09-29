import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function ViewBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [Postdate, setPostdate] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const { id } = useParams();

  const formatDate = (dateid) => {
    const date = new Date(dateid);
  
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getBlog();
  }, [id]);

  const descriptionInListFormat = description.split(". ");

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4"> {title}</h1>
                  <img src={blogImage} alt={title} className="w-full h-auto" />
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description : </p>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
                <hr className="w-full h-px  border-0 rounded bg-gray-700" />
                <div className="flex justify-between  content-center ">
                  <div className="w-full sm:col-span-4">
                    <p className="text-lg font-semibold mb-2">
                      Tags : <span>{tag}</span>{" "}
                    </p>
                  </div>

                  <div className="w-full sm:col-span-4">
                    <p className="text-lg font-semibold mb-2">
                      Author : <span className="">{author}</span>{" "}
                    </p>
                  </div>

                  <div className="w-full sm:col-span-4">
                    <p className="text-lg font-semibold mb-2 item-center">
                      Post Date : <span className="">{formatDate(Postdate)}</span>{" "}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
