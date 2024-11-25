import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//import icon
import {MdNotifications} from "react-icons/md";
import {BsSearch} from "react-icons/bs";
import {CgMenuLeft,CgMenuRight} from "react-icons/cg";
import {DiJqueryLogo} from "react-icons/di";


// Internal import
import Style from "./Navbar.module.css";
import {Discover,HelpCenter,Notification,Profile,SideBar} from "./index"
import {Button,Error} from "../componentsindex";
import images from "../../img";

// Import from smart contract

import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";


const Navbar = () => {

    //Use state components

    const [discover , setDiscover] = useState(false);
    const [help , setHelp] = useState(false);
    const [notification , setNotification] = useState(false);
    const [profile , setProfile] = useState(false);
    const [openSideMenu , setOpenSideMenu] = useState(false);

    const openDiscover = () => {
        if(!discover){
            setDiscover(true);
            setHelp(false);
            setProfile(false);
            setNotification(false);
        }
        else{
            setDiscover(false)
        }
    };

    const openHelp = () => {
        if(!help){
            setDiscover(false);
            setHelp(true);
            setProfile(false);
            setNotification(false);
        }
        else{
            setHelp(false)
        }
    };

    const openNotification = () =>{
        if(!notification){
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotification(false);
        }
    };

    const openProfile = () => {
        if(!profile){
            setProfile(true);
            setHelp(false);
            setDiscover(false);
            setNotification(false);
        }else {
            setProfile(false);
        }
    };

    const openSideBar = () => {
        if(!openSideMenu){
            setOpenSideMenu(true);
        } else {
            setOpenSideMenu(false);
        }
    };

    //smart contract sêction
    const { currentAccount,connectWallet, openError } = useContext(NFTMarketplaceContext);

    const router=useRouter();


    return  (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <DiJqueryLogo 
                            style={{ width: '50px', height: '50px' }}
                            onClick={() => router.push("/")}
                        />
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder="Search NFT"/>
                            <BsSearch onClick={()=> {}} className={Style.search_icon}/>
                        </div>
                    </div>
                </div>

                {/*//END OF LEFT SECTION*/ }
                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}>
                        {/*Discover menu*/}
                        <p onClick={()=> openDiscover()}>Discover</p>
                        {
                            discover && (
                                <div className={Style.navbar_container_right_discover_box}>
                                    <Discover setDiscover ={setDiscover}/>
                                </div>
                            )
                        }
                    </div>
                    {/*Help Center*/}
                    <div className={Style.navbar_container_right_help}>
                            <p onClick={()=>openHelp()}>Help Center</p>
                            {
                                help && (
                                    <div className={Style.navbar_container_right_help_box}>
                                        <HelpCenter setHelp={setHelp}/>
                                    </div>
                                )
                            }
                    </div>

                    {/*Notification*/}

                    <div className={Style.navbar_container_right_notify}>
                            <MdNotifications 
                            className={Style.notify} 
                            onClick={() => openNotification()}
                            />
                            {notification &&<Notification/>}
                    </div>


                    {/*Create button section*/}

                    <div className={Style.navbar_container_right_button}>
                        {currentAccount == "" ? (
                            <Button btnName="Connect" handleClick={()=> connectWallet()}/>
                        ) : (
                                <Button btnName="Create" handleClick={() =>router.push('/upload-nft')} />
                        )
                        }
                    </div>

                    {/*User profile*/}

                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            <Image src={images.user1} alt="Profile" width={40} height={40}
                            onClick={()=> openProfile()}
                            className={Style.navbar_container_right_profile}
                            />
                            {profile && <Profile currentAccount={currentAccount}/>}
                        </div>
                    </div>

                    {/*Menu button*/}
                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight 
                        className={Style.menuIcon}
                        onClick={()=>openSideBar()}
                        />
                    </div>
                </div>
            </div>
            {/*Side bar component*/}
            {
                openSideMenu && (
                    <div className={Style.sideBar}>
                        <SideBar 
                            setOpenSideMenu ={setOpenSideMenu} 
                            currentAccount={currentAccount}
                            connectWallet={connectWallet}
                        />
                    </div>
                )
            }

            {
                openError && <Error/>
            }
        </div>
    )
};

export default Navbar;