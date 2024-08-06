import { Outfit } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import MobileNavigation from "./_components/MobileNavigation";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import ClientProvider from "@/store/ClientProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Azonto Studio",
  description: "Photography Studio",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="bg-neutral-900 grid place-items-center">
          <ToastContainer />
          <div className="bg-neutral-900 flex flex-col items-center xl:ml-20 xl:mr-20">
            <Header />
            <MobileNavigation />
            <ClientProvider>

            {children}

            </ClientProvider>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
