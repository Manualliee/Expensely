import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  _: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    await prisma.expense.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }
}
