import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Providers";
import ReactQueryProvider from "@/utils/reactQuery";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Quick",
  description: "Quick Commerce & Delivery Tracking ",
};


export default function RootLayout({ children }) {
  return (
  
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <AuthProvider>
          <Toaster />
          <AppContextProvider>
            <ReactQueryProvider>
            {children}
            </ReactQueryProvider>
          </AppContextProvider>
          </AuthProvider>
        </body>
      </html>
  );
}
