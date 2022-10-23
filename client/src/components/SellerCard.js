import { getTutees, productCurrencyFormatter } from "../actions/product";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Space, Table, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

import Countdown from "react-countdown";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const SellerCard = ({
  p,
  handleProductDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  const [tutee, setTutees] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  useEffect(() => {
    loadTutees();
  }, []);

  const loadTutees = async () => {
    let res = await getTutees(token, p._id);
    setTutees(res);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Timer",
      dataIndex: "timer",
      key: "timer",
      render: (timer) => <a>{timer}</a>,
    },
  ];
  const data = [
    {
      key: "1",
      name: "Test User",
      email: "test@gmail.com",
      timer: "Click to Start Timer",
    },
  ];

  const submit = () => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            handleProductDelete(p._id);
            onClose();
            Toast.fire({
              icon: "success",
              title: "Product deleted succesfully.",
            });
          }
        });
      },
    });
  };

  const tutees = () => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm">
            <h1>Your Tutees</h1>
            <Table columns={columns} dataSource={data} />

            <button
              className="yes-btn"
              onClick={() => {
                onClose();
              }}
            >
              Ok
            </button>
          </div>
        );
      },
    });
  };

  console.log(p);
  return (
    <>
      <div className="card mb-3 p-5 sellerCard">
        <div className="row no-gutters flex-dir-col">
          <div className="">
            {p.image && p.image.contentType ? (
              <img
                src={`http://localhost:8080/api/product/image/${p._id}`}
                alt="Product Image"
                className="sellerImg"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="Default Product Image"
                className="card=image img img-fluid"
              />
            )}
          </div>
          <div className="">
            <div className="card-body ">
              <h3 className="card-title">
                {p.price !== 0 ? (
                  <span className="float-right text-primary ">
                    {productCurrencyFormatter({
                      amount: p.price,
                      currency: "usd",
                    })}
                  </span>
                ) : (
                  <span className="float-right text-danger">DONATING</span>
                )}
              </h3>
              <h3>{p.title} </h3>
              <h5 className="alert alert-info">
                {p.description.length > 300
                  ? `${p.description.substring(0, 300)}...`
                  : p.description}
              </h5>
              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/product/${p._id}`)}
                    className="btn btn-primary"
                  >
                    Show More
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/product/edit/${p._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => submit()}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerCard;
