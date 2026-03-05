"use client";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/supabase/auth";
import { Menu } from "antd";
import { navItems } from "@/data/navMenu";

export function TopMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async (e) => {
    if (e.key === "/login") {
      await logout();
    }
    router.push(e.key);
  };

  return (
    <div className="fixed top-0 left-0 right-0 md:hidden bg-white shadow-md z-[9999]">
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        onClick={handleClick}
        items={navItems}
        className="flex justify-around border-none"
      />
    </div>
  );
}
