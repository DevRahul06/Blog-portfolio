import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const dispatch = useDispatch();

  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user.twitterURL === "undefined" ? "" : user.twitterURL
  );
  const [linkedInURL, setLinkedInURL] = useState(
    user.linkedInURL === "undefined" ? "" : user.linkedInURL
  );
  const [facebookURL, setFacebookURL] = useState(
    user.facebookURL === "undefined" ? "" : user.facebookURL
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);


  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview ? avatarPreview : "/vite.svg"}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={avatarHandler}
                    className="avatar-update-btn"
                  />
                </div>
              </div>

              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Resume</Label>
                <Link
                  to={user && user.resume && user.resume.url}
                  target="_blank"
                >
                  <img
                    src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
                <div className="relative">
                  <input
                    type="file"
                    onChange={resumeHandler}
                    className="avatar-update-btn"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>FullName</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Full Email"
              />
            </div>

            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 **********"
              />
            </div>

            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                type="text"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="About your self"
              />
            </div>

            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                type="text"
                value={instagramURL}
                onChange={(e) => setInstagramURL(e.target.value)}
                placeholder="Insta URL"
              />
            </div>

            <div className="grid gap-2">
              <Label>Twitter URL</Label>
              <Input
                type="text"
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
                placeholder="twitter URL"
              />
            </div>

            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                type="text"
                value={linkedInURL}
                onChange={(e) => setLinkedInURL(e.target.value)}
                placeholder="Linkedin URL"
              />
            </div>

            <div className="grid gap-2">
              <Label>facebookURL</Label>
              <Input
                type="text"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
                placeholder="FaceBook URL"
              />
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={handleUpdateProfile}>
                  Update Profile
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
