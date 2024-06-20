import React, { useState } from "react";
import { Link } from "react-router-dom";
import { product } from "../../Helper/Helper";
import {
  productRemove,
  productlist,
  updatelog,
} from "../../ReduxToolkit/CrudSlice";
import { useDispatch } from "react-redux";
import SweetAlertComponent from "../SweetAlert/SweetAlert";

export default function ProductChild({ value, index }) {
  const dispatch = useDispatch();
  const [delete_id, setDelete_id] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const uplog = () => {
    dispatch(updatelog());
  };
  const delete_funcc = (id) => {
    if (delete_id !== "") {
      dispatch(productRemove({ id: delete_id })).then(() => {
        dispatch(productlist());
      });
    }
    setDelete_id("");
    setIsDelete(false);
  };

  // const handleDeleted = async (id) => {
  //   const formData = new FormData();
  //   formData.append("id", id);

  //   try {

  //     await axiosInstance.post("/product/remove", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     const response = await axiosInstance.get("/product/list");
  //     console.log(response.data.data);
  //     setVal(response.data.data);

  //     setOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{value?.title}</td>
        <td>
          {" "}
          <img
            height="30px"
            src={value?.image ? product(value?.image) : "error"}
            alt="A dog"
          />
        </td>
        <td>{value?.description}</td>
        <td>
          <Link
            onClick={uplog}
            to={`/update/${value?._id}`}
            className="btn btn-primary"
          >
            Update
          </Link>
        </td>
        <td>
          <Link
            to=""
            onClick={() => {
              setDelete_id(value?._id);
              setIsDelete(true);
            }}
            class="btn btn-primary mr"
          >
            Delete
          </Link>
        </td>
      </tr>

      {isDelete && (
        <SweetAlertComponent
          confirm={delete_funcc}
          cancle={() => setIsDelete(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
    </>
  );
}
