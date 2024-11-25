import React from "react";
import Image from "next/image";

import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import NFTCardTwo from "../../collectionPage/NFTCardTwo/NFTCardTwo";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";


const AuthorNFTCardBox = ({
    collectiables,
    created,
    like,
    follower,
    following,
    nfts,
    myNFTs,
}) => {
    // const collectiablesArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    // ];

    // const createdArray = [
    //     images.nft_image_1,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    // ];

    // const likeArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_2,
    //     images.nft_image_2,
    // ];

    const followerArray = [
        {
            background: images.creatorbackground10,
            user : images.user1,
        },
        {
            background: images.creatorbackground11,
            user: images.user10,
        },
        {
            background: images.creatorbackground3,
            user : images.user3,
        },
        {
            background: images.creatorbackground7,
            user : images.user7,
        },
        {
            background: images.creatorbackground9,
            user : images.user9,
        },
        {
            background: images.creatorbackground8,
            user : images.user8,
        }, 
    ];

    const followingArray = [
        {
            background: images.creatorbackground2,
            user : images.user2,
        },
        {
            background: images.creatorbackground11,
            user : images.user10,
        },
        {
            background: images.creatorbackground3,
            user : images.user3,
        },
        {
            background: images.creatorbackground6,
            user : images.user6,
        },
        {
            background: images.creatorbackground9,
            user : images.user9,
        },
        {
            background: images.creatorbackground5,
            user : images.user5,
        }, 
        {
            background: images.creatorbackground4,
            user : images.user4,
        }, 
    ];
  return (
    <div className={Style.AuthorNFTCardBox}>
        
        { collectiables &&<NFTCardTwo NFTData={nfts}/>}
        { created && <NFTCardTwo NFTData={myNFTs}/>}
        { like && <NFTCardTwo NFTData={nfts}/>}
        { follower && (
            <div className={Style.AuthorNFTCardBox_box}>
                {followerArray.map((el,i)=>(
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )}
        { following && (
            <div  className={Style.AuthorNFTCardBox_box}>
                {followingArray.map((el,i)=>(
                    <FollowerTabCard i={i} el={el}/>
                ))}
            </div>
        )}
    </div>
  )
};

export default AuthorNFTCardBox;