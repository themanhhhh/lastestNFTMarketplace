import React, { useState ,useContext , useEffect } from "react";
import Image from "next/image";

import Style from "../styles/author.module.css";
import { Banner , NFTCardTwo } from "../collectionPage/collectionindex";
import { Brand,Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import { 
  AuthorNFTCardBox,
    AuthorProfileCard,
    AuthorTaps,
    TabCard,
 } from "../authorPage/componentindex";

 //Import smart contract
 import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const author = () => {
    const popularArray = [
      {
        background: images.creatorbackground10,
        user : images.user1,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    {
        background: images.creatorbackground11,
        user: images.user10,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    {
        background: images.creatorbackground3,
        user : images.user3,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    {
        background: images.creatorbackground7,
        user : images.user7,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    {
        background: images.creatorbackground9,
        user : images.user9,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    {
        background: images.creatorbackground8,
        user : images.user8,
        seller: "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    },
    ]
    const [collectiables, setCollectiables] =useState(true);
    const [created, setCreated] =useState(false);
    const [like, setLike] =useState(false);
    const [follower, setFollower] =useState(false);
    const [following, setFollowing] =useState(false);


    const {fetchMyNFTsOrListedNFTs, currentAccount} = useContext(NFTMarketplaceContext);

    const [nfts, setNfts] = useState([]);
    const [myNFTs, setMyNFTs] = useState([]);

    useEffect(()=>{
      fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items)=>{
        setNfts(items);
      });
    },[]);

    useEffect(() => {
      fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items)=>{
        setMyNFTs(items);
      });
    }, []);


  return (
    <div className={Style.banner}>
        <Banner bannerImage={images.banner1}/>
        <AuthorProfileCard currentAccount={currentAccount}/>
        <AuthorTaps 
          setCollectiables={setCollectiables} 
          setCreated={setCreated}
          setLike ={setLike}
          setFollower={setFollower}
          setFollowing={setFollowing}
        />

        <AuthorNFTCardBox
          collectiables={collectiables} 
          created={created}
          like ={like}
          follower={follower}
          following={following}
          nfts={nfts}
          myNFTs={myNFTs}
        />
        <Title
          heading="Popular Creators"
          paragraph="Click on music icon and enjoy NFT music or audio"
        />
        <div className={Style.author_box}>
          {
            popularArray.map((el,i)=>(
              
              <FollowerTabCard key={i+1} i={i} el={el}/>
            ))
          }
        </div>
        <Brand/>
    </div>
  )
};

export default author;