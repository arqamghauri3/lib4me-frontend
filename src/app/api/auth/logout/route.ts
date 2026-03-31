import { NextResponse, type NextRequest } from "next/server";
import { apiFetch } from "../login/route";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const response = await apiFetch("/logout", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        cookieHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status },
      );
    }

    (await cookies()).delete("JSESSIONID");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    console.error("Logout error:", error?.message ?? error);
    return NextResponse.json(
      { error: "Server error during logout" },
      { status: 500 },
    );
  }
}
