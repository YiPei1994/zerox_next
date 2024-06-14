export default function page({ params }: { params: { exerciseId: string } }) {
  console.log(params.exerciseId);
  return <div>page</div>;
}
