import React from 'react'
import TableComponent from '../../Component/TableComponent';

const SalesDispatchList = () => {
    const title = "Sales Dispatch List";

    const headers = [
        "S.No", "Bill No", "Bill Date", "Name", "Address", "Courier By", "Docket No.",
        "Dispatched Date", "Action"
    ];

    const salesData = [
        {
            billNo: "GAUT-24/25-66",
            billDate: "31/12/2024",
            name: "ABHISHEK KUSHWAH",
            address: "Mawan",
            distributorId: "D1001",
        },
        {
            billNo: "GAUT-24/25-65",
            billDate: "31/12/2024",
            name: "SAKSHI BAGHEL BAGHEL",
            address: "Gulav ganj guna",
            distributorId: "D1002",
        },
    ];

    return (
        <div className='flex flex-col gap-5'>
            <TableComponent
                title={title}
                headers={headers}
                data={salesData}
                searchKeys={["billNo", "name"]}
                searchKey={"Bill No"}
                renderRow={(item, index) => (
                    <>
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">{item.billNo}</td>
                        <td className="border p-2">{item.billDate}</td>
                        <td className="border p-2">{item.name}</td>
                        <td className="border p-2">{item.address}</td>
                        <td className="border p-2">
                            <select name="" id="" className='border  p-1 rounded'>
                                <option value="by hand">by hand</option>
                                <option value="by hand">gati Courier</option>
                                <option value="by hand">transport</option>
                            </select>
                        </td>
                        <td className="border p-2">
                            <input type="text" className='px-2 py-1 outline-none border'/>
                        </td>
                        <td className="border p-2">
                            <input type="text" className='px-2 py-1 outline-none border'/>
                        </td>
                        <td className="border p-2">
                           <p className='text-blue-500'>Dispatch</p>
                        </td>
                    </>
                )}
            />
        </div>
    );
};

export default SalesDispatchList;
