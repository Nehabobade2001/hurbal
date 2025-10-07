import React, { useEffect, useState } from "react";
import InputField from "../../Component/InputField";
import SelectComponent from "../../Component/SelectComponent";
import Button from "../../Component/Button";
import {
  getAllCategories,
  getProductByCategory,
  getSingleProductDetails,
} from "../../api/user.api";
import TableComponent1 from "../../Component/TableComponent1";
import { getFranchiseProfile, submitStockOrder } from "../../api/franchise.api";
import { useSelector } from "react-redux";
import notfoundImg from "../../assets/images/notfound.jpg";
import Swal from "sweetalert2";
import PageLoader from "../../Component/PageLoader";

const generateTransactionId = () => {
  const randomNum = Math.floor(10000000 + Math.random() * 90000000);
  return `TXN${randomNum}`;
};

const StockOrderForm = () => {
  const franchise = useSelector((state) => state?.auth?.user);

    const [paymentModes, setPaymentModes] = useState([
          { value: "Wallet", label: "Wallet" },
          // { value: "Cash", label: "Cash" },
          { value: "UPI", label: "UPI" },
      ]);



  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    transactionId: generateTransactionId(),
    fromFranchise: "",
    address: franchise?.address || "",
    walletAmount:"",
    netAmount: "",
    products: [],
    paymentModes:"",
    remarks: "",
  });

  const [addProduct, setAddProduct] = useState({
    group: "",
    product: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        const formatted = result.data.map((cat) => ({
          label: cat.name,
          value: cat._id,
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setWalletLoading(true);
        const res = await getFranchiseProfile();

        console.log(res)
        setFormData((prev) => ({
          ...prev,
          walletAmount: res?.data?.data?.wallets?.purchaseWallet ?? 5,
        }));
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name,value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!addProduct.group || !addProduct.product || !addProduct.quantity) {
      alert("Please fill all product fields");
      return;
    }

    const enteredQty = Number(addProduct.quantity);
    const availableStock = Number(product?.stock || 0);
    if (
      isNaN(enteredQty) ||
      enteredQty <= 0
    ) {
      Swal.fire({
        title: "Invalid Quantity",
        text: "Please enter a valid quantity greater than 0.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validation: quantity should not exceed stock
    if (product && enteredQty > availableStock) {
      Swal.fire({
        title: "Warning",
        text: `Quantity cannot exceed available stock (${availableStock})`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const productToAdd = {
      ...product,
      group: addProduct.group,
      quantity: Number(addProduct.quantity),
    };

    // ✅ Check for duplicate
    const alreadyInCart = formData.products.find(
      (p) => p._id === productToAdd._id
    );
    if (alreadyInCart) {
      alert("Product already in the cart.");
      return;
    }

    const updatedProducts = [...formData.products, productToAdd];
    const subtotal = productToAdd.dp * productToAdd.quantity;
    // const gstAmount = (productToAdd.gst / 100) * subtotal;

    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
      netAmount: Number(prev.netAmount) + subtotal,
    }));

    // ✅ Log updated cart correctly
    setCartProducts((prev) => {
      const updated = [...prev, productToAdd];
      console.log("Updated cartProducts:", updated);
      return updated;
    });

    // ✅ Reset product selection fields
    setAddProduct({ group: "", product: "", quantity: "" });
    setProducts([]);
    setProduct(null);
  };

  const handleSubmit = async () => {
    try {

        if (formData.products.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Please add at least one product to the order",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Prevent form submission
    }

      setLoading(true);
      const response = await submitStockOrder(formData);

      if (
        response?.message === "Order created successfully" ||
        response?.status === 201
      ) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message || "Order submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        const walletRes = await getFranchiseProfile();
        setFormData((prev) => ({
          ...prev,
          walletAmount: walletRes?.data?.data?.wallets?.purchaseWallet || "",
        }));

        // Reset form after successful submission
        setFormData((prev) => ({
          ...prev,
          date: new Date().toISOString().split("T")[0],
          transactionId: generateTransactionId(),
          fromFranchise: "",
          address: franchise?.address || "",
          netAmount: "",
          products: [],
          remarks: "",
        }));
        setAddProduct({
          group: "",
          product: "",
          quantity: "",
        });
        setCartProducts([]);
        setProducts([]);
        setProduct(null);
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message || "Order submission failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Order submission failed!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const headers = [
    "S.No",
    "Image",
    "Product Name",
    "MRP",
    "DP",
    "GST",
    "HSN",
    "Qty",
    "Net Amt",
    "Action",
  ];

  return (
    <>
      {loading && <PageLoader />}
      <div>
        <form className="flex flex-col gap-5 p-4 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold">Order Form</h2>

          <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="Date"
              name="date"
              type="date"
              disabled
              value={formData.date}
              className="border p-2 rounded w-full"
            />

            <InputField
              label="Transaction Id"
              name="transactionId"
              type="text"
              value={formData.transactionId}
              onChange={handleChange}
              placeholder="Transaction Id"
              className="border p-2 rounded w-full"
            />

            <InputField
              label="Address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2 rounded w-full"
              disabled
            />

            <InputField
              label="Wallet Amount"
              name="walletAmount"
              type="number"
              value={formData?.walletAmount}
              onChange={handleChange}
              placeholder="Wallet Amount"
              className="border p-2 rounded w-full"
              disabled
            />

            {/* <InputField
            label="Courier Charge"
            name="courierCharge"
            type="number"
            value={formData.courierCharge}
            onChange={handleChange}
            placeholder="Courier Charge"
            className="border p-2 rounded w-full"
            disabled
          /> */}

            <InputField
              label="Net Amount"
              name="netAmount"
              type="number"
              value={formData.netAmount}
              onChange={handleChange}
              placeholder="Net Amount"
              className="border p-2 rounded w-full"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10">
            <SelectComponent
              label="Group Type"
              value={addProduct.group}
              onChange={async (e) => {
                const value = e.target.value;
                handleAddChange({ target: { name: "group", value } });
                try {
                  const result = await getProductByCategory(value);
                  const formatted = result?.data?.products?.map((product) => ({
                    label: product.name,
                    value: product._id,
                  }));
                  setProducts(formatted);
                } catch (error) {
                  console.error("Error fetching products:", error);
                }
              }}
              options={categories}
              placeholder="Select a group type"
            />

            <SelectComponent
              label="Product"
              name="product"
              value={addProduct.product}
              onChange={async (e) => {
                const value = e.target.value;
                handleAddChange({ target: { name: "product", value } });
                try {
                  const result = await getSingleProductDetails(value);
                  setProduct(result?.data?.data);
                } catch (error) {
                  console.error("Error fetching products:", error);
                }
              }}
              options={products}
              placeholder="Select a product"
            />

            {/* Stock input field (disabled) */}
            <InputField
              label="Stock"
              name="stock"
              type="number"
              value={product?.stock || ''}
              disabled
              className="border p-2 rounded w-full"
            />

            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              value={addProduct.quantity}
              onChange={handleAddChange}
              placeholder="Quantity"
              className="border p-2 rounded w-full"
            />

            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-bg-color text-white px-4 py-2 rounded mt-6"
            >
              Add Product
            </button>
          </div>

          {formData.products.length > 0 && (
            <div className="rounded-xl overflow-hidden space-y-5">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className=" text-left">
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="p-2 border border-white/30 text-center"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartProducts?.length === 0 ? (
                    <tr>
                      <td colSpan="100%" className="text-center">
                        <img
                          src={notfoundImg}
                          alt="Not found"
                          className="w-60 h-60 mx-auto mt-4"
                        />
                      </td>
                    </tr>
                  ) : (
                    cartProducts?.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-white/30 py-1"
                        >
                          <td className=" text-base text-center">
                            {index + 1}
                          </td>
                          <td className="w-full p-1 flex items-center justify-center">
                            <img
                              src={item?.images?.[0]}
                              alt=""
                              className="w-20 h-20 object-cover"
                            />
                          </td>
                          <td className=" text-base text-center">
                            {item?.name}
                          </td>
                          <td className=" text-base text-center">
                            {item?.mrp}
                          </td>
                          <td className=" text-base text-center">{item?.dp}</td>
                          <td className=" text-base text-center">
                            {item?.gst}
                          </td>
                          <td className=" text-base text-center">
                            {item?.hsn}
                          </td>
                          <td className=" text-base text-center">
                            {item?.quantity}
                          </td>
                          <td className=" text-base text-center">
                            {item?.dp * item?.quantity}
                          </td>
                          <td>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => {
                                const updatedProducts =
                                  formData.products.filter(
                                    (p) => p._id !== item._id
                                  );
                                const subtotal = item.dp * item.quantity;
                                const gstAmount = (item.gst / 100) * subtotal;

                                setFormData((prev) => ({
                                  ...prev,
                                  products: updatedProducts,
                                  netAmount:
                                    Number(prev.netAmount) -
                                    subtotal -
                                    gstAmount,
                                }));

                                setCartProducts((prev) =>
                                  prev.filter((p) => p._id !== item._id)
                                );
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          <InputField
            label="Remarks"
            name="remarks"
            type="text"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
            className="border p-2 rounded w-full"
          />

          {/* <SelectComponent
            label="Payment Mode"
            name="paymentModes"
            value={formData.paymentModes}
            onChange={(e) => handleChange(e)}
            options={paymentModes}
            // error={errors.product}
            placeholder="Select a product"
          /> */}

          <Button
            type="submit"
            className="px-4 py-2 bg-bg-color text-white rounded-md text-center"
            title="Submit"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default StockOrderForm;
