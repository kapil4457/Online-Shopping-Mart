import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../redux/actions/userAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loader/Loading";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [transformation, setTransformation] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassworda] = useState("");
  const [file, setFiles] = useState(null);

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

  const moveLeft = () => {
    setTransformation(-32);
  };
  const moveRight = () => {
    setTransformation(0);
  };

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTrigger = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(email, password));
      console.log("Login  Form Submitted");
      navigate("/account");
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerTrigger = async () => {
    if (!name || !email || !password || !file) {
      toast("Please enter all the fields");
      return;
    }

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
      name: name,
      email: email,
      password: password,
      avatar: thisData,
    };

    setTimeout(() => {
      dispatch(register(info));
    }, 2000);
    setTimeout(() => {
      toast("User Registered Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, 9000);

    toast("Please Wait...");
  };

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated === true) {
      navigate("/account");
    }
  }, [dispatch, navigate, error, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main-login-page">
          <div className="get-in-card">
            <div
              className="login-container"
              style={{ transform: `translateX(${transformation}rem)` }}
            >
              <h3>Login</h3>
              <div className="email">
                <label htmlFor="">Email </label>
                <input
                  type="email"
                  className="em"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="password">
                <label htmlFor="">Password </label>
                <input
                  type="password"
                  className="pass"
                  value={password}
                  onChange={(e) => {
                    setPassworda(e.target.value);
                  }}
                />
              </div>

              <button className="submit" onClick={loginTrigger}>
                Login
              </button>
              <p>
                Not registered yet ? <span onClick={moveLeft}>Register</span>
              </p>
            </div>
            <div
              className="register-container"
              style={{ transform: `translateX(${transformation}rem)` }}
            >
              <h3>Register</h3>
              <div className="name">
                <label htmlFor="">Name </label>
                <input
                  type="text"
                  className="na"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="email">
                <label htmlFor="">Email </label>
                <input
                  type="email"
                  className="em"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="password">
                <label htmlFor="">Password </label>
                <input
                  type="password"
                  className="pass"
                  value={password}
                  onChange={(e) => {
                    setPassworda(e.target.value);
                  }}
                />
              </div>
              <div className="image">
                Profile Pic
                <label onChange={handleFile}>
                  <input type="file" multiple="multiple" />
                </label>
              </div>

              <button className="submit" onClick={registerTrigger}>
                Register
              </button>

              <p>
                Already registered ? <span onClick={moveRight}>Login</span>
              </p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;
