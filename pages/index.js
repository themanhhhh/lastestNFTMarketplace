import React, {useContext,useState,useCallback, useEffect} from "react";

import Style from "../styles/index.module.css";
import { 
  BigNFTSlider,
  HeroSection ,
  Service,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";

import { getTopCreators } from "../TopCreators/TopCreators";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const Home = () => {

  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);


  const creators = getTopCreators(nfts);

  useEffect(() => {
    try {
      fetchNFTs().then((items) => {
        setNfts(items.reverse());
        setNftsCopy(items);
      });
    } catch (error) {
      setError("Please reload the browser", error);
    }
  }, []);

  return (
    <div className={Style.homePage}>
        <HeroSection/>
        <Service/>
        <BigNFTSlider/>
        <Title heading="Lastest Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <AudioLive/>
        <FollowerTab TopCreators={creators}/>
        
        <Slider/>
            
        <Collection/>
        <Title heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
        />
        <Filter/>
        {nfts.length == 0 ? <Loader/> :  <NFTCard NFTData={nfts}/>}
        <Title heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
        />
        <Category/>
        <Subscribe/>
        <Brand/>
        <Video/>
    </div>
  )
}

export default Home;