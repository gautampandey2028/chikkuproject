import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createlog,
  productlist,
  reset_redirectToUpdate,
} from "../../ReduxToolkit/CrudSlice";
import { Pagination } from "@mui/material";
import { reset_redirectTo } from "../../ReduxToolkit/AuthSlice";
import ProductChild from "./ProductChild";
import axiosInstance from "../../Helper/Helper";

const ProductList = () => {
  const { list, totalpage } = useSelector((state) => state?.Crud);
  const [totalRecords, setPage] = useState();
  console.log(totalRecords, "totalRecords");
  const handleChange = (e, pageno) => {
    setPage(pageno);
    dispatch(
      productlist({
        page: pageno,
        perpage: 10,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productlist());
  }, [dispatch]);

  console.log(list, "list");

  useEffect(() => {
    dispatch(reset_redirectToUpdate(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(reset_redirectTo(null));
  }, [dispatch]);

  const crelog = () => {
    dispatch(createlog());
  };

  const [data1, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/product/list")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data, "hdh");
      })
      .catch((error) => {
        console.error("", error);
      });
  }, []);
  return (
    <>
      <div>
        <main id="main">
          <section id="breadcrumbs" class="breadcrumbs">
            <div class="container mt-4">
              <div class="d-flex justify-content-between align-items-center">
                <h2>Product List</h2>
                <ol>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Product List</li>
                </ol>
              </div>
            </div>
          </section>
          <div className="container mt-2">
            <div class="card">
              <div class="card-header">
                <Link
                  onClick={crelog}
                  to="/createe"
                  className="btn btn-warning"
                >
                  Create Product
                </Link>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">User NAme</th>
                      <th scope="col" colSpan={2}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length !== 0 ? (
                      list?.map((item, index) => {
                        return (
                          <>
                            <ProductChild value={item} index={index} />
                          </>
                        );
                      })
                    ) : (
                      <>
                        <p>No Data Found</p>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              {list.length !== 0 ? (
                <Pagination
                  count={totalpage}
                  onChange={handleChange}
                  totalRecords={totalRecords}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductList;
