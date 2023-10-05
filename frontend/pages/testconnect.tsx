import { use, useEffect, useState } from "react";
import web3 from "../helpers/connectMetamask/web3";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import contract from "../helpers/connectMetamask/abicontract";
import axios from "axios";
import { HOST } from "../utils/constant";

declare let window: any;
var firstTime: boolean = false;
var arrayID: Array<String> = [];

const Connectmetamask = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [arrayRender, setArrayRender] = useState(Array<String>);
  const [selectId, setSelectId] = useState("");

  const [idMint, setIDMinted] = useState<any[]>([]);

  useEffect(() => {
    console.log(global.contractAddress);
    if (window.ethereum != undefined) {
      window.ethereum.on("accountsChanged", accountChangeHandler);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("connect", () => {
        setErrorMessage("Connected");
      });
      window.ethereum.on("disconnect", () => {
        setErrorMessage("Disconnected");
      });
    }
    axios
      .post(`${HOST}/idMinted/update`, { idNFT: "25" })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));

      

    axios
      .get(`${HOST}/idMinted/get`)
      .then((res) => {
        const ids = res.data;
        setIDMinted(ids);
        console.log(ids[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const ConnectToMetamask = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          accountChangeHandler(result);
        });
    } else {
      setErrorMessage("Install Metamask");
    }
  };

  const accountChangeHandler = async (newAccount: any) => {
    var balanceInWei = await web3.eth.getBalance(newAccount.toString());
    var balance = await web3.utils.fromWei(balanceInWei, "ether");
    setUserBalance(balance);
    setDefaultAccount(newAccount[0]);
  };

  //get all nft
  const GetNFT = async () => {
    if (firstTime == false) {
      await Moralis.start({
        apiKey:
          "HGl0bOLcWkPRRLAmD5xN2JmFTMvTTM0CPanypE2AdILzo2MbN2JaXmzAR5Y1gJ0o",
      });
      firstTime = true;
    }
    var address = defaultAccount;
    if (defaultAccount.toString() == "") {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          address = result[0];
          accountChangeHandler(result);
        });
    }

    const chain = EvmChain.BSC_TESTNET;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });
    var tmp = response.toJSON();

    var result = Object.entries(tmp);
    var arrayNFT = result[4][1];
    for (let i = 0; i < arrayNFT.length; i++) {
      if (arrayNFT[i]["token_address"] == global.contractAddress) {
        arrayID.push(arrayNFT[i]["token_id"]);
      }
    }
    setArrayRender(arrayID);
    if (arrayID.length != 0) {
      setSelectId(String(arrayID[0]));
    }
  };

  const handleChangeSelectID = (e: any) => {
    setSelectId(e.target.value);
  };

  const SellNFT = async () => {
    if (typeof window.ethereum != "undefined") {
      if (defaultAccount != "") {
        try {
          await contract().methods.sellNFT(parseInt(selectId)).send({
            from: defaultAccount,
          });
          setErrorMessage("success sell");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const buyNFT = async () => {
    if (typeof window.ethereum != "undefined") {
      if (defaultAccount != "") {
        try {
          var valueInWei = await web3.utils.toWei("0.01").toString();
          await contract().methods.buyNFT(idMint[0].toString(), valueInWei).send({
            from: defaultAccount,
            value: valueInWei,
          });
          setErrorMessage("success buy");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const getMoney = async () => {
    if (typeof window.ethereum != "undefined") {
      if (defaultAccount != "") {
        try {
          var valueInWei = await web3.utils.toWei("0.03").toString();
          await contract()
            .methods.sendEther(defaultAccount, valueInWei, "minh")
            .send({
              from: defaultAccount,
            });
          setErrorMessage("success get ether");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const testne = async () => {
    // await axios.post("http://localhost:3030/idMinted/update", { idMinted: "20" })
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // })
    // .catch(error => console.log(error));

    await axios
      .get(`${HOST}/idMinted/get`)
      .then((res) => {
        const ids = res.data;
        setIDMinted(ids);
        console.log(ids[0]);
      })
      .catch((error) => console.log(error));
  };

  const test = () => {
    console.log(global.contractAddress);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold m-2">CONNECT TO WALLET</h1>
        <button onClick={ConnectToMetamask}>{connectButtonText}</button>
        <p>Address: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
      </div>
      <h2 className="text-2xl font-bold m-2">SELL NFT</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={GetNFT}
      >
        Get all NFTs
      </button>
      <div>
        {arrayRender.length > 0 && (
          <select onChange={handleChangeSelectID}>
            {arrayRender.map((value, i) => (
              <option key={i}>{value}</option>
            ))}
          </select>
        )}
      </div>
      {selectId != "" && <p>The NFT with ID: {selectId} is selected</p>}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={SellNFT}
      >
        Sell NFT
      </button>

      <h2 className="text-2xl font-bold m-2">BUY NFT</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={buyNFT}
      >
        Buy NFT
      </button>

      <h2 className="text-2xl font-bold m-2">GET MONEY BACK</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getMoney}
      >
        Get Money
      </button>

      <button onClick={testne}>em test</button>
      <p>
        {idMint.map((hi) => (
          <li key={hi._id}>{hi.idNFT}</li>
        ))}
      </p>
      <p className="text-5xl font-bold m-2">{errorMessage}</p>
      <button
        onClick={test}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Buy now
      </button>
    </div>
  );
};

export default Connectmetamask;
