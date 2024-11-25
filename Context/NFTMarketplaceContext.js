import React , {useState,useEffect,useContext} from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Router from "next/router";
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client";

//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");



import { 
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    transferFundsAddress,
    transferFundsABI,
 } from "./constant";


//---FETCHING SMART CONTRACT

const fetchContract = (signerOrProvider) => new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
);

//----FETCHING TRANSFER FUNDS

const fetchTransferFundsContract = ( signerOrProvider) =>new ethers.Contract(
    transferFundsAddress,
    transferFundsABI,
    signerOrProvider
);

//---Connecting with smart contract

const connectingWithSmartContract = async() =>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch(error){
        console.log("can't connecting with contract");
    }
}

//--- Conneecting with transferfunds

const connectToTransferFunds = async() =>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = fetchTransferFundsContract(signer);
        return contract;
    } catch(error){
        console.log("can't connecting with contract");
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) =>{
    const titleData = "Discover, collect, and sell NFTs";

    //-------USESTATE
    const [currentAccount, setCurrentAccount] = useState("");
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState("");
    const [accountBalance, setAccountBalance] = useState("");

    const router = useRouter();
    //----- CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async() =>{
        try{
            if(!window.ethereum) return  setOpenError(true), setError("Install MetaMask") ;

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            } else{
                
                setError("No Account Found");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            setAccountBalance(bal);
            console.log(accountBalance);
        } catch(error) {
            setError("Something wrong while connecting to wallet");
            setOpenError(true);
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
      }, []);
    
    useEffect(() => {
        if (accountBalance !== "") {
          console.log('accountBalance đã được cập nhật:', accountBalance);
          
        }
    }, [accountBalance]);
   

    //---- Connect wallet function
    const connectWallet = async() => {
        try {
            if (!window.ethereum)
              return setOpenError(true), setError("Install MetaMask");
      
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
            window.location.reload();
          } catch (error) {
            setError("Error while connecting to wallet");
            setOpenError(true);
          }
    }

    //--Upload to ipfs
    const uploadToPinata = async(file) => {
        if(file){
            try {
                const formData = new FormData();
                formData.append("file",file);

                const reponse = await axios(
                    {
                        method: "post",
                        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        data: formData,
                        headers: {
                            pinata_api_key:`5b9afb41a6a64bcad1f7`,
                            pinata_secret_api_key:`080a3e13f1c8a9527e3ff8faaeb9871b5df53900099d88edba2259f98be701ec`,
                            "Content-Type": "multipart/form-data",
                        }
                });

                const ImgHash = `https://gateway.pinata.cloud/ipfs/${reponse.data.IpfsHash}`;
                return ImgHash;
            } catch (error) {
                setError("Unable to upload image to Pinata");
                setOpenError(true);
            }
        }
    }

    //----Createnft function
    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image)
            return setError('Data is missing'), setOpenError(true);
          const data = JSON.stringify({name,description,image});
        try {
            

            const reponse = await axios(
                {
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: data,
                    headers: {
                        pinata_api_key:`5b9afb41a6a64bcad1f7`,
                        pinata_secret_api_key:`080a3e13f1c8a9527e3ff8faaeb9871b5df53900099d88edba2259f98be701ec`,
                        "Content-Type": "application/json",
                    }
            });

            const url = `https://gateway.pinata.cloud/ipfs/${reponse.data.IpfsHash}`;
            console.log(url);
            await createSale(url,price);
            router.push("/searchPage");
        } catch (error) {
          setError("Error while createNFT");
          setOpenError(true);
        }
      };
      

    //----CreateSale function
    const createSale =  async(url , formInputPrice, isReselling, id ) =>{
        try {
            console.log(url, formInputPrice,isReselling,id);

            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling 
            ? await contract.createToken(url,price ,{
                value: listingPrice.toString(),
            }) 
            : await contract.resellToken(id , price ,{
                value: listingPrice.toString(),
            });

            await transaction.wait();
            
        } catch (error) {
            setError("Error while create sale",error);
            setOpenError(true);
        }
    }


    //----Fetchnfts function

    const fetchNFTs = async () =>{
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            //console.log(data)

            const items = await Promise.all(
                data.map(
                    async({tokenId,seller,owner,price: unformattedPrice})=>{
                        const tokenURI = await contract.tokenURI(tokenId);

                        const {
                            data: {image, name, description}
                        } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                    }
                )
            );
           
            return items;
        } catch (error) {
            setError("Error while fetching NFTS");
            setOpenError(true);
        }
    }

    useEffect(()=>{
       fetchNFTs();
    },[]);

    //----Fetching my nft or listed nfts
    const fetchMyNFTsOrListedNFTs = async(type) =>{
        console.log(type);
        try {
            const contract = await connectingWithSmartContract();

            const data = 
            type == "fetchItemsListed" 
            ? await contract.fetchItemsListed() 
            : await contract.fetchMyNFTs();
            console.log(data);
            const items = await Promise.all(
                data.map(async ({tokenId,seller, owner, price : unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image,name,description}
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return{
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    };
                })
            );
            
            return items;
        } catch (error) {
            setError("Error while fetching NFTS");
            setOpenError(true);
        }
    }
    useEffect(() => {
        fetchMyNFTsOrListedNFTs();
      }, []);

    //---- Buy NFTs Function

    const buyNFT = async (nft) =>{
        console.log(nft.seller);
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(),"ether");
            const transaction = await contract.createMarketSale(nft.tokenId,{
                value: price,
            });

            await transaction.wait();
            console.log(nft.seller);
            router.push("/author");
        } catch (error) {
            setError("Error whilee buying NFT");
            setOpenError(true);
        }
    }



    //---------Transfer funds

    const [transactionCount, setTransactionCount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);


    const transferEther = async(address , ether , message) =>{
        try {
           if(currentAccount){
            const contract = await connectToTransferFunds();

            const unFormatedPrice = ethers.utils.parseEther(ether);
            //First method
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from : currentAccount,
                        to : address,
                        gas : "0x5208",
                        value: unFormatedPrice._hex
                    },
                ],
            });

            const transaction = await contract.addDataToBlockchain(
                address,
                unFormatedPrice,
                message
            );

            setLoading(true);
            transaction.wait();
            setLoading(false);

            const transactionCount = await contract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            window.location.reload();
           }
            
        } catch (error) {
            console.log(error)
        }
    }
    

    //Fetch all transaction

    const getAllTransactions = async()=>{
        try {
            if(ethereum){
                const contract = await connectToTransferFunds();

                const avaliableTransaction = await contract.getAllTransactions();

                const readTransaction = avaliableTransaction.map((transaction)=>({
                    addressTo : transaction.receiver,
                    addressFrom : transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                }));

                setTransactions(readTransaction);
            }   else{
                console.log("On Etherum ");
            }
        } catch (error) {
            
        }
    }
        
    return(
        <NFTMarketplaceContext.Provider 
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToPinata,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                createSale,
                currentAccount,
                titleData,
                error,
                setOpenError,
                openError,
                transferEther,
                loading,
                accountBalance,
                transactionCount,
                getAllTransactions,
                transactions,

            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}