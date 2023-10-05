import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationbar";
import { HOST } from "../../utils/constant";
import CardNFT from "../home/components/card-nfts";
import Loading from "../home/components/loading";

export default function FindPage(query: any) {
  const router = useRouter();
  const argument = router.query;
  const searchValue = argument.query;

  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItem] = useState<any>([]);
  // console.log("before", items);

  useEffect(() => {
    // console.log("call use effect");
    // if (searchValue == undefined) return;
    if (searchValue == undefined) return;
    console.log(`${HOST}/nft/search/${searchValue}`);
    axios.post(`${HOST}/nft/search/${searchValue}`).then((res) => {
      console.log("return value", res);
      setItem(res.data);
      setIsLoaded(true);
    });
  }, [searchValue]);

  if (!isLoaded) return <Loading />;
  return (
    <div className="bg-[#F0F9FF] h-screen">
      <NavigationBar searchQuery={searchValue} />
      {items.length == 0 ? (
        <div className="text-center text-xl pt-10">Item not found</div>
      ) : (
        <div className="flex items-center ml-5">
          <ul id="all" className="flex flex-wrap mt-10">
            {items.map((item: any) => (
              <li key={item._id} className="display:inline-block px-2">
                <CardNFT id={item._id} nft={item} />
              </li>
            ))}
          </ul>
          {/* {items.length} */}
        </div>
      )}
    </div>
  );
}
