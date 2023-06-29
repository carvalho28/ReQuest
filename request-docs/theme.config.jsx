import Image from "next/image";

export default {
  logo: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={50}
        height={50}
        style={{ marginRight: "1em" }}
      />{" "}
      <strong>ReQuest</strong>
    </div>
  ),
  project: {
    link: "https://github.com/carvalho28/ReQuest",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="ReQuest Documentation" />
      <meta name="og:title" content="ReQuest Documentation" />
    </>
  ),
  // ...
};
