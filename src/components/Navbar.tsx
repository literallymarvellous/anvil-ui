import Link from "next/link";
import AnvilInfo from "./AnvilInfo";

const navItems = ["accounts", "blocks", "transactions", "logs"];

const Navbar = () => {
  return (
    <header>
      <nav className="py-4 border-b">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => (
            <li key={item} className="">
              <Link href={`/${item}`} className="text-m uppercase">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <AnvilInfo />
    </header>
  );
};

export default Navbar;
