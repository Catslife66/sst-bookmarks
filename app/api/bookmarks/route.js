import { NextResponse } from "next/server";
import { safeParse } from "valibot";
import { auth } from "@/app/actions";
import { bookmarkSchema } from "@/app/lib/validators";
import { createBookmark } from "@/app/lib/actions";

export async function POST(request) {
  const requestData = await request.json();
  const subject = await auth();
  const formData = {
    ...requestData,
    userId: subject.properties.id,
  };
  const result = safeParse(bookmarkSchema, formData);
  if (!result.success) {
    return NextResponse.json({ error: result.issues }, { status: 400 });
  }
  try {
    const bookmark = await createBookmark(result.output);
    return NextResponse.json({ bookmark: bookmark }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e.response.data },
      { status: e.response.status || 500 }
    );
  }
}
