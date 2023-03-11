import Header from "@/components/Header"
import Head from "next/head"

export default function Home() {
  return (
    <div className="h-screen custom-background">
      <Head>
        <title>ReQuest App</title>
        <meta name="description" content="Generated by create nex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className=""></div>
    </div>
  )
}
