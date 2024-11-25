import React , {useState,useEffect,useContext} from "react";
import Image from "next/image";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


import Style from "../styles/connectwallet.module.css";
import images from "../img";
const connectWallet = () => {
    const [activeBtn, setActiveBtn] = useState(1);

    const {currentAccount,connectWallet} = useContext(NFTMarketplaceContext);

    const providerArray=[
        {
            provider : images.metamask,
            name: "Metamask",
        },
        {
            provider : images.walletconnect,
            name: "Walletconnect",
        },
        {
            provider : images.walletlink,
            name: "Walletlink",
        },
        {
            provider : images.fortmatic,
            name: "Fortmatic",
        },
    ]
  return (
    <div className={Style.connectWallet}>
        <div className={Style.connectWallet_box}>
            <h1>Connect your wallet</h1>
            <p className={Style.connectWallet_box_para}>
                Connect with one of our avalibal wallet providers or create a new one
            </p>

            <div className={Style.connectWallet_box_provider}>
                {providerArray.map((el,i) =>(
                    <div 
                        className={`${Style.connectWallet_box_provider_item} 
                            ${activeBtn == i + 1 ? Style.active : ""
                        }`}
                        key={i+1}
                        onClick={()=> (setActiveBtn(i+1) , connectWallet())}
                    >
                        <Image
                            src={el.provider}
                            alt={el.provider}
                            width={50}
                            height={50}
                            className={Style.connectWallet_box_provider_item_img}
                        />
                        <p>{el.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
};

export default connectWallet;