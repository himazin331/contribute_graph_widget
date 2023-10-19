import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Contribute Widget Demo",
  description: "Contribute Calender and Weekly Graph widget demo",
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
