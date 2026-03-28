import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "../auth/login/route";
import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";

export async function GET() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    
  try {
    const response = await apiFetch("/library/fetchLibrary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieHeader, 
        },
      });
      console.log(response)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: errorData.message || "Failed to fetch user" },
          { status: response.status },
        );
      }
    const data = await response.json();
  return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
          { error: "Network Server Error" },
          { status: HttpStatusCode.BadGateway },
        );
  }
}


export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    
  try {
    const body = await request.json();
    console.log(body)
    const response = await apiFetch("/library/add-books?status=READING", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieHeader, 
        },
        body: JSON.stringify(body),
      });
      console.log(response)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: errorData.message || "Failed to fetch user" },
          { status: response.status },
        );
      }
    const data = await response.json();
  return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
          { error: "Network Server Error" },
          { status: HttpStatusCode.BadGateway },
        );
  }
    
}