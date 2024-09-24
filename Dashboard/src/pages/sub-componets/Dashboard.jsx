import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllSoftwareErrors,
  deleteSoftware,
  getAllSoftware,
  resetSoftwareSlice,
} from "@/store/slices/softwareSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { blogs } = useSelector((state) => state.blogs);
  const { skills } = useSelector((state) => state.skills);
  const { software, error, loading, message } = useSelector(
    (state) => state.software
  );
  const { timeline } = useSelector((state) => state.timeline);

  const [appId, setAppId] = useState("");

  const handleDeleteSoftware = (id) => {
    setAppId(id);
    dispatch(deleteSoftware(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(appError);
      dispatch(clearAllSoftwareErrors());

    }
    if (message) {
      toast.success(message);
      setAppId(null);
      dispatch(resetSoftwareSlice());
      dispatch(getAllSoftware());
    }
  }, [dispatch, error, loading, message]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed text-base">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex">
                  <Link to={user.portfolioURL && user.portfolioURL}>
                    <Button>Go To PORTFOLIO</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-3">
                  <CardTitle>Blog Posted</CardTitle>
                  <CardTitle className="text-6xl">
                    {blogs && blogs.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-start">
                  <Link to={"/manage/blogs"}>
                    <Button>Manage Blogs</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-3">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-start">
                  <Link to={"/manage/skills"}>
                    <Button>Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Blogs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Tag
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Author
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogs && blogs.length > 0 ? (
                          blogs.map((ele) => {
                            return (
                              <TableRow className="bg-accent" key={ele._id}>
                                <TableCell>
                                  <div className="font-semibold">
                                    {ele.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {ele.tag}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {ele.author}
                                </TableCell>
                                <TableCell>
                                  <Link to={`/update/blog/${ele._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={ele.blogLink ? `${ele.blogLink}` : ""}
                                  >
                                    <Button>View</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              No blog found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="gap-3 px-7">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((ele) => {
                        return (
                          <Card key={ele._id}>
                            <CardHeader className="font-semibold">
                              {ele.title}
                            </CardHeader>
                            <CardFooter>
                              <Progress value={ele.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl overflow-y-hidden">
                        No blog found.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Use for Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {software && software.length > 0 ? (
                          software.map((ele) => {
                            return (
                              <TableRow key={ele._id} className="bg-accent">
                                <TableCell>{ele.name}</TableCell>
                                <TableCell>
                                  <img
                                    className="w-7 h-7"
                                    src={ele.svg && ele.svg.url}
                                    alt={ele.name}
                                  />
                                </TableCell>
                                <TableCell>
                                {loading && appId === ele._id ? (
                                    <LoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftware(ele._id)
                                      }
                                    >
                                      Delete
                                    </Button>)}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have No added any software
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>TimeLine</CardTitle>
                    <Link to={"/manage/timeline"}>
                      <Button> Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead className="text-right">To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((ele) => {
                            return (
                              <TableRow key={ele._id}>
                                <TableCell className="font-medium">
                                  {ele.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {ele.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell text-right">
                                  {ele.timeline.to
                                    ? `${ele.timeline.to}`
                                    : "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              No Timeline added
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
