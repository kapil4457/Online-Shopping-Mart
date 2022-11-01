import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import "./InsertPoster.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createPoster } from "../../redux/actions/posterAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const InsertPoster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.createPoster);
  const { user } = useSelector((state) => state.user);
  const [file, setFiles] = useState(null);
  const [brand, setBrand] = useState("");
  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    setFiles([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const posterUploader = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wgk9k2lo");

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/ds82kuoet/image/upload",
      formData
    );
    let thisData = {
      public_id: data.public_id,
      url: data.url,
    };

    const info = {
      brand: brand,
      image: thisData,
    };

    setTimeout(() => {
      dispatch(createPoster(info));
    }, 3000);

    setTimeout(() => {
      toast("Poster created Successfully....");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }, 6000);

    toast("Please Wait...");
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (user?.role === "user") {
      navigate("/");
      toast("You are not allowed to access this page !!");
    }
  }, [error, user]);
  return (
    <div className="main-poster">
      <Sidebar />
      <div className="poster-main">
        <div className="poster-main-card">
          <h2>Add New Poster</h2>
          <div>
            <div>
              <label htmlFor="">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </div>
            <div>
              <p>Select Poster</p>
              <input type="file" onChange={handleFile} />
            </div>
          </div>
          <button
            onClick={posterUploader}
            disabled={user?.role !== "admin" ? false : true}
          >
            Add
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InsertPoster;
