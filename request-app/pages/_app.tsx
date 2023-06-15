import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/tiptap.scss";
import "@/styles/uppy.css";
import "@/styles/scrollbar.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";

// for loads
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
});

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && setLoading(true);
    };
    const handleComplete = (url: string) => {
      url !== router.asPath && setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white opacity-50 z-50 flex items-center justify-center">
          <div className="w-20 h-20 bg-transparent rounded-md animate-pulse mx-auto">
            <Image src="/logo.svg" alt="logo" width={500} height={500} />
          </div>
        </div>
      )}
    </>
  );
}

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <main className={inter.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        {/* <Loading /> */}
        <Component {...pageProps} />
      </SessionContextProvider>
    </main>
  );
}
