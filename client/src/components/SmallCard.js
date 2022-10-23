import { productCurrencyFormatter } from "../actions/product";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  p,
  handleProductDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  console.log(p);
  return (
    <>
      <div className="card me-2 p-5 h-100 w-100 flex-1">
        <div className="row no-gutters">
          <div className="col-md-4">
            {p.image && p.image.contentType ? (
              <img
                src={`http://localhost:8080/api/product/image/${p._id}`}
                alt="Product Image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="Default Product Image"
                className="card=image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {p.price !== 0 ? (
                  <>
                    <h3>{p.title} </h3>
                    <span className="float-right text-primary ">
                      {productCurrencyFormatter({
                        amount: p.price,
                        currency: "usd",
                      })}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="float-right text-danger">DONATING</span>
                    <h3> {p.title} </h3>
                  </>
                )}
              </h3>

              <h6 className="alert alert-info">
                {p.description.length > 300
                  ? `${p.description.substring(0, 300)}...`
                  : p.description}
              </h6>

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
                      onClick={() => handleProductDelete(p._id)}
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

export default SmallCard;
