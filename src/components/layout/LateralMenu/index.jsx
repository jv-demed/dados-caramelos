"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/supabase/auth";
import { Menu } from "antd";
import { navItems } from "@/data/navMenu";

export function LateralMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async (e) => {
    if (e.key === "/login") {
      await logout();
    }
    router.push(e.key);
  };

  return (
    <div className="h-screen w-64 border-r">
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        onClick={handleClick}
        items={navItems}
        className="h-full border-none"
      />
    </div>
  );
}
