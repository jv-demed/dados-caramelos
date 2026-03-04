import "@/app/globals.css";
import { MenuLayout } from "@/components/menu/MenuLayout";
import { UserProvider } from "@/providers/UserProvider";

export const metadata = {
  title: "Dados Caramelos do Vale",
};

export default function Layout({ children }) {
  return (
    <UserProvider>
      <MenuLayout />
      <div className="min-h-screen max-w-8xl mx-auto flex flex-col gap-4 md:gap-6 p-5 md:p-10">
        {children}
      </div>
    </UserProvider>
  );
}
