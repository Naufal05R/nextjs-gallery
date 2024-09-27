import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-3 items-center gap-2 p-8 pb-20 sm:p-20">
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} className="aspect-[3/2] w-full rounded-xl bg-gray-200"></div>
        ))}
      </main>
    </>
  );
}
