import Header from "@/components/Header";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
}
