import React from 'react'
import WalletCard from '../Dashboard/WalletCard'
import { useSelector } from 'react-redux';

const WalletComponentCard = () => {

  const user = useSelector((state) => state.auth);
  const userDetails = user?.user || {};
  return (
    <div>
      <WalletCard data={userDetails}/>
    </div>
  )
}

export default WalletComponentCard
