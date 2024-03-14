import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Drawer, Progress, Spin } from "antd";
import { BsSearch } from "react-icons/bs";
import { FormContext } from "../Contexts/FormContext";
import CustomButton from "./CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function GenerateInvoice({
  showInvoice,
  setShowInvoice,
  setShowTreatments,
}) {
  const utcDate = new Date().toUTCString().split(" ");
  const [day, date, month, year] = utcDate;
  const formattedDate = `${day} ${date} ${month} ${year}`;

  const [invoiceDrawer, setInvoiceDrawer] = useState(true);
  const [uploadDrawer, setUploadDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { baseUrl } = React.useContext(FormContext);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [selectedTreatment, setSelectedTreatment] = React.useState({
    code: "",
    name: "",
  });
  const [id, setId] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [cost, setCost] = React.useState("");
  const [showPlans, setShowPlans] = React.useState(false); //to display plans drawer
  const [selectPlan, setSelectPlan] = React.useState(null);
  const [custDetails, setCustDetails] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [showSubmit, setShowSubmit] = React.useState(false);

  const [showCustomerdDtails, setShowCustomerdDtails] = React.useState(false); //to display Customer details
  const [merchant, setMerchant] = React.useState({
    username: "",
    address: "",
  });
  const [total, setTotal] = useState(0);
  console.log(selectedProducts);

  const totalValue = () => {
    const totalVal = selectedProducts.reduce((sum, item) => {
      return sum + item.retailPrice * item.quantity;
    }, 0);
    setTotal(totalVal);
  };

  const onCloseInvoiceDrawer = () => {
    setInvoiceDrawer(false);
    setShowInvoice(false);
  };
  const onCloseCartDrawer = () => {
    setCartDrawer(false);
    setShowInvoice(true);
  };

  const onCloseInvoice = () => {
    setShowInvoice(false);
    setShowTreatments(true);
  };

  const handleCartClick = () => {
    setShowInvoice(false);
    setCartDrawer(true);
  };

  const onCloseCart = () => {
    setShowInvoice(true);
    setCartDrawer(false);
  };

  const onCloseUploadDrawer = () => {
    setCartDrawer(true);
    setUploadDrawer(false);
  };

  const onClosePlans = () => {
    setShowPlans(false);
    setCartDrawer(true);
    setShowSubmit(false);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Products/getallproducts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const data = res.data;
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    totalValue();
  }, [selectedProducts]);

  const handleCheckboxChange = (
    productId,
    productName,
    retailPrice,
    productCategory
  ) => {
    const productIndex = selectedProducts.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(productIndex, 1);
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          productId,
          productName,
          retailPrice,
          productCategory,
          quantity: 1, // Initialize quantity to 1
        },
      ]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity };
        }
        return product;
      });
    });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  async function blobUrlToFile(blobUrl, fileName) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  const generatePdfInvoice = async () => {
    try {
      // setUploadDrawer(true);
      // setCartDrawer(false);
      setPdfLoading(true);
      const invoiceData = {
        selectedProducts,
        totalPrice: total,
        merchantInfo: merchant,
      };

      const capture = document.querySelector(".invoice");

      // Set the desired DPI (e.g., 300 for high quality)
      const dpi = 300;

      // Calculate the scale factor based on the desired DPI
      const scaleFactor = dpi / 96; // 96 DPI is the default browser DPI

      const canvas = await html2canvas(capture, {
        scale: scaleFactor, // Apply the scale factor to increase DPI
      });

      const imgData = canvas.toDataURL("img/jpeg", 1.0);
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("invoice.pdf");

      // pdf generation using backend
      // const response = await axios.post(
      //   `${baseUrl}/Products/generatePdfInvoice`,
      //   invoiceData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //     withCredentials: "include",
      //     responseType: "blob",
      //   }
      // );

      // // Create a blob from the binary data
      // const blob = new Blob([response.data], { type: "application/pdf" });

      // // Generate a Blob URL
      // const blobURL = URL.createObjectURL(blob);

      // // convert blobUrl to file
      // const invoiceFile = await blobUrlToFile(blobURL, "invoice");

      // // Create a download link and trigger a click event
      // const downloadLink = document.createElement("a");
      // downloadLink.href = window.URL.createObjectURL(blob);
      // downloadLink.download = "invoice.pdf";
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
    } catch (error) {
      throw error;
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSubmitTreatments = async (event) => {
    event.preventDefault();
    console.log(selectedTreatment);
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("invoice", selectedFile);
    formdata.append("id", id);
    formdata.append("treatmentCode", selectedTreatment.code);
    formdata.append("treatmentCost", cost);
    // formdata.append("treatmentName", selectedTreatment.name);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/transactioninitiate`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "Success") {
        handlePlans();
        setSubmitting(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
      setSubmitting(false);
    }
  };

  const handlePlans = async () => {
    setShowPlans(true);
    setShowTreatments(false);
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/getinterests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const data = response.data;
      setSelectPlan(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvoiceClick = () => {
    setShowTreatments(false);
    setShowInvoice(true);
  };

  const onCloseTreatments = () => {
    setShowTreatments(false);
    setShowCustomerdDtails(true);
    setShowInvoice(false);
  };

  const getMerchantDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Hospitals/settings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const profile = res.data.data.profile;
      setMerchant(profile);
    } catch (error) {
      throw Error;
    }
  };

  useEffect(() => {
    getMerchantDetails();
  }, []);

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onCloseInvoiceDrawer}
        open={showInvoice}
        key="invoiceDrawer"
        width={700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
      >
        <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
          <div className="flex items-center justify-between w-full">
            <svg
              className="w-8 h-8 text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onCloseInvoice}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <button
              className="px-4 py-2 mb-4 text-white cursor-pointer bg-aliceblue disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={selectedProducts.length === 0}
              onClick={handleCartClick}
            >
              View Cart
            </button>
          </div>

          {/* <div className=" flex ml-2 mr-5 max-w-[550px] 2xl:max-w-[600px] w-full h-[32px] mt-[6.5px]  rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
          <div className="flex ml-2">
            <BsSearch size={24} color="#306FC7" />
          </div>
        </div> */}
        </div>
        <div className="ml-5 ">
          <div className="flex flex-row mt-3">
            <span className="text-2xl font-extrabold 2xl:text-3xl">
              Product Details
            </span>
          </div>
          <div>
            <div className="my-5 flex ml-auto mr-5  max-w-[550px] 2xl:max-w-[600px] w-full h-[32px]   rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
              <div className="flex ml-2">
                <BsSearch size={24} color="#306FC7" />
              </div>
              <div className="flex flex-grow pr-3">
                <input
                  type="search"
                  className="block text-sm 2xl:text-base w-full px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                  id="searchBar"
                  placeholder="Search Product"
                  value={searchInput}
                  onChange={handleSearchInput}
                />
              </div>
            </div>
            {/* <div className="max-w-xl mt-5">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Product"
                className="w-full p-3 mb-4 border border-black border-opacity-70 focus:outline-none rounded-xl"
                value={searchInput}
                onChange={handleSearchInput}
              />
            </div> */}
            <table className="w-full border border-collapse table-auto ">
              <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Select</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Retail Price</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              {loading ? (
                <div className="flex items-center justify-center w-full h-full transition ease-in delay-300 ">
                  <Spin size="large" />
                </div>
              ) : (
                <tbody className="flex flex-col gap-y-3 ">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="pb-2 bg-white border-solid border-b-1"
                    >
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              product.productId,
                              product.productName,
                              product.retailPrice,
                              product.productCategory
                            )
                          }
                          checked={
                            selectedProducts &&
                            selectedProducts.some(
                              (selectedProduct) =>
                                selectedProduct.productId === product.productId
                            )
                          }
                        />
                      </td>
                      <td className="w-16 px-4 py-2 text-base font-medium text-gray-900 capitalize whitespace-nowrap">
                        {product.productName}
                      </td>
                      <td className="px-4 py-2 text-base font-medium text-gray-900 border whitespace-nowrap">
                        ₹{product.retailPrice}
                      </td>
                      <td className="px-4 py-2 text-base font-medium text-gray-900 border whitespace-nowrap">
                        {product.productCategory}
                      </td>
                      <td className="px-4 py-2 text-base font-medium text-gray-900 border whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={
                            (selectedProducts &&
                              selectedProducts.find(
                                (selectedProduct) =>
                                  selectedProduct.productId ===
                                  product.productId
                              )?.quantity) ||
                            1
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product.productId,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 p-1 border rounded-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </Drawer>

      <Drawer
        placement="right"
        closable={false}
        onClose={onCloseCartDrawer}
        open={cartDrawer}
        key="cartDrawer"
        width={700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
      >
        <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
          <div className="flex items-center justify-between w-full">
            <svg
              className="w-8 h-8 text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onCloseCart}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <div className="relative inline-block">
              <button
                className={`px-4 py-3 mb-4 text-white cursor-pointer bg-aliceblue disabled:opacity-40 disabled:cursor-not-allowed ${
                  pdfLoading ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={generatePdfInvoice}
                disabled={pdfLoading || selectedProducts.length == 0} // Disable the button when PDF is loading
              >
                Download Invoice
              </button>
              {pdfLoading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(255, 255, 255, 0.75)" }}
                >
                  <Spin size="small" />
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="px-3 invoice">
          <div class="flex flex-col mx-auto justify-center lg:px-12 max-w-6xl">
            <div class="flex justify-between items-start mt-5">
              <img
                class="w-20 h-20"
                src="/apple-touch-icon.png"
                alt="Company Logo"
              />

              <div class="text-right text-sm space-y-1">
                <p>
                  <strong class="text-black text-base capitalize">
                    {merchant.username}
                  </strong>
                  <p className="text-xs font-light w-60">{merchant.address}</p>
                </p>
                {/* <p>123 Tech Lane</p>
                <p>123 Tech Lane</p>
                <p>123 Tech Lane</p>
                <p>123 Tech Lane</p> */}
              </div>
            </div>

            <div class="sm:flex sm:items-center mt-12">
              <div class="sm:flex-auto">
                <h1 class="text-xl">Invoice</h1>
                <p class="max-w-xs mt-4 text-gray">{formattedDate}</p>
              </div>
            </div>

            {/* table */}
            <div className="flow-root mt-10 -mx-4 sm:mx-0">
              <table className="min-w-full">
                <thead className="text-gray-900 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left sm:pl-0"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-right sm:table-cell"
                    >
                      Retail Price
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-right sm:table-cell"
                    >
                      Qty
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right sm:pr-0"
                    >
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((item) => (
                    <tr className="border-gray-200 border-solid border-b-1">
                      <td className="py-5 pl-4 pr-10 text-sm sm:pl-0 max-w-0">
                        <div className="text-base font-medium text-gray-900">
                          {item.productName}
                        </div>
                        <div className="mt-1 text-gray-400 ">
                          {item.productCategory}
                        </div>
                      </td>
                      <td className="table-cell px-3 py-5 text-base text-right text-gray-600">
                        ₹{item.retailPrice.toFixed(2)}
                      </td>
                      <td className="table-cell px-3 py-5 text-base text-right text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-5 pl-3 pr-4 text-base text-right text-gray-600 sm:pr-0">
                        ₹{(item.quantity * item.retailPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="text-right">
                    <th
                      scope="row"
                      colspan="3"
                      className="hidden pt-6 pl-4 pr-3 sm:table-cell sm:pl-0"
                    >
                      Subtotal
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-base sm:pr-0">
                      ₹{total}
                    </td>
                  </tr>
                  <tr className="text-right">
                    <th
                      scope="row"
                      colspan="3"
                      className="hidden pt-4 pl-4 pr-3 sm:table-cell sm:pl-0"
                    >
                      Tax
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-base sm:pr-0">₹{0.0}</td>
                  </tr>
                  <tr className="text-right">
                    <th
                      scope="row"
                      colspan="3"
                      className="hidden pt-4 pl-4 pr-3 sm:table-cell sm:pl-0"
                    >
                      Total
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-base font-semibold text-right text-blue sm:pr-0">
                      ₹{total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
        <div className="absolute right-0 block w-full bottom-3">
          <Divider className="mr-auto " />
          <div className="z-20 flex justify-end w-full pb-4 mr-8 ">
            <CustomButton
              firstButton="CANCEL"
              secondButton="NEXT"
              firstButtonHandleClick={onCloseTreatments}
              secondButtonHandleClick={() => {
                setCartDrawer(false);
                setShowPlans(true);
              }}
              isSubmit={false}
            />
          </div>
        </div>
      </Drawer>

      {/* plans drawer */}
      <Drawer
        placement="right"
        closable={false}
        onClose={onClosePlans}
        open={showPlans}
        key="rightPlans"
        width={700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue"
      >
        <div className="relative w-full h-screen">
          <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
            <svg
              className="w-8 h-8 text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={onClosePlans}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="block mt-8 ml-5">
            <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
              Select Plans
            </span>
          </div>
          <div className="grid font-Poppins grid-cols-2 w-[600px] gap-7 p-5 mb-">
            <div
              className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "fifteen"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("fifteen")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">15 Days</span>
              <span className="text-sm 2xl:text-base ">1% interest</span>
              {/* <span className="text-sm 2xl:text-base">per month</span> */}
            </div>
            <div
              className={`flex flex-col w-[260px] h-[170px]  bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "thirty"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("thirty")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">30 Days</span>
              <span className="text-sm 2xl:text-base">2% interest</span>
            </div>
            <div
              className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "fourtyFive"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("fourtyFive")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">45 Days</span>
              <span className="text-sm 2xl:text-base">3% interest</span>
            </div>
            <div
              className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "sixty"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("sixty")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">60 Days</span>
              <span className="text-sm 2xl:text-base">4% interest</span>
            </div>
            <div
              className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "seventyFive"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("seventyFive")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">75 Days</span>
              <span className="text-sm 2xl:text-base">5% interest</span>
            </div>
            <div
              className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                selectedMonth === "ninety"
                  ? "border-2 border-solid border-blue"
                  : "border-none"
              }`}
              onClick={() => setSelectedMonth("ninety")}
            >
              <span className="text-xl 2xl:text-2xl text-blue">90 Days</span>
              <span className="text-sm 2xl:text-base">6% interest</span>
            </div>
          </div>

          <div className="block ml-5">
            <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
              Amount Payable
            </span>
          </div>
          <div className="flex w-[580px] py-4 justify-around items-center font-Poppins border-1 border-solid border-aliceblue bg-lightBlue rounded-lg mt-5 ml-5 ">
            <div className="flex flex-col ml-10 mr-auto text-lg 2xl:text-xl text-blue">
              <span className="mb-3">Invoice Cost</span>
              {/* <span className="mb-3">Total Interest</span>
                    <span className="mb-3">Convenience Fee</span> */}
              {/* <span className="mb-2">EMI</span> */}
              <span className="mb-2 text-black">Total Payable</span>
            </div>
            <div className="flex flex-col ml-auto mr-10 text-lg 2xl:text-xl text-blue">
              <span className="mb-3 ">
                ₹{selectedMonth ? selectPlan.invoiceCost : "0"}
              </span>
              {/* <span className="mb-3 ">
                      
                      {selectedMonth
                        ? selectPlan[selectedMonth].totalInterest
                        : "0"}%
                    </span>
                    <span className="mb-3 ">
                      ₹
                      {selectedMonth
                        ? selectPlan[selectedMonth].convinienceFee
                        : "0"}
                    </span> */}
              {/* <span className="mb-3 ">
                      ₹
                      {selectedMonth
                        ? Math.round(selectPlan[selectedMonth].emi)
                        : "0"}
                    </span> */}
              <span className="mb-2 text-black">
                ₹{selectedMonth ? selectPlan[selectedMonth].totalPayable : "0"}
              </span>
            </div>
          </div>
          <div className="block mt-4 ml-5">
            <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
              Amount Receivable
            </span>
          </div>
          <div className="pb-[150px]">
            <div className="flex w-[580px] py-4  justify-around items-center font-Poppins border-1 border-solid border-aliceblue bg-lightBlue rounded-lg mt-5 ml-5 ">
              <div className="flex flex-col ml-10 mr-auto text-lg 2xl:text-xl text-blue">
                <span className="mb-3">Invoice Amount</span>
                <span className="mb-3">Total Interest</span>
                <span className="mb-3">Convenience Fee</span>
                <span className="mb-3 text-black">Total Receivable</span>
              </div>
              <div className="flex flex-col ml-auto mr-10 text-lg 2xl:text-xl text-blue">
                <span className="mb-3 ">
                  ₹{selectedMonth ? selectPlan.invoiceCost : "0"}
                </span>
                <span className="mb-3 ">
                  -
                  {selectedMonth
                    ? selectPlan[selectedMonth].totalInterest
                    : "0"}
                  %
                </span>
                <span className="mb-3 ">
                  -
                  {selectedMonth
                    ? selectPlan[selectedMonth].convinienceFee
                    : "0"}
                  %
                </span>
                <span className="mb-2 text-black">
                  ₹
                  {selectedMonth
                    ? selectPlan[selectedMonth].totalReceivable
                    : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="mr-auto bg-blue left-0 bottom-[80px] w-full"/> */}
        <div className="w-[99.7%] block absolute bottom-0 right-0 bg-white ml-0">
          <Divider className="mt-0 mr-auto bg-blue" />
          <div className="flex justify-end w-full pb-4 mr-8">
            <CustomButton
              firstButton="CANCEL"
              secondButton="DONE"
              firstButtonHandleClick={onClosePlans}
              secondButtonHandleClick={() => setShowSubmit(true)}
              isSubmit={false}
            />
          </div>
          {/* <div className="flex justify-end ">
                <button
                  className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-3 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                  onClick={onClosePlans}
                >
                  <span className="text-xl font-bold">CANCEL</span>
                </button>
                <button
                  className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                  onClick={handleSubmit}
                >
                  <span className="text-xl font-bold">NEXT</span>
                </button>
              </div> */}
        </div>
      </Drawer>
    </>
  );
}
