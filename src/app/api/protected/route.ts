import { nextAuthConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(nextAuthConfig);

  if (session)
    return NextResponse.json({
      protectedContent: {
        someProperty: "high value data, that can only be viewed by admin role",
        anotherProperty: "Also super sensitive",
      },
      message: "You are authorized to view the content",
    });
  return NextResponse.json({
    message: "You are unauthorized to view this content",
  });
};
