import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  req: NextRequest,
  { params }: { params: { centerId: string } }
) {
  const { centerId } = params;

  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.BACKEND_URL}/addprodutividade/${centerId}`,
      body,
      {
        headers: {
          Authorization: req.headers.get("authorization") || "",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao adicionar produtividade:", error.message);

    return NextResponse.json(
      { error: "Erro ao adicionar produtividade" },
      { status: error.response?.status || 500 }
    );
  }
}
