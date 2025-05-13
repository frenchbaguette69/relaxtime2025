import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const sess = await auth();

  console.log("sess", sess);

  // @ts-ignore
  if (sess?.user?.role === "ADMIN") return redirect("/admin/quotes");

  return <></>;
};

export default page;
