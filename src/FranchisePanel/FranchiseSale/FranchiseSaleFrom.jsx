import React from 'react'
import InputField from '../../Component/InputField'
import SelectComponent from '../../Component/SelectComponent'
import Button from '../../Component/Button'

const FranchiseSaleFrom = () => {
    return (
        <div>
            <form className="flex flex-col gap-5 p-4 bg-white shadow rounded-xl">
                <h2 className="text-xl font-bold">Franchise Sale</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                        label="Date"
                        name="date"
                        type="date"
                        placeholder="Date"
                        value={new Date().toISOString().split('T')[0]}
                        className="border p-2 rounded w-full"
                    />

                    <InputField
                        label="Transaction Id"
                        name="transactionId"
                        type="text"
                        placeholder="Transaction Id"
                        className="border p-2 rounded w-full"
                    />

                    <SelectComponent
                        label="Select Franchise"
                        name="franchise"
                        placeholder="Select Franchise"
                        options={[

                        ]}
                    />

                    <InputField
                        label="Party Name"
                        name="partyName"
                        type="text"
                        placeholder="Party Name"
                        className="border p-2 rounded w-full"
                    />

                    <InputField
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="border p-2 rounded w-full"
                    />

                    <InputField
                        label="Courier Charge"
                        name="courierCharge"
                        type="number"
                        placeholder="Courier Charge"
                        className="border p-2 rounded w-full"
                    />

                    <InputField
                        label="Netamount"
                        name="netamount"
                        type="number"
                        placeholder="Netamount"
                        className="border p-2 rounded w-full"
                    />
                    <SelectComponent
                        label="Select Group"
                        name="group"
                        placeholder="Select Group"
                        options={[
                            { label: "HEALTH CARE ( NUTRITION)", value: "health_care" },
                            { label: "BEAUTY CARE", value: "beauty_care" },
                            { label: "PERSONAL CARE", value: "personal_care" },
                            { label: "HOME CARE", value: "home_care" },
                            { label: "MARKETING TOOLS", value: "marketing_tools" },
                            { label: "DRINKS", value: "drinks" },
                            { label: "POWDER", value: "powder" },
                            { label: "GROCERY", value: "grocery" }
                        ]}
                    />
                    <SelectComponent
                        label="Select Product"
                        name="group"
                        placeholder="Select Group"
                        options={[

                        ]}
                    />

                    <InputField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <label className="">Sale Type</label>
                    <div className="flex items-center gap-3 text-sm">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="saleType"
                                value="wallet"
                                defaultChecked
                                className="accent-blue-600"
                            />
                            <span>Wallet Sale</span>
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="saleType"
                                value="cash"
                                className="accent-blue-600"
                            />
                            <span>Cash Sale</span>
                        </label>
                    </div>
                </div>
                <InputField
                    label="Remarks"
                    name="remarks"
                    type="number"
                    placeholder="Remarks"
                    className="border p-2 rounded w-full"
                />
                <Button className='px-4 py-2 bg-bg-color text-white rounded-md text-center' title={'Submit'} />
            </form>
        </div>
    )
}

export default FranchiseSaleFrom