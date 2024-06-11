export default async function ProductsPage() {
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();

    return data;
  };

  const products = fetchProducts();
  console.log(products);
  return <div>ProductsPage</div>;
}
