import React , {useState, useEffect, useContext} from "react";
import Image from "next/image";
import { FaEthereum , FaUserAlt } from "react-icons/fa";

import Style from "../styles/transferFunds.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button , Loader } from "../components/componentsindex";


import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const transferFunds = () => {

  const { 
    currentAccount , 
    transferEther , 
    loading, 
    accountBalance,
    transactions ,
    getAllTransactions,
  } = useContext(NFTMarketplaceContext);
  const [transfereAmount, setTransfereAmount] = useState('');
  const [transfereAccount, setTransfereAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);


  useEffect(() =>{
    getAllTransactions();
  })

  return (
    <div className={Style.transfer}>
        <div className={Style.transfer_box}>
          <h1>Transfer Ether</h1>
          <p>
            Lorem ipsum dolor sit amit , consectetur adipsicing elite
            aliquam , commodi ullam illum iste {" "}
          </p>
          <div className={Style.transfer_box_box}>
            <div className={Style.transfer_box_box_left}>
              <Image 
                src={images.transfer}
                alt="images"
                width={400}
                height={400}
              />
            </div>
            <div className={Style.transfer_box_box_right}>
              <h2>
                Now you can transfer ether
              </h2>
              <div className={Style.transfer_box_box_right_info}>
                <p className={Style.transfer_box_box_right_info_deskTop}>
                  Account: {currentAccount.slice(1,15)}
                </p>
                <p className={Style.transfer_box_box_right_info_mobile}>
                  Account: {currentAccount.slice(1,15)}
                </p>
                <p>Balance: {accountBalance} ETH</p>
              </div>

              {/*TRANSFER FIELD */}
              <div className={Style.transfer_box_box_right_box}>
                <div className={formStyle.Form_box_input}> 
                  <label htmlFor="facebook">Facebook</label>
                  <div className={formStyle.Form_box_input_box}>
                    <div className={formStyle.Form_box_input_box_icon}>
                      <FaUserAlt/>
                    </div>
                    <input 
                      type="text" 
                      placeholder="address" 
                      onChange={(e) => setTransfereAccount(e.target.value)}
                    />
                  </div>
                </div>
                <div className={formStyle.Form_box_input}> 
                  <label htmlFor="facebook">Facebook</label>
                  <div className={formStyle.Form_box_input_box}>
                    <div className={formStyle.Form_box_input_box_icon}>
                      <FaEthereum/>
                    </div>
                    <input 
                      type="text" 
                      min={1}
                      placeholder="ETH" 
                      onChange={(e) => setTransfereAmount(e.target.value)}
                    />
                  </div>
                </div>
                  <div className={formStyle.Form_box_input}>
                    <textarea 
                      name="" 
                      id="" 
                      cols={30} 
                      rows={6} 
                      placeholder="Something about your message in few words"
                      className={formStyle.Form_box_input_textarea}
                      onChange={(e) => setMessage(e.target.value)}
                    >
                    </textarea>
                  </div>

                  {loading ?(
                    <Loader/>
                  ) : (
                    <Button 
                      btnName="Transfer Funds"
                      handleClick={() => 
                        transferEther(transfereAccount,transfereAmount,message)
                      }
                      classStyle={Style.button}
                    />
                  )}
              </div>
            </div>
          </div>
          {/* Transaction history */}      
          <h1>
              Transaction History
          </h1>
          <p>
            Lorem ipsum dolor sit amit , consectetur adipsicing elite
            aliquam , commodi ullam illum iste {" "}
          </p>

          <div className={Style.transfer_box_history}>
            {
              transactions.map((el,i)=>(
                <div className={Style.transfer_box_history_item} key={i+1}>
                  <Image
                    src={images.transferEther}
                    width={100}
                    height={100}
                    alt="image"
                  />
                  <div className={Style.transfer_box_history_item_info}>
                    <p>
                      <span>Transfer ID:</span>#{i+1} {el.timestamp}
                    </p>
                    <p>
                      <span>Amount:</span>{el.amount}
                    </p>
                    <p>
                      <span>From:</span>{el.addressFrom.slice(1,15)}...
                    </p>
                    <p>
                      <span>To:</span>{el.addressTo.slice(1,15)}...
                    </p>
                    <Button
                      btnName="Message"
                      handleClick={
                        (() => (setReadMessage(el.message),setOpenBox(true)))
                      }
                      classStyle={Style.readButton}
                    />
                  </div>
                </div>
              ))
            }
          </div>
          {
            openBox == false ? (
              ""
            ) : (
              <div 
                className={Style.messageBox}
                onClick={() => setOpenBox(false)}
              >
                <div className={Style.messageBox_box}>
                  <h1>
                    Transaction Message
                  </h1>
                  <p>{readMessage}</p>
                </div>
              </div>
            )
          }
        </div>
    </div>
  );
};

export default transferFunds;