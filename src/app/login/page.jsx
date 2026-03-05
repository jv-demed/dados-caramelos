"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/supabase/auth";
import { Button, Input } from "antd";

export default function LoginPage() {
  const router = useRouter();

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    await login(auth).then((res) => {
      if (res.success) router.push("/");
    });
  }

  return (
    <main className="w-screen h-screen max-w-3xl mx-auto flex flex-col gap-4 md:gap-6 justify-center p-10">
      <h1 className="text-xl md:text-2xl font-semibold">Entrar</h1>
      <form className="flex flex-col gap-4 w-full">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            value={auth.email}
            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
            placeholder="Digite o email"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Senha</label>
          <Input
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            placeholder="Digite a senha"
            type="password"
          />
        </div>
        <Button type="primary" onClick={handleSubmit} className="w-full">
          Entrar
        </Button>
      </form>
    </main>
  );
}
