import { nextAuthConfig } from "@/auth";
import { getServerSession } from "next-auth";
import React from "react";

const ServerPage = async () => {
  const session = await getServerSession(nextAuthConfig);
  return (
    <div>
      <h1>ServerPage</h1>
      <h3>Session object on server side, pre-rendered serverside:</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default ServerPage;
