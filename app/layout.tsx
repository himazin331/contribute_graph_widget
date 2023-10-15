import "@/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute Widget Sample",
  description: "Contribute Calender and Weekly Graph widget sample",
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
