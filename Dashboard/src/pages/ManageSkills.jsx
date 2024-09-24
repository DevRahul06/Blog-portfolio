import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clearAllSkillErrors, deleteSkills, getAllSkills, resetSkillSlice, updateSkills } from "@/store/slices/skillsSlice";
import { TabsContent } from "@radix-ui/react-tabs";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageSkills() {
  const { loading, error, skills, message } = useSelector(
    (state) => state.skills
  );
  const dispatch = useDispatch();
  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdate = (id) => {
    dispatch(updateSkills(id, newProficiency))
  };

  const handleDelete = (id) => {
    dispatch(deleteSkills(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, message, error, loading]);

  return (
    <>
      <div className="flex max-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Skills</CardTitle>
                <Link to={"/"}>
                  <Button className="w-fit"> Go to Dashboard</Button>
                </Link>
              </CardHeader>

              <CardContent className="grid sm:grid-cols-2 gap-4">
                {skills && skills.length > 0 ? (
                  skills.map((ele) => {
                    return (
                      <Card key={ele._id}>
                        <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                          {ele.title}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Trash2
                                  onClick={() => handleDelete(ele._id)}
                                  className="h-5 w-5 hover:text-red-500"
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                style={{ color: "red" }}
                              >
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardHeader>
                        <CardFooter>
                          <Label className="text-2xl mr-2">Proficiency</Label>
                          <Input
                            type="number"
                            defaultValue={ele.proficiency}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleUpdate(ele._id)}
                          />
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardTitle className="text-3xl overflow-y-hidden">
                    You Have note Added any skills
                  </CardTitle>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
