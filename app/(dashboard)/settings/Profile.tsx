"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/Auth";
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
import EnterPasswordModal from "@/components/enter-password";
import { siteConfig } from "@/config/site";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = require("stripe")(
    "sk_test_51KsFpgEewcpAM4MfqUhXKeEnFfdHkN0Btxdxi4pLQzB45cOWyGtk1ujQsZWfT5RIOcijIZqyIrUpeVfJtGxHuMmz00rGEWP0qm"
  );
  const ManageSub = async () => {
    setIsLoading(true);
    const session = await stripe.billingPortal.sessions.create({
      customer: "cus_Ns5BZPlhGnvG7w",
      return_url: `${siteConfig.url}/settings`,
    });

    window.location.href = session.url;
  };

  return (
    <div className="h-full flex-grow p-8 border rounded-md relative">
      <Button onClick={ManageSub} className="absolute top-4 right-4">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Manage Subscription
      </Button>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 ">
          <PersonalInfo />
          <AccountSettings />
        </div>
        {/* <AdvancedSettings /> */}
      </div>
    </div>
  );
};

export default Profile;

const PersonalInfo = () => {
  const [edit, setEdit] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  const { currentUser, changeUserDisplayName, changeUserEmail } = useAuth()!;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaveLoading(true);
    if (
      nameRef.current?.value !== currentUser?.displayName &&
      nameRef.current?.value !== undefined
    ) {
      await changeUserDisplayName(nameRef.current?.value);
      toast({
        title: "Success",
        description: "Your name has been updated",
        variant: "default",
      });
    }
    if (
      emailRef.current?.value !== currentUser?.email &&
      emailRef.current?.value !== undefined &&
      confirmPassRef.current?.value !== undefined
    ) {
      const res = await changeUserEmail(
        emailRef.current?.value,
        confirmPassRef.current?.value
      );
      if (res?.error) {
        console.log(res);
        toast({
          title: "Error",
          description: "There was an error updating your email",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your email has been updated",
          variant: "default",
        });
      }
      confirmPassRef.current.value = "";
    }
    setIsSaveLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-2xl text-primary ">Personal Info</h2>
      <div className="flex flex-col gap-4 rounded-md relative">
        <div className="flex flex-col w-full ">
          <label className="text-base text-primary  ">Name</label>
          <p className="text-sm text-muted-foreground mb-3  ">
            This is only for display
          </p>
          <Input
            ref={nameRef}
            defaultValue={currentUser?.displayName || ""}
            type="text"
          />
        </div>

        <div className="flex flex-col w-full ">
          <label className="text-base text-primary  ">Email</label>
          <p className="text-sm text-muted-foreground mb-3  ">
            This is the email you use to login
          </p>
          <Input
            ref={emailRef}
            defaultValue={currentUser?.email || ""}
            type={"email"}
          />
        </div>
        <div className="flex gap-2 items-center">
          <PasswordInput
            ref={confirmPassRef}
            placeholder="enter password to update email"
            className=" w-[50%]"
          />
        </div>

        <Button
          onClick={handleSave}
          variant="secondary"
          size="lg"
          className="w-fit"
        >
          {isSaveLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  const newPass = useRef<HTMLInputElement>(null);
  const newPassConfirm = useRef<HTMLInputElement>(null);
  const currentPass = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { changeUserPassword, resetPassword } = useAuth()!;
  const handleUpdatePassword = async () => {
    setIsLoading(true);
    if (
      newPass.current?.value !== newPassConfirm.current?.value ||
      newPass.current?.value === undefined ||
      newPassConfirm.current?.value === undefined
    ) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);

      return;
    }
    if (currentPass.current?.value === undefined) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      });
      setIsLoading(false);

      return;
    }
    const res = await changeUserPassword(
      currentPass.current?.value,
      newPass.current?.value
    );
    setIsLoading(false);

    if (res?.error) {
      console.log(res);
      toast({
        title: "Error",
        description: "there was an problem updating your password",
        variant: "destructive",
      });
    } else {
      newPass.current.value = "";
      newPassConfirm.current.value = "";
      currentPass.current.value = "";
      toast({
        title: "Success",
        description: "Your password has been updated",
        variant: "default",
      });
    }
  };

  const handleResetPassword = async () => {
    const res = await resetPassword();
    if (res?.error) {
      toast({
        title: "Error",
        description: "there was an problem resetting your password",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description:
          "We sent you a reset link. Be sure to check your spam too.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className=" text-2xl text-primary">Password</h2>
      <div className="flex flex-col gap-2  rounded-md relative">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 w-full gap-4 justify-between">
            <PasswordInput
              ref={newPass}
              id="newPassword"
              placeholder="New password"
            />
            <PasswordInput
              ref={newPassConfirm}
              id="newPasswordConfirm"
              placeholder="Confirm new password"
            />
          </div>
          <PasswordInput
            ref={currentPass}
            id="currentPassword"
            placeholder="Current password"
          />
          <div className="w-full">
            <Button
              onClick={handleUpdatePassword}
              className="w-full"
              variant="secondary"
              size="lg"
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Password
            </Button>
          </div>
          <div className="w-fit mx-auto items-center text-center flex  text-gray-500">
            Can&apos;t remember your password?
            <Button
              variant="link"
              onClick={handleResetPassword}
              className="text-base font-bold text-c1 hover:opacity-80 underline"
            >
              Reset your password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedSettings = () => {
  return (
    <div className="flex flex-row justify-between p-8  gap-2 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-primary">Advanced Settings</h2>
        <button className=" w-fit text-destructive">Reset to default</button>
      </div>
      <div className="flex flex-col gap-4 border-2 border-border p-4 rounded-md">
        <SettingSelector
          value={true}
          placeholder="Allow this advanced settings to work"
          description="This is an example of a settings field and how it will look"
        />
        <SettingSelector
          value={false}
          placeholder="Allow this advanced settings to work"
          description="This is an example of a settings field and how it will look"
        />
        <SettingSelector
          value={true}
          placeholder="Allow this advanced settings to work"
          description="This is an example of a settings field and how it will look"
        />
        <SettingSelector
          value={false}
          placeholder="Allow this advanced settings to work"
          description="This is an example of a settings field and how it will look"
        />
      </div>
    </div>
  );
};

const SettingSelector = ({
  placeholder,
  description,
  functionality,
  value,
}: any) => {
  const [selected, setSelected] = useState(value);

  const handleClick = () => {
    setSelected(!selected);
    // functionality();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-top gap-4 group cursor-pointer"
    >
      <button
        className={`${
          selected ? "bg-primary" : "group-hover:bg-accent "
        } h-5 w-5 border-border border-2 mt-1 rounded-md  cursor-pointer flex justify-center items-center`}
      >
        {selected && <Icons.check className="h-5 w-5 text-background " />}
      </button>
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">{placeholder}</h1>
        <h2 className="text-muted-foreground text-sm">{description}</h2>
      </div>
    </div>
  );
};
