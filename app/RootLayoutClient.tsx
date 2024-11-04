// app/RootLayoutClient.tsx
"use client";

import Nav from "./Components/NavBar/Nav";
import LogInModal from "./Components/Models/LogInModel";
import RegisterModal from "./Components/Models/RegisterModel";
import RentModel from "./Components/Models/RentModel";
import ToasterProvider from "./Providers/toasterProvider";
import { SessionProvider } from "next-auth/react";
export default function RootLayoutClient({
  children,
  session
}: {
  children: React.ReactNode;
  session:any;
}) {
  return (
    <>
    <SessionProvider session={session}>
      <ToasterProvider/>
      <RegisterModal/>
      <LogInModal/>
      <RentModel/>
      <Nav />
      {children}
      </SessionProvider>
    </>
  );
}
