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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  clearAllBlogErros,
  deleteBlog,
  getAllBlogs,
  resetBlogSlice,
} from "@/store/slices/blogSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageBlogs() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, blogs, error, message } = useSelector(
    (state) => state.blogs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
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
  }, [dispatch, message, error, loading]);

  return (
    <>
      <div className="flex min-h-screen w-full px-2 flex-col bg-muted/40">
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Blogs</CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="md:table-cell">Tag</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBlogs.length > 0 ? (
                      currentBlogs.map((element) => {
                        return (
                          <TableRow key={element._id}>
                            <TableCell>
                              <div>
                                <img
                                  src={
                                    element.blogImage && element.blogImage.url
                                  }
                                  alt={element.title}
                                  className="w-28 h-16"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {element.title}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.tag}
                            </TableCell>
                            <TableCell className="flex  justify-end align-middle gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/blog/${element._id}`}>
                                      <button
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                                    justify-center align-middle items-center text-green-600  hover:text-slate-950
                                                   hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/blog/${element._id}`}>
                                      <button
                                        className="border-yellow-600 border-2 rounded-full h-8 w-8 flex 
                                                    justify-center align-middle items-center text-yellow-600  hover:text-slate-950
                                                   hover:bg-yellow-600"
                                      >
                                        <Pen className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    Update
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                                                    justify-center align-middle items-center text-red-600  hover:text-slate-50
                                                   hover:bg-red-600"
                                      onClick={() => handleDelete(element._id)}
                                    >
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    Detele
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow className="text-2xl">
                        <TableCell>You have not added any Blog.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Pagination className="mt-4 flex justify-end space-x-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                      />
                    </PaginationItem>

                    {/* Render page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === index + 1}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
