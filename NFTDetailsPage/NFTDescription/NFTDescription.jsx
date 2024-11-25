import React , {useContext, useState , useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
  MdAvTimer
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet,FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialInstagram,
  TiSocialYoutube,
  TiSocialTwitter,
} from "react-icons/ti";
import {
  BiTransferAlt , 
  BiDollar
} from "react-icons/bi";


import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex";
import { NFTTabs } from "../NFTDetailsPageIndex";


//Import smart contract

import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDescription = ({nft}) => {

  const {buyNFT,currentAccount} = useContext(NFTMarketplaceContext);

  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();

  const historyArray = [
    images.user1,
    images.user9,
    images.user2,
    images.user4,
    images.user8,
  ];
  const provananceArray = [
    images.user10,
    images.user7,
    images.user5,
    images.user4,
    images.user1,
  ];
  const ownerArray = [
    images.user8,
    images.user5,
    images.user2,
    images.user6,
    images.user1,
  ];

  const openSocial = () => {
    if(!social){
      setSocial(true);
      setNFTMenu(false);
    }  else{
      setSocial(false);
    }
  }

  const openNFTMenu = () =>{
    if(!NFTMenu){
      setNFTMenu(true);
      setSocial(false);
    }else{
      setNFTMenu(false);
    }
  }

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if(btnText == "Bid History"){
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance"){
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  }

  const openOwner = () =>{
    if(!owner){
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else{
      setOwner(false);
      setHistory(true);
    }
  }

  
  return (
    
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload className={Style.NFTDescription_box_share_box_icon}
             onClick={() => openSocial()}
            />

            {
              social && (
                <div className={Style.NFTDescription_box_share_box_social}>
                  <a href="#">
                    <TiSocialFacebook/> Facebook
                  </a>
                  <a href="#">
                    <TiSocialLinkedin/> Linkedin
                  </a>
                  <a href="#">
                    <TiSocialTwitter/> Twitter
                  </a>
                  <a href="#">
                    <TiSocialInstagram/> Instagram
                  </a>
                  <a href="#">
                    <TiSocialYoutube/> Youtube
                  </a>
                </div>
              )
            }
            <BsThreeDots className={Style.NFTDescription_box_share_box_icon}
            onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar/> Change price
                </a>
                <a href="#">
                  <BiTransferAlt/> Tranfer
                </a>
                <a href="#">
                  <MdReportProblem/> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep/> Delete item
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name} #{nft.tokenId}</h1>
            <div className={Style.NFTDescription_box_profile_box}>
              <div className={Style.NFTDescription_box_profile_box_left}>
                <Image 
                  src={images.user1} 
                  alt="profile" 
                  width={40} 
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
                <div className={Style.NFTDescription_box_profile_box_left_info}>
                  <small>
                    Creator
                  </small><br/>
                  <Link href={{pathname: "/author", query: `${nft.seller}`}}>
                    <span>
                      Karli Costa <MdVerified/>
                    </span>
                  </Link>
                </div>
              </div>

              <div className={Style.NFTDescription_box_profile_box_right}>
                <Image 
                  src={images.user1} 
                  alt="profile" 
                  width={40} 
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />

                <div className={Style.NFTDescription_box_profile_box_right_info}>
                  <small>abc</small><br/>
                  <span>
                    Karli Costa <MdVerified/>
                  </span>
                </div>
              </div>
            </div>



          
        </div>

        <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdAvTimer/>
              <span>
                Auction ending in:
              </span>
            </p>
            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_time}>
                <p>2</p>
                <span>Days</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_time}>
                <p>12</p>
                <span>Hours</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_time}>
                <p>45</p>
                <span>min</span>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_timer_time}>
                <p>51</p>
                <span>secs</span>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                <small>
                  Current Bid
                </small>
                <p>
                  {nft.price} ETH
                  <span>
                  ( ≈ $3,221.22)
                  </span>
                </p>
              </div>

              ,<span>[96 in stock]</span>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {
                currentAccount == nft.seller.toLowerCase() ? (
                  <p>You cannot buy your own NFT</p>
                ) : currentAccount == nft.owner.toLowerCase() ?(
                  <Button  
                    icon=<FaWallet/>
                    btnName="List on Marketplace"
                    handleClick={()=>router.push(
                      `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                    classNamee = {Style.button}
                  />
                ) : (
                  <Button  
                    icon=<FaWallet/>
                    btnName="Buy NFT"
                    handleClick={()=>buyNFT(nft)}
                    classNamee = {Style.button}
                  />
                )
              }
              <Button  
                    icon=<FaPercentage/>
                    btnName="Make Offer"
                    handleClick={()=>{}}
                    classNamee = {Style.button}
                />
              
               
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e)=> openTabs(e)}>Bid History</button>
              <button onClick={(e)=> openTabs(e)}>Provanance</button>
              <button onClick={(e)=> openOwner(e)}>Owner</button>
            </div>

            {history &&(
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab= {historyArray}/>
              </div>
            )}
            {provanance &&(
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab= {provananceArray}  />
              </div>
            )}
            {owner &&(
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab= {ownerArray} icon=<MdVerified/> />
              </div>
            )}
        </div>
      </div>
    </div>
  )
};

export default NFTDescription;