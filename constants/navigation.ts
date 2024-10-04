import { ShoppingCart } from "lucide-react";
import { tabs } from "./temporary";

export const dashboardNav = [
  {
    name: "Gallery",
    href: "/dashboard",
    tabs,
    element: {
      icon: ShoppingCart,
    },
  },
];
