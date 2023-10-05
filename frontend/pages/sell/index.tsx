import React, { useEffect, useState } from "react";
import { HOST } from "../../utils/constant";
import NavigationBar from "../../components/navigationbar";
import router, { useRouter } from "next/router";
import Loading from "../home/components/loading";
import axios from "axios";
import web3 from "../../helpers/connectMetamask/web3";

export default function Sell() {
  const router = useRouter();
  const query = router.query;

  const [price, setPrice] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [item, setItem] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);

  useEffect(() => {
    if (query.id == undefined) return;
    fetch(`${HOST}/nftCreate/get/${query.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
          // console.log(result.contentUrl);
        },
        (error) => {
          setIsLoaded(true);
        }
      );
  }, [query.id]);

  console.log(item);
  if (item == undefined)
    return (
      <div>
        <NavigationBar />
        <div className="text-center mt-20">404 NOT FOUND</div>
      </div>
    );

  const deleteNFT = async () => {
    try {
      setModalSuccess(true);
      setShowModal(false);
      setModalFail(false);

      axios
        .delete(`${HOST}/nftCreate/delete/${item.idNFT}`)
        .then((res) => {})
        .catch((error) => console.log(error));
      console.log("try to delete");
    } catch (err) {
      setModalSuccess(false);
      setModalFail(true);
      setShowModal(false);
    }
  };

  const onSubmit = () => {
    let description = document.getElementById("p_description")?.textContent;
    let name = document.getElementById("p_name")?.textContent;
    axios
      .put(`${HOST}/nft/create`, {
        name: name,
        contentUrl: item.contentUrl,
        description: description,
        idNFT: item.idNFT,
        ownerAddress: item.ownerAddress,
        price: price,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .delete(`${HOST}/nftCreate/delete/${item.idNFT}`)
      .then((res) => {})
      .catch((error) => console.log(error));

    setSuccess(true);
  };

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div className="h-max bg-[#F0F9FF]">
        <NavigationBar />
        <div className="flex flex-col h-full w-full px-16 py-8 space-y-8">
          <img
            src={item.contentUrl}
            alt="image"
            className="w-fit h-fit object-cover object-center rounded-3xl"
          />
          <div className="flex flex-col w-full h-full space-y-3">
            <div className="flex flex-row w-full items-center">
              <label className="basis-1/2 w-full block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Price
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Set price"
                  onChange={(ev) => {
                    setPrice((ev.target as any).value);
                  }}
                />
              </label>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Name
              </label>

              <p
                id="p_name"
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="h-10 justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {item.name}
              </p>
            </div>

            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Description
              </label>

              <p
                id="p_description"
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="overflow-y-auto h-32 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="bg-blue-700 mx-16 mb-10  text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={onSubmit}
          >
            Sell
          </button>
          <button
            className="bg-red-700 mx-16 mb-10  text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={() => {
              console.log("delete");
              setShowModal(true);
            }}
          >
            Delete
          </button>
          {success && (
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
                      Sell NFT successfully!
                    </h3>
                  </div>

                  <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                    <button
                      onClick={() => {
                        setSuccess(false);
                      }}
                      data-modal-toggle="defaultModal"
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showModal == true && (
          <div>
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <h3 className="text-xl font-semibold pl-4 text-gray-900 dark:text-white">
                    Delete NFT
                  </h3>
                </div>

                <div className="flex justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={deleteNFT}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white font-medium border border-gray-200 rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 rounded-lg   text-sm font-medium px-5 py-2.5"
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
            <div className="grid place-items-center bg-neutral-700 bg-opacity-40 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                    className="p-1 rounded h-11 w-11"
                    alt="..."
                  />
                  <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
                    Delete successful
                  </h3>
                </div>
                {/* <div className="p-6 space-y-6">
                  <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    THANK YOU
                  </p>
                </div> */}
                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                  <button
                    onClick={() => {
                      setModalSuccess(false);
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
        {modalFail == true && (
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
                    Fail Deletion
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
                      setModalFail(false);
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
