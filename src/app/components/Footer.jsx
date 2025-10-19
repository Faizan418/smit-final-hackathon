import Logout from "./Logout";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white text-center py-6 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} HealthMate – Sehat ka Smart Dost. <br />
        Built with 💚 by Muhammad Faizan
      </p>
        <Logout />
    </footer>
  );
}
