import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { apiFetch } from "../login/route";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await apiFetch("/user/fetchUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieHeader, 
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.message || "Failed to fetch user" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
