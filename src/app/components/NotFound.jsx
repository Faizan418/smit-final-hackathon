import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <Image
        src="/notfound.png"
        alt="404 Illustration"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-6xl font-extrabold text-green-600 dark:text-green-400">
        404
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md text-center">
        Sorry, the page you visited does not exist
      </p>

      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition rounded-full shadow-lg"
      >
        ⬅️ Go Back to Home
      </a>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        Made with ❤️ by a Saylani Student <br /> Muhammad Faizan
      </p>
    </div>
  );
}
