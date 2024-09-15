import React, { useState, useEffect } from "react";
import LoadingButton from "./sub-componets/LoadingButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgotPasswordErrors, resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

export default function ResetPassword() {

  const dispatch = useDispatch()
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { loading, error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  const handleresetPassword = () => {
    dispatch(resetPassword(token, password, confirmNewPassword));

  };


  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors);
    }

    if (isAuthenticated) {
      navigateTo("/");
    }

    if (message !== null) {
      toast.success(message);
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated, error, loading]);




  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="flex min-h-[100vh] items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Set New Password .
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Confrim Password</Label>
                <Input
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Link
                    to={"/login"}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Remember Your password?
                  </Link>
                </div>
              </div>

              {loading ? (
                <LoadingButton content={"Requesting"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleresetPassword}
                >
                  Reset Password
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
