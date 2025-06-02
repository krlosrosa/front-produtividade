'use client'
import { ReactNode } from "react";
import NextAuthProvider from "./next-auth";
import ReactQueryProvider from "./react-query";
import ToastNotifyProvider from "./toast-notify";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        {children}
        <ToastNotifyProvider />
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
