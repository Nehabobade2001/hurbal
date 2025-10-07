import React, { useEffect, useState } from 'react';
import TableComponent from '../../Component/TableComponent';
import { getStock } from '../../api/franchise.api';
import PageLoader from '../../Component/PageLoader';

const ProductWiseStock = () => {
  const title = "Product Wise Stock";
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await getStock();
       

        if (response?.data?.products) {
          const formattedData = response.data.products.map((item, index) => ({
            productCode: item?.productId?.productCode,
            productName: item.productId.name,
            unit: item.productId.category.name,
            pv: item.productId.pv,
            productGroup: "Health",
            qtyIn: item.productId.stock,
            qtyOut: item.productId.stock - item.quantity,
            balance: item.quantity,
            purchasePrice: item.productId.dp,
            stockValue: item.quantity * item.productId.dp
          }));
          setStockData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const headers = [
    "SNo.",
    "Product Code",
    "Product Name",
    "Category",
    "PV",
    "Product Group",
    "Qty",
    // "Qty Out",
    // "Balance",
    "Purchase Price",
    "Stock Value"
  ];

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <TableComponent
        title={title}
        headers={headers}
        data={stockData}
        searchKeys={["productCode", "productName"]}
        renderRow={(item, index) => (
          <>
            <td className="border-r border-b p-2 text-center">{index + 1}</td>
            <td className="border-r border-b p-2 text-center">{item.productCode}</td>
            <td className="border-r border-b p-2 text-center">{item.productName}</td>
            <td className="border-r border-b p-2 text-center">{item.unit}</td>
            <td className="border-r border-b p-2 text-center">{item.pv}</td>
            <td className="border-r border-b p-2 text-center">{item.productGroup}</td>
            <td className="border-r border-b p-2 text-center">{item.balance}</td>
            {/* <td className="border-r border-b p-2 text-center">{item.qtyOut}</td> */}
            {/* <td className="border-r border-b p-2 text-center">{item.balance}</td> */}
            <td className="border-r border-b p-2 text-center">₹{item.purchasePrice}</td>
            <td className="border-b p-2 text-center">₹{item.stockValue}</td>
          </>
        )}
      />
    </div>
  );
};

export default ProductWiseStock;
