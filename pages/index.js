import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'
import styles from '../styles/Home.module.css'

export default function Home() {

  const {
    activate,
    active,
    deactivate,
    error,
    account,
    chainId,
  } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === 'true')
      connect()
  }, [connect])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  if(error) {
    return <p>Oops... can't go trough</p>
  }

  return (
    <div className={styles.container}>
      <h1>Web3 Dapp</h1>

      {
        active 
        ? 
        <>
        <button onClick={disconnect}>Disconnect Wallet</button>
        <p>
          You are connected to {chainId} network<br/>
          Your account is: {account}
        </p>
        </>
        :
        <button onClick={connect}>Connect Wallet</button>
      }
    </div>
  )
}
