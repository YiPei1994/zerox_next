import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExerciseTabsProps = {
  instructions: string[];
};

export default function ExerciseTabs({ instructions }: ExerciseTabsProps) {
  return (
    <Tabs
      defaultValue="instructions"
      className="py-4 max-w-[95%] mx-auto overflow-auto"
    >
      <TabsList>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="statistic">Statistic</TabsTrigger>
      </TabsList>
      <TabsContent value="instructions">
        {instructions &&
          instructions.map((step, i) => (
            <p className="text-sm mb-2" key={i}>
              <span className="text-bold text-primary ">{i + 1}. </span> {step}
            </p>
          ))}
      </TabsContent>
      <TabsContent value="performance">
        Change your performance here.
      </TabsContent>
      <TabsContent value="statistic">Change your statistic here.</TabsContent>
    </Tabs>
  );
}
