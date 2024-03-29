import Image from "next/image";

/**
 * Custom404 page is the page displayed when a user tries to access a page that doesn't exist
 * @returns Returns the Custom404 page
 */
export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        alt="404"
        src="/404.svg"
        width={1000}
        height={1000}
        className="mt-8"
      />
      <button
        className="bg-contrast hover:contrasthover text-white font-bold py-2 px-4 rounded-lg mt-8 text-2xl"
        onClick={() => window.location.replace("/")}
      >
        Go back home
      </button>
    </div>
  );
}
