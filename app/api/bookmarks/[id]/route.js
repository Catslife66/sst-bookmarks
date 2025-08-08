import { auth } from "@/app/actions";
import { deleteBookmark, getBookmark, updateBookmark } from "@/app/lib/actions";
import { safeParse } from "valibot";
import { NextResponse } from "next/server";
import { bookmarkSchema, uuidSchema } from "@/app/lib/validators";

export async function GET(request, { params }) {
  const { id } = await params;
  const subject = await auth();

  if (!subject) {
    return NextResponse.json(
      { error: "You are not authorised to view this bookmark." },
      { status: 403 }
    );
  }

  try {
    const bookmark = await getBookmark(id);
    if (!bookmark) {
      return NextResponse.json(
        { error: "This bookmark ID is not associated with any bookmarks." },
        { status: 404 }
      );
    }
    if (bookmark.userId !== subject.properties.id) {
      return NextResponse.json(
        { error: "You are not authorised to view this bookmark." },
        { status: 403 }
      );
    }
    return NextResponse.json({ bookmark: bookmark }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e?.response?.data?.detail ||
          e?.response?.data?.error ||
          e?.message ||
          "Something went wrong",
      },
      { status: e?.response?.status || 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const requestData = await request.json();
  const subject = await auth();

  if (!subject) {
    return NextResponse.json(
      { error: "You are not authorised to modify this bookmark." },
      { status: 403 }
    );
  }

  try {
    const formData = {
      ...requestData,
      userId: subject.properties.id,
    };
    const result = safeParse(bookmarkSchema, formData);

    if (!result.success) {
      return NextResponse.json({ error: result.issues }, { status: 400 });
    }

    const updatedBookmark = await updateBookmark(id, result.output);
    return NextResponse.json({ bookmark: updatedBookmark }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e?.response?.data?.detail ||
          e?.response?.data?.error ||
          e?.message ||
          "Something went wrong",
      },
      { status: e?.response?.status || 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const subject = await auth();

  if (!subject) {
    return NextResponse.json(
      { error: "You are not authorised to modify this bookmark." },
      { status: 403 }
    );
  }

  try {
    await deleteBookmark(id);
    return NextResponse.json({ message: "Bookmark deleted." }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e?.response?.data?.detail ||
          e?.response?.data?.error ||
          e?.message ||
          "Something went wrong",
      },
      { status: e?.response?.status || 500 }
    );
  }
}
