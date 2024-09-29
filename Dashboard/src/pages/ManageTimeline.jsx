import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resettimelineslice,
} from "@/store/slices/timelineslice";
import { TabsContent } from "@radix-ui/react-tabs";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageTimeline() {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
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
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen p-2 w-full flex-col ">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline.length > 0 ? (
                    timeline.map((ele) => {
                      return (
                        <TableRow className="bg-accent" key={ele._id}>
                          <TableCell className="font-medium">
                            {ele.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {ele.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {ele.timeline.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {ele.timeline.to ? ele.timeline.to : "Present"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                              onClick={() => handleDeleteTimeline(ele._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any timeline.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
