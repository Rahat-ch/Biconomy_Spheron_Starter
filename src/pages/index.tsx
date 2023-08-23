import Head from 'next/head'
import {
  ParticleAuthModule,
  ParticleProvider,
} from "@biconomy/particle-auth";
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { ethers  } from 'ethers'
import { ChainId } from "@biconomy/core-types"
import { 
  IPaymaster, 
  BiconomyPaymaster,  
} from '@biconomy/paymaster'
import Upload from '@/components/Upload';



export default function Home() {
  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount | null>(null);
  // get all values from particle.network dashboard
  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: "",
    clientKey: "",
    appId: "",
    wallet: {
      displayWalletEntry: true,
      defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
    },
  });

  // bundler and paymaster urls available on https://dashboard.biconomy.io/
  const bundler: IBundler = new Bundler({
    bundlerUrl: '',    
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })


  
  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: '' 
  })

  const connect = async () => {
    try {
      setLoading(true)
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      console.log({particleProvider})
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster
      }
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
      biconomySmartAccount =  await biconomySmartAccount.init()
      setAddress( await biconomySmartAccount.getSmartAccountAddress())
      setSmartAccount(biconomySmartAccount)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setAddress("");
    particle.auth.logout()
  }

  return (
    <>
      <Head>
        <title>Web3 Dropbox</title>
        <meta name="description" content="Web3 Dropbox" />
      </Head>
      <main className={styles.main}>
        <h1>The Web3 Dropbox</h1>
        <h2>Upload your files to the decentralized web</h2>
        {loading || !address && <button onClick={connect} className={styles.connect}>Login to Get Started</button>}
        {loading && <p>Loading Smart Account...</p>}
        {address && <p>Smart Account: {address}</p>}
        {address && <button onClick={logOut} className={styles.connect}>Logout</button>}
        {address && <Upload />}
      </main>
    </>
  )
}
