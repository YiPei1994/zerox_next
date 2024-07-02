import ExerciseFilter from "./ExerciseFilter";
import ExercisesList from "./ExercisesList";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const filter = searchParams.category ?? "all";

  return (
    <div>
      <ExerciseFilter />
      <ExercisesList filter={filter} />
    </div>
  );
}
