import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [savedAddress, setSavedAddress] = useState(null);
  const [useSaved, setUseSaved] = useState(true);

  const [address, setAddress] = useState({
    pincode: "",
    city: "",
    state: "",
    fullAddress: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/user").then((res) => {
      setSavedAddress(res.data.address);
      setAddress(res.data.address);
    });
  }, []);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    const res = await axios.post("http://localhost:5000/api/orders", {
      address,
      paymentMethod: "COD",
    });

    navigate(`/order-success/${res.data._id}`);
  };

  return (
    <div className="container">
      <h4>Delivery Address</h4>

      {savedAddress && (
        <div className="mb-3">
          <input type="radio" checked={useSaved} onChange={() => setUseSaved(true)} /> Use saved address
          <br />
          <input type="radio" checked={!useSaved} onChange={() => setUseSaved(false)} /> New address
        </div>
      )}

      {!useSaved && (
        <>
          <input className="form-control mb-2" name="pincode" placeholder="Pincode" onChange={handleChange} />
          <input className="form-control mb-2" name="city" placeholder="City" onChange={handleChange} />
          <input className="form-control mb-2" name="state" placeholder="State" onChange={handleChange} />
          <textarea className="form-control mb-3" name="fullAddress" placeholder="Full address" onChange={handleChange} />
        </>
      )}

      <button className="btn btn-success w-100" onClick={placeOrder}>
        Pay & Place Order
      </button>
    </div>
  );
};

export default Checkout;
