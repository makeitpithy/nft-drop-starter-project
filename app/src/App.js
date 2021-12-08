import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'make_it_pithy';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  //check for phanom wallet
  const checkIfWalletIsConnected = async () => {
    try{
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet Found!")
          const response = await solana.connect({onlyIfTrusted: true});

          console.log("Connected with public key:", 
                      response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      } 
    } catch (error) {
      console.error(error);
    };
  };

  //state
  const [walletAddress, setWalletAddress] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  // render not connected container
  const renderNotConnectedContainer = () => (
    <button 
      className = "cta-button connect-wallet-button"
      onClick = {connectWallet}
    >
      Connect to Wallet.
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);

    return () => window.removeEventListener('load', onLoad);

  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">David Bowie: Berlin Trilogy NFT</p>
          <p className="sub-text">Your chance to mint Heroes, Low, or Lodger</p>
          <img className="bowie-pic" src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F8907b4b4-8a1e-11e3-8829-00144feab7de?fit=scale-down&source=next&width=700" />
          <br />
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>


  );


};

export default App;
