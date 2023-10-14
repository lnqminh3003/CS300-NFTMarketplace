import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from "../../components/navigationbar";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import CardNFT from "../home/components/card-nfts";
import CardNFTCreated from "../home/components/card-nft-created";
import { HOST } from "../../utils/constant";
import CardNFTMetamask from '../home/components/card-nft-metamask';

declare let window: any;
var firstTime = false;
var arrayID: Array<String> = [];

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [isLoaded, setIsLoaded] = useState(false);
  const [nft, setNFT] = useState([]);
  const [nftCreated, setNFTCreated] = useState([]);
  const [arrayRender, setArrayRender] = useState(Array<String>);

  useEffect(() => {
    fetch(`${HOST}/nft/getNFT/${localStorage.getItem("account")}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setNFT(result);
          console.log(nft);
        },
        (error) => {
          setIsLoaded(true);
        }
      );

    fetch(`${HOST}/nftCreate/getNFT/${localStorage.getItem("account")}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setNFTCreated(result);
        console.log(nftCreated);
      },
      (error) => {
        setIsLoaded(true);
      }
    );
  }, []);

  const GetNFT = async () => {
    if (localStorage.getItem("account") == "") {
      return;
    }

    if (firstTime == false) {
      await Moralis.start({
        apiKey:
          "PewXlFVYfFw6hRsVhi6vOJ6wSSOb0DFSlxNmTwjFED5D04vuVU03z0HS5TxdrGQB",
      });
      firstTime = true;
    }

    var address = localStorage.getItem("account")!.toString();
    const chain = EvmChain.SEPOLIA;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    var tmp = response.toJSON();
    console.log(tmp);
    var result = Object.entries(tmp);
    var arrayNFT = result[3][1];
    console.log(arrayNFT);
    for (let i = 0; i < arrayNFT.length; i++) {
      if (arrayNFT[i]["token_address"] == "0x47eddcd092baf2a06860827c32fee8002d2e540e") {
        console.log("aaa")
        arrayID.push(arrayNFT[i]);
      }
    }

    await setArrayRender(arrayID)
    console.log(arrayID);
    arrayID =[]
    console.log(arrayID);

  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div>
        <NavigationBar />
        <section className="relative block h-[50vh]">
          <div className="absolute top-0 h-full w-full bg-gradient-to-r from-sky-200 to-rose-300 bg-cover bg-center" />
        </section>
        <section className="relative bg-blue-gray-50/50 py-16 px-4">
          <div className="container mx-auto">
            <div className="relative mb-6 -mt-80 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                      <div className="-mt-20 w-40">
                        <img
                          className="w-40 h-40 rounded-full"
                          src="https://media.istockphoto.com/id/1308682666/vector/blue-gradient-soft-background.jpg?s=612x612&w=0&k=20&c=CBSD2BDe2uMi-Zm65ny6KoPKXsTPdk5K8wt_vMIb3Hc="
                          alt="Rounded avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8 text-center">
                  <div className="mb-5 flex items-center justify-center gap-2">
                    <img
                      className="w-10 h-10 mb-1 rounded-full"
                      src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/binance-coin-bnb-icon.png"
                      alt="Rounded avatar"
                    />
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {localStorage.getItem("account")}
                    </Typography>
                  </div>
                  <div className="mb-5 flex items-center justify-center gap-2">
                    <Typography className="font-semibold text-blue-gray-700">
                      Balance: {localStorage.getItem("balance")} BNB
                    </Typography>
                  </div>

                  <div className="mb-2 flex items-center  gap-2">
                    <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography
                      variant="h4"
                      className="font-semibold text-blue-gray-700"
                    >
                      NFT Created
                    </Typography>
                  </div>
                  <div className="pl-20 pt-10 pb-10 flex items-center">
                    <ul id="all" className="grid gap-4 grid-cols-4 ">
                      {nftCreated.map((a: any) => (
                        <li
                          key={a._id}
                          className="display:inline-block px-2"
                        >
                          <CardNFTCreated id={a._id} nft={a} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-2 flex items-center  gap-2">
                    <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography
                      variant="h4"
                      className="font-semibold text-blue-gray-700"
                    >
                      NFT Selling
                    </Typography>
                  </div>
                  <div className="pl-20 pt-10 pb-10 flex items-center">
                    <ul id="all" className="grid gap-4 grid-cols-4 ">
                      {nft.map((item: any) => (
                        <li
                          key={item._id}
                          className="display:inline-block px-2"
                        >
                          <CardNFT id={item._id} nft={item} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-2 flex items-center  gap-2">
                    <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                    <Typography
                      variant="h4"
                      className="font-semibold text-blue-gray-700"
                    >
                      NFT in Metamask
                    </Typography>
                  </div>
                  <button onClick={GetNFT} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Get NFT in Metamask
                  </button>
                  
                  <div className="pl-20 flex items-center">
                    <ul id="all" className="grid gap-4 grid-cols-4 ">
                      {arrayRender.map((item: any) => (
                        <li
                          key={item.token_id}
                          className="display:inline-block px-2"
                        >
                          <CardNFTMetamask id={item.token_id} name={item.name} />
                        </li>
                      ))}
                    </ul>
                  </div>
                    
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
