/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../home/components/loading";
import NavigationBar from "../../components/navigationbar";
import contract from "../../helpers/connectMetamask/abicontract";
import web3 from "../../helpers/connectMetamask/web3";
import { HOST } from "../../utils/constant";
import { result } from "lodash";
import Link from "next/link";
import axios from "axios";

declare let window: any;

export default function NFTPage() {
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState<any>();
  const [acc, setAcc] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);

  const [showModal_keep, setShowModal_keep] = useState(false);
  const [modalSuccess_keep, setModalSuccess_keep] = useState(false);
  const [modalFail_keep, setModalFail_keep] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    setAcc(localStorage.getItem("account")!);
    if (query.id == undefined) return;
    fetch(`${HOST}/nft/get/${query.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [query.id]);

  const buyNFT = async () => {
    setShowModal(false);
    if (typeof window.ethereum != "undefined") {
      if (acc != "") {
        try {
          console.log("function called");
          setIsLoading(true);
          var valueInWei = await web3.utils
            .toWei(item.price.toString())
            .toString();
            console.log(valueInWei);
          await contract()
            .methods.buyNFT(item.idNFT.toString(), valueInWei)
            .send({
              from: acc,
              value: valueInWei,
            });
          console.log("success");

          axios
            .post(`${HOST}/money/update/${item.ownerAddress}`, {
              ownerAddress: item.ownerAddress,
              money: item.price,
            })
            .then((res) => {console.log("hello")})
            .catch((error) => console.log(error));

          axios
            .delete(`${HOST}/nft/delete/${item.idNFT}`)
            .then((res) => {})
            .catch((error) => console.log(error));

          setModalSuccess(true);
          setIsLoading(false);
          setShowModal(false);
          setModalFail(false);
        } catch (err) {
          console.log("error");
          setModalSuccess(false);
          setIsLoading(false);
          setIsLoading(false);
          setModalFail(true);
          setShowModal(false);
        }
      }
    }
  };

  const revertNFT = async () => {
    if (typeof window.ethereum != "undefined") {
      if (acc != "") {
        try {
          setModalSuccess_keep(true);
          setIsLoading(false);
          setShowModal_keep(false);
          setModalFail_keep(false);

          console.log("revert nft");

          ///
          ///
          /// INSERT CODE REVERT HERE
          ///
          ///
          axios
            .put(`${HOST}/nftCreate/create`, {
              name: item.name,
              contentUrl: item.contentUrl,
              description: item.description,
              idNFT: item.idNFT,
              ownerAddress: item.ownerAddress,
            })
            .then((res) => {
              console.log(res);
              console.log(res.data);
            })
            .catch((error) => console.log(error));

          axios
            .delete(`${HOST}/nft/delete/${item.idNFT}`)
            .then((res) => {})
            .catch((error) => console.log(error));
        } catch (err) {
          setModalSuccess_keep(false);
          setIsLoading(false);
          setModalFail_keep(true);
          setShowModal_keep(false);
        }
      }
    }
  };

  function updateNFT() {
    console.log(document.getElementById("p_name")?.textContent);
    console.log(document.getElementById("p_description")?.textContent);
    let newName = document.getElementById("p_name")?.textContent as string;
    let newDescription = document.getElementById("p_description")
      ?.textContent as string;
    // console.log("updateNFT");
    axios
      .post(`${HOST}/nft/update/${item._id}`, {
        // name: "try",
        name: newName,
        description: newDescription,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    const fileUrl = (item.contentUrl as string) ?? "";

    return (
      <div className="bg-[#F0F9FF] h-screen">
        <NavigationBar />
        <div className="flex flex-row gap-5 px-5 py-5 mt-10">
          <div className="flex flex-col w-2/5 aspect-square  rounded-3xl ml-10  ">
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full border-t object-cover  rounded-3xl border-gray-200"
            />
          </div>
          <span className="block w-2/5 mx-auto">
            <div className="flex flex-col">
              {/* <div className="flex items-center"> */}
              <p
                className="relative text-black font-bold text-[2rem] mt-3"
                contentEditable={isEditting}
                suppressContentEditableWarning={true}
                id="p_name"
              >
                {item.name}
                {isEditting == false ? ` #${item.idNFT} ` : ""}
                {isEditting && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 absolute right-5 top-2 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                )}
              </p>
              {/* </div> */}
              <div className="flex flex-row">
                <p className="text-black text-[1.1rem] inline-block">
                  Owned by
                  {
                    <Link href="#" className="text-sky-600">
                      {" "}
                      {item.ownerAddress}
                    </Link>
                  }
                </p>
              </div>
              <div className="bg-amber-200 w-fit px-5 py-2 rounded-md my-5">
                <div className="text-slate-500">Current price</div>
                <div className="text-[2.5rem] font-semibold">
                  {item.price} BNB
                </div>
              </div>
              <div className="mt-2 flex flex-col border-2 border-[#8A939B] rounded-xl">
                <div className="font-bold flex text-[1.2rem] pl-3 py-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-7 h-7 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>

                  <p className="text-black font-medium dark:text-white inline-block pl-5">
                    Description
                  </p>
                  {isEditting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-auto mr-5 inline-block text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  )}
                </div>
                <div className="h-96 flex-2 overflow-y-auto border-t-2 border-[#8A939B] px-3 font-normal text-black text-[1.1rem] text-left">
                  <p
                    className="pt-2"
                    contentEditable={isEditting}
                    suppressContentEditableWarning={true}
                    id="p_description"
                  >
                    {item.description}
                  </p>
                </div>

                {localStorage.getItem("account") != "" ? (
                  <div>
                      {item.ownerAddress != acc ? (
                  <div className="flex flex-row border-[#8A939B]">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      type="button"
                      className="w-full m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row border-t-2 border-[#8A939B]">
                    <div className="flex flex-1">
                      <button
                        onClick={() => {
                          if (isEditting == true) updateNFT();
                          setIsEditting(!isEditting);
                        }}
                        type="button"
                        className={`w-full mx-5 my-2 text-white ${
                          isEditting ? "bg-red-700" : "bg-blue-700"
                        } font-medium rounded-lg text-xl px-5 py-2.5 `}
                      >
                        {isEditting ? "Done" : "Edit"}
                      </button>
                    </div>
                    <div className="flex flex-1">
                      <button
                        onClick={() => {
                          setShowModal_keep(true);
                        }}
                        type="button"
                        className={`w-full mx-5 my-2 text-white bg-emerald-700  font-medium rounded-lg text-xl px-5 py-2.5`}
                      >
                        Keep
                      </button>
                    </div>
                  </div>
                )}
                  </div>
                ):(
                 <div></div>
                )}
                


              </div>
            </div>
          </span>
        </div>
        {isLoading == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  {/* <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  /> */}
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    LOADING TRANSACTION 
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-700 dark:text-gray-400">
                   ... Please wait ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}              
        {showModal == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Buy NFT
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="font-bold inline-block">Name:</p>
                    {" " + item.name}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="font-bold inline-block">Price:</p>
                    {" " + item.price + " BNB"}
                  </p>
                </div>
                <div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={buyNFT}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal_keep == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center p-4 border-b rounded-t dark:border-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                    />
                  </svg>

                  <h3 className="text-xl font-semibold pl-4 text-gray-900 dark:text-white">
                    Revert
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Do you want to revert this item back to collection?
                  </p>
                </div>
                <div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={revertNFT}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowModal_keep(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalSuccess == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
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
                      setModalSuccess(false);
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
        {modalFail == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
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
                      setModalFail(false);
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

        {modalSuccess_keep == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Revert successful
                  </h3>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setModalSuccess_keep(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalFail_keep == true && (
          <div>
            <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Fail revert
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please try again!
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setModalFail_keep(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
