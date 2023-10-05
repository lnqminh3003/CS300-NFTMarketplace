import Link from "next/link";

function GetMoney({ address, nft }: any) {
  return (
    <Link
      href={{ pathname: "./getMoney", query: { id: address } }}
      className="block text-gray-700 font-semibold hover:text-sky-600 hover:font-bold bg-slate-200 p-1 px-2 rounded-xl text-center"
    >
      Withdraw
    </Link>
  );
}

export default GetMoney;
