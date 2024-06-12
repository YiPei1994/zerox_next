import dbConnect from "@/lib/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
