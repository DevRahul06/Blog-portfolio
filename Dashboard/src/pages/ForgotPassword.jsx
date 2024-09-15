import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-componets/LoadingButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector((state) => state.forgotPassword);
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
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
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="flex min-h-[100vh] items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter Your Email for Reset Password .
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
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
                <Button type="submit" className="w-full" onClick={handleForgotPassword}>
                  Request Password
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
