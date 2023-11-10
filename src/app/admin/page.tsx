import { nextAuthConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

type DataType = {
  protectedContent?: {
    someProperty: string;
    anotherProperty: string;
  };
  message?: string;
};
export default async function AdminPage() {
  const session = await getServerSession(nextAuthConfig);
  let data: DataType = {};
  if (session?.user.role === "admin") {
    data = {
      protectedContent: {
        someProperty: "high value data, that can only be viewed by admin role",
        anotherProperty: "Also super sensitive",
      },
      message: "You are logged in as admin",
    };
  } else {
    redirect("/?from=admin", RedirectType.push);
  }

  return (
    <div>
      <h1>This page is server-rendered</h1>
      <h3>{data?.message}</h3>
      <code></code>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
