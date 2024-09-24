import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resettimelineslice,
} from "@/store/slices/timelineslice";
import { toast } from "react-toastify";

export default function AddTimeline() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);

    dispatch(addTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resettimelineslice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[80vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form className="w-[100%] px-5 md:w-[950px]">
          <div className="space y-12">
            <div className="border-b border-x-gray-900/10 pb-10">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                {" "}
                ADD NEW TIMELINE
              </h2>

              <div className="mt-4 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        placeholder="Gradution"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    From
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="Text"
                        placeholder="Starting Date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    To
                  </label>
                  <div className="mt-1">
                    <div className="flex rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        placeholder="Ending Date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingButton content={"Add New Timeline"} />
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md mt-5 w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Timeline
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
