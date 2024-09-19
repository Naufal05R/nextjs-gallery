export default function Home() {
  return (
    <main className="grid grid-cols-3 items-center p-8 pb-20 gap-2 sm:p-20">
      {Array.from({ length: 200 }).map((_, i) => (
        <div key={i} className="w-full aspect-[3/2] rounded-xl bg-gray-200"></div>
      ))}
    </main>
  );
}
