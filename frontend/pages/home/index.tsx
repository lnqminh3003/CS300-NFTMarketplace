/*
  Not responsive
*/

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import NavigationBar from "../../components/navigationbar";
import CardNFT from "./components/card-nfts";
import Loading from "./components/loading";
import Highlight from "./components/highlight";
import TrendingTop from "./components/trending-top";
import Footer from "./components/footer";
import { HOST } from "../../utils/constant";

const HomePage = () => {
  /*
    Fetch NFTs
  */
  const [error, setError] = useState<any | null>(null);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div className="bg-[#F0F9FF]">
        <NavigationBar />
        <Highlight />
        <TrendingTop />
        <Footer />
      </div>
    );
  }
};

export default HomePage;
