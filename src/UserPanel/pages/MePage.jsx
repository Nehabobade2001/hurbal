import React from 'react';
import WalletComponentCard from './E-pin/Wallet_Component';
import InstantBenefitsTable from './InstantBenefitsTable';

const MePage = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className="text-2xl font-bold mb-4">Instant Benefit</h1>
        <InstantBenefitsTable/>
    </div>
  );
};

export default MePage;
