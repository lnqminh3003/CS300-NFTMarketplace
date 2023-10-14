import Link from "next/link";
import lodash from "lodash";
import { storage } from "../../../utils/firebase";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { useState } from "react";

const storageRefImage = ref(storage,"files/quangminh.jpg");

var ImageURL = [
    "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960",
    "https://media.maybe.vn/attachments/tai-xuong-4-jpg.23705/",
    "https://znews-photo.zingcdn.me/w660/Uploaded/bfluaow/2022_07_21/bayc.jpg",
    "https://media.vov.vn/sites/default/files/styles/large/public/2021-08/1_0_25.jpg",
    "https://i1-sohoa.vnecdn.net/2022/04/07/unnamed1-1649331535-1649331549-7600-1649331674.png?w=1200&h=0&q=100&dpr=1&fit=crop&s=YQqpa1jhpFHce9U106z1ow",
    "https://lh4.googleusercontent.com/FgsVVoYjbwEt0D8nlNTB457iOl02Wq4_WqDq_vY2NrSA6C_e4xpQsyj7M6EQX0CitlX6ghGFMZJH5hg6Y903AhmIXim19q1TYmMgZdSJoWlZy2VIzrCI2bYyy3BsjoXulVuAamzrdf8",
    "https://vcdn1-sohoa.vnecdn.net/2022/03/08/bored-ape-nft-accidental-0-728-5490-8163-1646708401.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=CtDP339pYS9H6CFXg8xYug",
    "https://cdn.pixabay.com/photo/2022/02/14/02/52/monkey-7012380_960_720.png",
    "https://images.barrons.com/im-394091?width=1280&size=1",
    "https://www.businesstoday.com.my/wp-content/uploads/2022/02/monkey-art-NFT.png",
    ]

function randomIntFromInterval(min:any, max:any) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function CardNFTMetamask({ id, name }: { id: string; name: string }) {
  const[image,setImage] = useState('');

    console.log(id);
  getDownloadURL(ref(storage,"files/" + id ))
  .then((url) => {
    console.log(url)
    setImage(url);
  })
  .catch((error) => {
    console.log(error);
  });


  return (
    <Link href={{ pathname: "./nft", query: { id: id } }}>
      <div className="relative flex-wrap w-60 h-60 inline-block">
        <img
          src= {image}
          alt=""
          className=" w-60 h-60 object-cover rounded-3xl"
        />
        <div className="absolute right-0 bottom-0 left-0 w-full h-32 overflow-hidden bg-gradient-to-t from-black opacity-75 rounded-b-3xl"></div>
        {/* <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-gradient-to-t from-black rounded-b-3xl"></div> */}
        <div className="w-auto h-12 absolute bottom-8 left-3 right-3 rounded-xl p-1 px-3">
          <div className="text-2xl font-bold text-white truncate">
            ID: {id}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardNFTMetamask;
