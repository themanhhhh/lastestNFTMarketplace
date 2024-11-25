import React , {useState , useEffect , useContext} from "react";
import Image from "next/image";

import Style from "./Error.module.css";
import images from "../../img";


//Smart contract import context
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const Error = () => {

    const {error ,  setOpenError} = useContext(NFTMarketplaceContext);


  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
        <div className={Style.Error_box}>
            <div className={Style.Error_box_info}>
                <Image
                    alt="error"
                    src={images.error}
                    width={200}
                    height={200}
                    className={Style.Error_box_info_img}
                />
                <p>Error</p>
            </div>
        </div>
    </div>
  )
};

export default Error;