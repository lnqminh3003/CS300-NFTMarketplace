import createKeccakHash from "keccak";
import { KeyboardEvent, useEffect,  useState } from "react";
import WalletConnect from "../pages/home/components/walletConnect";
import Link from "next/link";
import Account from "../pages/home/components/account";
import GetMoney from "../pages/home/components/getMoney";
import Router, { useRouter } from "next/router";
import web3 from "../helpers/connectMetamask/web3";

declare let window: any;

const NavigationBar = (searchQuery: any) => {
  const router = useRouter();
  // console.log("searching ", searchQuery["searchQuery"]);

  const [searchValue, setSearchValue] = useState(
    searchQuery["searchQuery"] == undefined
      ? undefined
      : searchQuery["searchQuery"]
  );
  const [isSearching, setIsSearching] = useState(false);
  const [isDropOpen, setDrop] = useState({
    explore: false,
    profile: false,
    wallet: false,
  });
  
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [connectMessage, setConnectMessage] = useState("Connect with MetaMask");
  const [showModal, setShowModal] = useState(false);
  const [modalMetamask, setModalMetamask] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("account") != "") {
      ConnectToMetamask();
    }
  }, []);

  const ConnectToMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          localStorage.setItem("account", toChecksumAddress(result[0]));
          setDefaultAccount(toChecksumAddress(result[0]));
          accountChangeHandler(result);
        });
    } else {
      setModalMetamask(true);
      console.log("Install Metamask");
    }
  };

  function toChecksumAddress(address: string) {
    address = address.toLowerCase().replace("0x", "");
    var hash = createKeccakHash("keccak256").update(address).digest("hex");
    var ret = "0x";

    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase();
      } else {
        ret += address[i];
      }
    }

    return ret;
  }

  const accountChangeHandler = async (newAccount: any) => {
    var tmp = toChecksumAddress(newAccount[0]);
    setDefaultAccount(tmp);
    localStorage.setItem("account", tmp);
    console.log(localStorage.getItem("account"));

    var balanceInWei = await web3.eth.getBalance(newAccount.toString());
    var balance = await web3.utils.fromWei(balanceInWei, "ether");
    setUserBalance(balance);
    localStorage.setItem("balance", balance);
    setConnectMessage("Connected Successful");
    
  };
  

  const handleClickDropdown = (val: string) =>
    setDrop({
      ...isDropOpen,
      [val]: !isDropOpen[val as keyof typeof isDropOpen],
    });
  // const {explore, profile} = isDropOpen

  function handleSearchBox(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      console.log(searchValue);
      router.push({ pathname: "./find", query: { query: searchValue } });
    }
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="p-2 bg-gradient-to-r from-cyan-500 via-teal-300 to-rose-300">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          {/* Logo */}
          <a
            href="https://client-seazle.vercel.app/"
            className="flex items-center"
          >
            <img
              src="https://i.imgur.com/98gX8Ky.png"
              className="h-6 mr-3 sm:h-9"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-slate-800">
              AuraSky
            </span>
          </a>
          {/* Search bar */}
          <div className="flex items-center relative mx-auto text-gray-600 w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={`${isSearching ? 2.5 : 1.5}`}
              stroke="currentColor"
              className={`w-6 h-6 ${
                isSearching ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              id="search_box"
              onKeyDown={handleSearchBox}
              className="focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ml-2 border-gray-200 bg-white h-10 px-5 rounded-2xl text-sm w-full"
              type="search"
              name="search"
              placeholder="Search items"
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              value={searchValue}
            />
          </div>
          {/* Menu Items */}
          <div className="flex space-x-2 items-center">
            {/* By text */}
            <div className="flex items-center space-x-6 bg-slate-200 p-1 px-2 rounded-xl">
              {defaultAccount != "" &&
              <Link
                href="/create"
                className="block text-gray-700 rounded font-semibold hover:text-sky-600 hover:font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
              }
              {defaultAccount == "" &&
                <button onClick ={()=>{setShowModal(true)}}>
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.3}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
                </button>
                
              }

              {/* By icon */}
              {/* Account */}
              {defaultAccount != "" &&  <Account address={"profile"} nft={"1"} />}
              {defaultAccount == "" &&  
                 <button onClick ={()=>{setShowModal(true)}}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.3}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                 </button>
              }
             
              {/* Wallet */}
              <div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="block text-gray-700 hover:text-sky-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </button>

        {showModal ? (
          <>
            <div className=" bg-neutral-700 bg-opacity-40 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r outline-none focus:outline-none">
                  <div className=" flex items-start p-5 border-solid border-slate-200 rounded-t">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                      className="p-1 rounded h-11 w-11"
                      alt="..."
                    />
                    <h3 className="pl-2 text-3xl font-semibold whitespace-nowrap dark:text-white">
                      Wallet
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto items-center">
                    {defaultAccount == "" && (
                      <button
                        onClick={ConnectToMetamask}
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                      >
                        {" "}
                        <svg
                          aria-hidden="true"
                          className="mr-2 -ml-1 w-6 h-5"
                          viewBox="0 0 2405 2501"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <g clip-path="url(#clip0_1512_1323)">
                            {" "}
                            <path
                              d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z"
                              fill="#E2761B"
                              stroke="#E2761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z"
                              fill="#E2761B"
                              stroke="#E2761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z"
                              fill="#C0AD9E"
                              stroke="#C0AD9E"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z"
                              fill="#E2761B"
                              stroke="#E2761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z"
                              fill="#E4751F"
                              stroke="#E4751F"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z"
                              fill="#233447"
                              stroke="#233447"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z"
                              fill="#C0AD9E"
                              stroke="#C0AD9E"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z"
                              fill="#D7C1B3"
                              stroke="#D7C1B3"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z"
                              fill="#E4761B"
                              stroke="#E4761B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z"
                              fill="#D7C1B3"
                              stroke="#D7C1B3"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z"
                              fill="#CD6116"
                              stroke="#CD6116"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z"
                              fill="#E4751F"
                              stroke="#E4751F"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z"
                              fill="#233447"
                              stroke="#233447"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z"
                              fill="#763D16"
                              stroke="#763D16"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z"
                              fill="#C0AD9E"
                              stroke="#C0AD9E"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z"
                              fill="#E4751F"
                              stroke="#E4751F"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z"
                              fill="#E4751F"
                              stroke="#E4751F"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z"
                              fill="#F6851B"
                              stroke="#F6851B"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z"
                              fill="#C0AD9E"
                              stroke="#C0AD9E"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z"
                              fill="#C0AD9E"
                              stroke="#C0AD9E"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z"
                              fill="#161616"
                              stroke="#161616"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z"
                              fill="#161616"
                              stroke="#161616"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z"
                              fill="#161616"
                              stroke="#161616"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z"
                              fill="#161616"
                              stroke="#161616"
                              stroke-width="5.94955"
                            />{" "}
                            <path
                              d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z"
                              fill="#161616"
                              stroke="#161616"
                              stroke-width="5.94955"
                            />{" "}
                          </g>{" "}
                          <defs>
                            {" "}
                            <clipPath id="clip0_1512_1323">
                              {" "}
                              <rect
                                width="2404"
                                height="2500"
                                fill="white"
                                transform="translate(0.519043 0.132812)"
                              />{" "}
                            </clipPath>{" "}
                          </defs>{" "}
                        </svg>
                        {connectMessage}
                      </button>
                    )}
                    {defaultAccount != "" && (
                      <div>
                        <p className="text-1xl font-semibold whitespace-nowrap dark:text-white">
                          My Address: {defaultAccount}
                        </p>
                        <p className="text-1xl font-semibold whitespace-nowrap dark:text-white">
                          My Balance: {userBalance} BNB
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-emerald-400 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {modalMetamask == true && (
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
                  Fail Connect
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  INSTALL METAMASK FIRST
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setModalMetamask(false);
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
    </div>
            </div>
            <GetMoney address={"GetMoney"} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
