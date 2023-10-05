import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { HOST } from "../../utils/constant";
import { storage } from "../../utils/firebase";
import NavigationBar from "../../components/navigationbar";

export default function Create(this: any) {
  const [file, setFile] = useState<any | null>(null);
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [blob, setBlob] = useState<string | undefined>();
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = () => {
    if (file == null) {
      return;
    }

    const fileRef = ref(storage, `files/${v4()}`);
    axios
      .get(`${HOST}/idMinted/get`)
      .then((res) => {
        const ids = res.data;
        const idNFT = (parseInt(ids[0].idNFT.toString()) + 1).toString();

        uploadBytes(fileRef, file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                const data = {
                  name,
                  description: desc,
                  contentUrl: url,
                  idNFT,
                  ownerAddress: localStorage.getItem("account"),
                };
                console.log("create nft data:", data);

                axios
                  .put(`${HOST}/nftCreate/create`, data)
                  .then((resp) => {
                    console.log("create nft successfully:", resp);
                    axios
                      .post(`${HOST}/idMinted/update`, { idNFT })
                      .then((res) => {
                        console.log(res);
                        console.log(res.data);
                        setSuccess(true);
                      })
                      .catch((error) => console.log(error));
                  })
                  .catch((err) => {
                    console.log("create nft failed:", err);
                  });
              })
              .catch((err) => {
                console.log("get file url failed:", err);
              });
          })
          .catch((err) => {
            console.log("upload file failed:", err);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      <NavigationBar />
      <div className="h-screen flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-[#F0F9FF]">
        <div className="px-96 py-18 space-y-12">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Create NFT
          </h1>

          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Image, Video, Audio or 3D Model
              </label>

              <div className="flex items-center justify-center w-72	h-72">
                <label className="rounded-lg items-center justify-center flex flex-col w-full h-full border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  {blob ? (
                    <img
                      className="object-cover items-center justify-center w-full h-full"
                      src={blob}
                      alt=""
                    ></img>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>

                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Upload a file
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    className="opacity-0 max-h-0"
                    onChange={(ev) => {
                      try {
                        if (
                          ev.target.files == null ||
                          ev.target.files == undefined
                        ) {
                          return;
                        }

                        const reader = new window.FileReader();
                        reader.readAsArrayBuffer(ev.target.files[0]);
                        reader.onloadend = () => {
                          const res = reader.result!;
                          if (typeof res == "string") {
                            return;
                          }

                          const blob = new Blob([res]);
                          setBlob(URL.createObjectURL(blob));
                        };

                        setFile(ev.target.files![0]);
                      } catch {
                        console.log("Yo yo, đi nấu đá không ae?");
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Name
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Item Name"
                onChange={(ev) => {
                  setName((ev.target as any).value);
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-xl font-normal text-gray-900 dark:text-white">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Detailed description of your NFT"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(ev) => {
                  setDesc((ev.target as any).value);
                }}
              />
            </div>

            <button
              className="bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={onSubmit}
            >
              Create NFT
            </button>
          </div>
        </div>
      </div>

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
                  Create NFT successfully!
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
  );
}
