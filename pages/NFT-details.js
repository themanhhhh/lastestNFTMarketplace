import React ,{useState,useEffect,useContext} from "react";
import { useRouter } from "next/router";

//import smart contract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

import { 
  Button ,
  Category,
  Brand,
} from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
const NFTDetails = () => {

  const {currentAccount} = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenID: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
   
  });

  const router = useRouter();

  useEffect(() =>{
    if(!router.isReady) return;
    setNft(router.query);
  },[router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category/>
      <Brand/>
    </div>
  )
};

export default NFTDetails;