import Link from "next/link";
import { useEffect, useState } from "react";
import { HOST } from "../../../utils/constant";
import CardNFT from "./card-nfts";

function NFT({ id, nft, index }: any) {
  const fileUrl = (nft.contentUrl as string) ?? "";

  return (
    <Link href={{ pathname: "./nft", query: { id: id } }}>
      <div className="flex items-center mt-5 ">
        <div className="text-gray-500 mr-8 font-bold">{index}</div>
        <img
          src={fileUrl}
          alt=""
          className=" w-20 h-20 object-cover rounded-xl"
        />
        <div className="font-semibold ml-5 ">{nft.name}</div>
        <div className="text-sm font-semibold ml-auto">{nft.price} BNB</div>
      </div>
    </Link>
  );
}

function ListOut({ items }: any) {
  return (
    <div
      id="all"
      className="grid grid-rows-5 grid-cols-2 grid-flow-col gap-y-px mx-40 auto-cols-max gap-x-20"
    >
      {items.map((item: any, index: any) => (
        <div key={item._id} className="display:indivne-block px-2">
          <NFT id={item._id} nft={item} index={index} />
        </div>
      ))}
    </div>
  );
}

export default function TrendingTop() {
  const [isTrendingOrTop, setTrendingOrTop] = useState("trending");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${HOST}/nft/get-all`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const trendingItems = items.sort((a, b) => 0.5 - Math.random()).slice(0, 10);
  const topItems = items.sort((a, b) => 0.5 - Math.random()).slice(0, 10);

  return (
    <div className="relative">
      <div className="flex flex-row space-x-10 ml-40 mt-20">
        <button
          className={`${
            isTrendingOrTop == "trending" ? "text-black" : "text-gray-400"
          } text-2xl font-semibold ${
            isTrendingOrTop == "trending" ? "underline" : ""
          } underline-offset-8`}
          onClick={() => setTrendingOrTop("trending")}
        >
          Trending
        </button>
        <button
          className={`${
            isTrendingOrTop == "top" ? "text-black" : "text-gray-400"
          } text-2xl font-semibold ${
            isTrendingOrTop == "top" ? "underline" : ""
          } underline-offset-8`}
          onClick={() => setTrendingOrTop("top")}
        >
          Top
        </button>
      </div>
      <hr className="mx-20 h-0.5 bg-gray-300 border-0" />
      {/* <div className="mt-5">
                <ul id="all" className="flex overflow-x-auto whitespace-nowrap no-scrollbar mx-36">
            {trendingItems.map((item) => (<li className="display:inline-block px-2"><CardNFT id={item._id} nft={item}/></li>))}
                </ul>
            </div> */}
      <ListOut items={trendingItems} />
    </div>
  );
}
