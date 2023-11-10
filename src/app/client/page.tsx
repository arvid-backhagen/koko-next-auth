"use client";
import { useSession } from "next-auth/react";
import React from "react";

const ClientPage = () => {
  const session = useSession();
  console.log("Frontend session object:", session);
  return <div>ClientPage</div>;
};

export default ClientPage;
