import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";

const server = `http://localhost:8080/user/`;

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();
    console.log("Next.js API received:", reqData);
    
    const response = await axios.post(`${server}createUser`, reqData);
    console.log("Backend response:", response.data);
    
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || "Internal server error" },
      { status: error.response?.status || 500 },
    );
  }
}
