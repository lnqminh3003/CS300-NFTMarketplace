import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationbar";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { HOST } from "../../utils/constant";
import contractAddress from '../../helpers/connectMetamask/abicontract';
import web3 from '../../helpers/connectMetamask/web3';

declare let window: any;


export default function NFTPage() {
  
  const router = useRouter();
  const query = router.query;
  const [money, setMoney] = useState("")
  const[successPopup , setSuccessPopup] =  useState(false)
  const[failPopup , setFailPopup] =  useState(false)
  const[bl, setBalance] = useState("")
  const[acc, setAcc] = useState("")

useEffect(() => {
    setBalance(localStorage.getItem("balance")!);
    setAcc( localStorage.getItem("account")!)
    fetch(`${HOST}/money/get/${localStorage.getItem("account")}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if(result.length != 0)
          {
            setMoney(result[0].money.toString())
            console.log(result[0].money.toString())
          }
          else
          {
            setMoney("0")
          }
            
        },
        (error) => {
            console.log(error)
        }
      );
  }, []);

const getMoney= async ()=>{
  if(money == "0") return;
    if (typeof window.ethereum != "undefined") {
        if (acc != "") {
          console.log("a");
          console.log(acc)
          try {
            var valueInWei = await web3.utils.toWei(money).toString();
            await contractAddress()
              .methods.sendEther(acc, valueInWei, "minh")
              .send({
                from: acc,
              });

              axios.delete(`${HOST}/money/delete/${localStorage.getItem("account")}`)
                .then((res) => {
                console.log(res);
                setSuccessPopup(true);
                setFailPopup(false);
                setMoney("0");
                })
                .catch((error) =>{ 
                  setSuccessPopup(false);
                  setFailPopup(true);
                  console.log(error);
                });

              var balanceInWei = await web3.eth.getBalance(localStorage.getItem("account")!.toString());
              var balance = await web3.utils.fromWei(balanceInWei, "ether");
              setBalance(balance);
              localStorage.setItem("balance",balance);
          } catch (err) {
            console.log(err);
            setSuccessPopup(false);
            setFailPopup(true);
          }
        }
      }
}

    return (
      <div>
        <NavigationBar />
        {successPopup == true && (
          <div>
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Payment successful
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    THANK YOU
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setSuccessPopup(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Let's go
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {failPopup == true && (
          <div>
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Fail Payment
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    TRY AGAIN
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setFailPopup(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Let's go
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <section className="relative block h-[50vh]">
          <div className="absolute top-0 h-full w-full bg-white bg-cover bg-center" />
        </section>
        <section className="relative bg-blue-gray-50/50 py-16 px-4">
          <div className="container mx-auto">
            <div className="relative mb-6 -mt-80 flex w-full min-w-0 flex-col break-words rounded-3xl bg-gradient-to-r from-sky-200 to-rose-200  shadow-xl shadow-gray-500/5">
              <div className="px-6">
                <div className="my-8 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative">
                      <div className="-mt-20 w-40">
                        <img
                          className="w-30 h-30 rounded-full"
                          src="data:image/png;base64,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"
                          alt="Rounded avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="mb-5 mt-4 flex items-center justify-center gap-2">
                    <Typography variant="h4" className="font-semibold text-blue-gray-700">
                    {acc}
                    </Typography>
                  </div>

                  <div className="mb-5 flex items-center justify-center gap-2">
                    <Typography className="font-semibold text-blue-gray-700">
                      Balance: {bl} BNB
                    </Typography>
                  </div>
                  <div className="mb-5 flex items-center justify-center gap-2">
                    <Typography
                      variant="h1"
                      color="blue-gray"
                      className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                    >
                      {money} BNB
                    </Typography>
                  </div>
                  <button onClick={getMoney} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Get Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
