import Link from "next/link";
import lodash from "lodash";

function CardNFT({ id, nft }: { id: string; nft: any }) {
  return (
    <Link href={{ pathname: "./nft", query: { id: id } }}>
      <div className="relative flex-wrap w-60 h-60 inline-block">
        <img
          src={lodash.get(nft, "contentUrl")}
          alt=""
          className=" w-60 h-60 object-cover rounded-3xl"
        />
        <div className="absolute right-0 bottom-0 left-0 w-full h-32 overflow-hidden bg-gradient-to-t from-black opacity-75 rounded-b-3xl"></div>
        {/* <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-gradient-to-t from-black rounded-b-3xl"></div> */}
        <div className="w-auto h-12 absolute bottom-8 left-3 right-3 rounded-xl p-1 px-3">
          <div className="text-2xl font-bold text-white truncate">
            {lodash.get(nft, "name")}
          </div>
          <div className="text-sm  text-white">
            Price: {lodash.get(nft, "price")} BNB
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardNFT;
