import React, { useEffect, useState, useRef } from "react";
import "./adminpage.css";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ChartComponent from "../../Components/ChartComponent/ChartComponent";

const AdminPage = () => {
  const [categories, setCategories] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [stores, setStores] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(0);
  const productNameRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const productCaloriesRef = useRef(null);
  const productPriceRef = useRef(null);
  const EmployeeEmailRef = useRef(null);
  const EmployeeNameRef = useRef(null);
  const EmployeePasswordRef = useRef(null);

  const getAllStores = () => {
    toast.promise(
      axios.get(process.env.REACT_APP_API + "/api/Store/all").then((res) => {
        setStores(res.data);
      }),
      {
        error: "Error Fetching Stores",
      }
    );
  };
  const isvalidAdmin = () => {
    const token = localStorage.getItem("admin-token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(process.env.REACT_APP_API + "/api/Admin/tst", { headers })
      .then((res) => {})
      .catch((err) => {
        window.location.href = "admin/login";
      });
  };

  useEffect(() => {
    if (localStorage.getItem("admin-token") == null) {
      window.location.href = "/admin/login";
    } else {
      isvalidAdmin();
    }
    toast.promise(
      axios
        .get(process.env.REACT_APP_API + "/api/Product/Categories")
        .then((res) => {
          setCategories(res.data);
        }),
      {
        error: "Error Fetching Categories",
      }
    );
    getAllStores();
  }, []);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const validateValues = (
    productname,
    productdescription,
    productcalories,
    productprice
  ) => {
    if (productname.trim() === "") {
      toast.error("Product Name is required");
      return false;
    }
    if (productdescription.trim() === "") {
      toast.error("Product Description is required");
      return false;
    }
    if (parseInt(productcalories) <= 0) {
      toast.error("product calories should be >=0");
      return false;
    }
    if (categoryId === 0) {
      toast.error("Please select a category");
      return false;
    }
    if (parseInt(productprice) <= 1) {
      toast.error("product price should >=1");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("File", selectedFile);
    try {
      const productname = productNameRef.current.value;
      const productdescription = productDescriptionRef.current.value;
      const productcalories = productCaloriesRef.current.value;
      const productprice = productPriceRef.current.value;
      if (
        !validateValues(
          productname,
          productdescription,
          productcalories,
          productprice
        )
      ) {
        return;
      }
      toast.promise(
        axios
          .post(process.env.REACT_APP_API + "/api/Admin/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
            },
          })
          .then(async (res) => {
            const imageUrl = res.data.url;
            const productResponse = await axios.post(
              process.env.REACT_APP_API + "/api/Admin/addproduct",
              {
                name: productname,
                description: productdescription,
                calories: productcalories,
                cost: productprice,
                categoryId: categoryId,
                imageUrl: imageUrl,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "admin-token"
                  )}`,
                },
              }
            );
            if (productResponse.status === 200) {
              toast.success("Product Added Successfully");
            }
          })
          .catch((err) => {
            throw err;
          }),
        {
          loading: "Uploading the file",
          success: "File uploaded successfully",
          error: "Error uploading the file",
        }
      );
    }
    catch (err) {
      toast.error("Error uploading the file");
    }
  };
  const handleCategoryChange = (event) => {
    event.preventDefault();
    setCategoryId(event.target.value);
  };
  const handleStoreChange = (event) => {
    event.preventDefault();
    setSelectedStoreId(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidemployeeDetails = (
    employeeEmail,
    employeeName,
    employeePassword
  ) => {
    if (isValidEmail(employeeEmail) === false) {
      toast.error("Not a valid email");
      return false;
    }
    if (employeeName.trim() === "") {
      toast.error("Employee Name is required");
      return false;
    }
    if (employeePassword.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return false;
    }
    if (selectedStoreId == 0) {
      toast.error("Please select a store");
      return false;
    }
    return true;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const email = EmployeeEmailRef.current.value;
    const name = EmployeeNameRef.current.value;
    const password = EmployeePasswordRef.current.value;
    if (!isValidemployeeDetails(email, name, password)) {
      return;
    }
    const data = {
      email: email,
      name: name,
      password: password,
      storeId: parseInt(selectedStoreId),
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
    };

    toast.promise(
      axios
        .post(process.env.REACT_APP_API + "/api/Employee/register", data, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        }),
      {
        loading: "Adding Employee",
        success: "Employee Added Successfully",
        error: "Error Adding Employee",
      }
    );
  };

  return (
    <div className="vertical-tabs-container">
      <Tabs className="vertical-tabs">
        <TabList className="vertical-tablist">
          <h1>Admin</h1>
          <Tab>Dasboard</Tab>
          <Tab>AddProduct</Tab>
          <Tab>Add Employee</Tab>
        </TabList>
        <TabPanel className="categories">
          <h1 className="category-name" style={{ width: "50vw" }}>
            <ChartComponent />
          </h1>
        </TabPanel>
        <TabPanel className="categories">
          <h1 className="category-name" style={{ width: "50vw" }}>
            AddProduct
          </h1>
          <form className="product-form">
            <input
              type="text"
              placeholder="Product Name"
              ref={productNameRef}
            />
            <input
              type="text"
              placeholder="Product Description"
              ref={productDescriptionRef}
            />
            <input
              type="number"
              placeholder="No Of Calories"
              ref={productCaloriesRef}
            />
            <input
              type="number"
              placeholder="Product Price"
              ref={productPriceRef}
            />
            <input
              type="file"
              onChange={handleFileChange}
              placeholder="Product Image"
            />
            <select
              name="category"
              id="category"
              onChange={handleCategoryChange}
            >
              <option value={0}>Select Category</option>
              {categories?.map((category) => (
                <option value={parseInt(category.categoryId)}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit}>Add Product</button>
            <br />
          </form>
        </TabPanel>
        <TabPanel className="categories">
          <h1 className="category-name" style={{ width: "50vw" }}>
            Add Employee
          </h1>
          <form className="product-form">
            <input
              type="text"
              placeholder="Employee Email"
              ref={EmployeeEmailRef}
            />
            <input
              type="text"
              placeholder="Employee Name"
              ref={EmployeeNameRef}
            />
            <input
              type="text"
              placeholder="Employee Password"
              ref={EmployeePasswordRef}
            />
            <select onChange={handleStoreChange}>
              <option value={0}>Select Store</option>
              {stores?.map((store) => {
                return (
                  <option value={store.storeId}>
                    ({store.city}) {store.address}
                  </option>
                );
              })}
            </select>
            <button onClick={handleAddEmployee}>Add Employee</button>
          </form>
        </TabPanel>
      </Tabs>
      <Toaster />
    </div>
  );
};

export default AdminPage;
