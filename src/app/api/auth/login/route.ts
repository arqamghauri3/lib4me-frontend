import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const server = `http://localhost:8080`;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    const response = await apiFetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 }
    );
  }
}
export async function apiFetch(path: string, options: any = {}) {
  const res = await fetch(`${server}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.headers || {}),
    },
  });

  return res;
}

