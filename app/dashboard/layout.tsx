import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
}
