import { getAllProducts } from "@/lib/data-servise";

export default async function ProductsPage() {
  const products = await getAllProducts();
  console.log(products);
  return <div>ProductsPage</div>;
}
