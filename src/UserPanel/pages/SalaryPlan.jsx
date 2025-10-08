import React from 'react';
import InstantBenefitsTable from './InstantBenefitsTable';
import WalletComponentCard from './E-pin/Wallet_Component';

const SalaryPlan = () => {
  return (
    
       <div className='flex flex-col gap-5'>
           <h1 className="text-2xl font-bold mb-4"> Reward Balance</h1>
           <WalletComponentCard />
        
    </div>
  );
};

export default SalaryPlan;
