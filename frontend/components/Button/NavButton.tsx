import Link from "next/link";

type Props = {
  to: string;
  name: string;
};

export default function NavButton({ to, name }: Props) {
  return (
    <Link
      href={to}
      className="px-2 py-2 rounded-md w-max self-center
      bg-slate-400 text-white hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg duration-300"
    >
      {name}
    </Link>
  );
}
