import "@/app/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata = {
  title: "Dados Caramelos do Vale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="antialiased h-[100vh]">
        <AntdRegistry>
          <div className="h-full">{children}</div>
        </AntdRegistry>
      </body>
    </html>
  );
}
