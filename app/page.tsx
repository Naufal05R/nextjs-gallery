import Header from "@/components/Header";
import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <Header />
      <main className={cn(container.paddingX, "grid grid-cols-3 items-center gap-2 p-8 sm:p-20 sm:pt-40")}>
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} className="aspect-[3/2] w-full rounded-xl bg-gray-200"></div>
        ))}
      </main>
    </>
  );
}
