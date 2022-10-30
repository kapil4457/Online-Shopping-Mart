import React, { useEffect, useState } from "react";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ShippingInfo.css";
const Shipping = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast("Phone number should be 10 digits long");
      return;
    }
    if (!address || !city || !state || !country || !pinCode) {
      toast("Please fill in all the details");
      return;
    }
    const data = {
      address: address,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      phoneNo: phoneNo,
    };
    localStorage.setItem("ShippingInfo", JSON.stringify(data));
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (localStorage.getItem("ShippingInfo")) {
      let data = JSON.parse(localStorage.getItem("ShippingInfo"));
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setCountry(data.country);
      setPinCode(data.pinCode);
      setPhoneNo(data.phoneNo);
    }
  }, []);

  return (
    <>
      <div className="ShippingContainer">
        <div className="ShippingBox">
          <div className="ShippingHeading">Shipping Details</div>
          <div
            className="ShippingForm"
            encType="multipart/form-data"
            // onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                className="input"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                className="input"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                className="input"
                type="text"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                className="input"
                type="text"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="shippingBtn"
              disabled={state ? false : true}
              onClick={shippingSubmit}
            >
              Continue
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Shipping;
