import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, getUser, resetProfile, updatePasword } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

export default function UpdatePassword() {
  const dispatch = useDispatch();

  const {loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );


  const [currentPassword, SetCurrentPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const [confirmNewPassword, SetConfirmNewPassword] = useState("");

  const handleUpdatePassword = () => {
    dispatch(updatePasword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearAllUserErrors())
    }

    if(isUpdated){
      dispatch(getUser());
      dispatch(resetProfile())
    }

    if(message){
      toast.success(message)
    }

  })

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5">Update Your Password</p>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5"></div>

            <div className="grid gap-2">
              <Label>Current Password</Label>
              <Input
                type="text"
                value={currentPassword}
                onChange={(e) => SetCurrentPassword(e.target.value)}
                placeholder="Current Password"
              />
            </div>

            <div className="grid gap-2">
              <Label>New Password</Label>
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => SetNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>

            <div className="grid gap-2">
              <Label>Confrim Password</Label>
              <Input
                type="text"
                value={confirmNewPassword}
                onChange={(e) => SetConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
              />
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={handleUpdatePassword}>
                  Update Password
                </Button>
              ) : (
                <LoadingButton content={"Updating ...."} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
