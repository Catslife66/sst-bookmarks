import { auth } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(request) {
  const subject = await auth();

  if (!subject) {
    return NextResponse.json({ subject: null }, { status: 401 });
  }

  return NextResponse.json({ subject: subject }, { status: 200 });
}
