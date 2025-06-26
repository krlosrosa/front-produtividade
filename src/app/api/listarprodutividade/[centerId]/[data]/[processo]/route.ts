import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { centerId: string; data: string; processo: string } }
) {
  const { centerId, data, processo } = params;

  try {
    // Substitua a URL abaixo pela URL real da sua API Express (pode ser interna ou externa)
    const response = await axios.get(
      `${process.env.BACKEND_URL}/listarprodutibidade/${centerId}/${data}/${processo}`,
      {
        headers: {
          // Se necessário, passe tokens ou headers extras aqui
          Authorization: req.headers.get("authorization") || "",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Erro ao buscar produtividade:", error.message);
    return NextResponse.json(
      { error: "Erro ao buscar produtividade" },
      { status: error.response?.status || 500 }
    );
  }
}
