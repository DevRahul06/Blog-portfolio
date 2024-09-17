import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import { clearAllMessagesErrors, deleteMessage, getAllMessages, resetMessageSlice } from "@/store/slices/messageSlice";
import { toast } from "react-toastify";

export default function Message() {
  const navigateTo = useNavigate();
  const  dispatch= useDispatch()

  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageID] = useState("");

  const handleMessageDelete = (id) => {
    setMessageID(id);
    dispatch(deleteMessage(id));
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllMessagesErrors())
    }
    if(message){
      toast.success(message)
      dispatch(resetMessageSlice())
      dispatch(getAllMessages())
    }
  },[dispatch, error, message, loading])

  return (
    <>
      <div className="min-h-[100vh] mr-6 gap-4 py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Message</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((ele) => {
                    return (
                      <Card key={ele._id} className="grid gap-2 p-6">
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">
                            {" "}
                            Sender Name :{" "}
                          </span>
                          {ele.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2"> Subject : </span>
                          {ele.subject}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2"> Message : </span>
                          {ele.message}
                        </CardDescription>
                        <CardFooter className="justify-end">
                          {loading && messageId === ele._id ? (
                            <LoadingButton
                              width={"w-52"}
                              content={"Delete Message"}
                            />
                          ) : (
                            <Button
                              className="w-52"
                              onClick={() => handleMessageDelete(ele._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader>No Message Found</CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
