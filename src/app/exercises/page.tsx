import { getAllExercises } from "@/lib/data-servise";

export default async function ProductsPage() {
  const exercises = await getAllExercises();

  return <div>ProductsPage</div>;
}
