import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`https://assignment-mo91.onrender.com/api/orders/${id}`)
      .then((res) => setOrder(res.data));
  }, [id]);

  if (!order)
    return <p className="text-center mt-5">Loading order status...</p>;

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="container text-center">
      <h4 className="mb-2">Order Tracking</h4>

      <p className="text-muted mb-4">
        Order ID: <b>{order._id}</b>
      </p>

      {/* STATUS TRACKER */}
      <div className="d-flex justify-content-between align-items-start">
        {steps.map((step, index) => (
          <div key={step} className="text-center w-100">
            {/* CIRCLE */}
            <div
              className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                background:
                  index <= currentStep ? "#28a745" : "#dee2e6",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {index <= currentStep ? "✓" : index + 1}
            </div>

            {/* LABEL */}
            <small
              className={
                index <= currentStep
                  ? "text-success fw-bold"
                  : "text-muted"
              }
            >
              {step}
            </small>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                style={{
                  height: "4px",
                  background:
                    index < currentStep ? "#28a745" : "#dee2e6",
                  margin: "12px auto",
                  width: "100%",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* CURRENT STATUS */}
      <div className="mt-4 text-success fw-bold">
        Current Status: {order.status}
      </div>
    </div>
  );
};

export default TrackOrder;


