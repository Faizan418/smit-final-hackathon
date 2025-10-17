import { label } from "framer-motion/client";
import Logout from "./components/Logout";

export default function HomePage() {
  
  return (
    <div>
      {/* <div className="cursor"></div> */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Home Page!
          <br />
          <br />
          <br />
          <br />
        </h1>
        <Logout />
      </div>
    </div>
  );
}
