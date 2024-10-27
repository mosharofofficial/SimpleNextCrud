import AuthProvider from "./components/Providers";
import "./globals.css";

export const metadata = {
  title: "Simple Next Crud",
  description: "Simple crud operation using next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
