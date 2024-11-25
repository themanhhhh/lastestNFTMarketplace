import "../styles/globals.css"

import { Footer, Navbar } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const MyApp = ({Component,pageProps}) => ( 
    <div>
        <NFTMarketplaceProvider>
            <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </NFTMarketplaceProvider>     
    </div>
)

export default MyApp;