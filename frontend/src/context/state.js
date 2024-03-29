import { createContext, useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import config from "../config";

export const StateContext = createContext();

export default function StateContextProvider({ children }) {
  const [user, setuser] = useState(localStorage.getItem("user") || null)
  const setUser = (e) => setuser(e)
  const { enqueueSnackbar } = useSnackbar();

  const [disable, setDisable] = useState(false);
  const buttonState = (e) => {
    console.log("just now >>>",e)
    setDisable(e);}

  const [loading, setLoading] = useState(false);
  const loadingState = (e) => {
    console.log("just now >>>",e)
    setLoading(e)};

  const [formPostData, setformPostData] = useState(undefined);
  const setFormPost = (data) => setformPostData(data);

  const [isLogin, setisLogin] = useState(true);
  const changeIsLogin = (e) => setisLogin(e);

  const [isAdmin, setisAdmin] = useState(true);
  const changeIsAdmin = (e) => setisAdmin(e);

  const notification = (type = "info", message) => {
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: { vertical: "top", horizontal: "right" }
    });

  }
  async function postForm(url = "") {
    let formData = new FormData();
    formData.append("file", formPostData?.file)
    formData.append("meta", JSON.stringify(formPostData?.data))
    setLoading(true);
    const response = await fetch(`${config.baseUrl}/api/v1/forms`, {
      method: "POST",
      body: formData
    });
    if (response.ok === true) {
      // notification("success", response.message)
    } else {
      notification("error", response.message)
    }
    setLoading(false);
    return response.json();
  }
  async function submit(data) {
    console.log(data)
    const response = await fetch(`http://localhost:5000/create`, {
      method: "POST",
      body: data
    })
    if (response.ok === "true") {
      notification("success", response.message)
    } else {
      notification("error", response.message)
    }
    return response.json()
  }
  async function postPersonalData(url = "") {
    setLoading(true);
    const response = await fetch(`${config.baseUrl}/api/v1/forms/personal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPostData.data),
    });
    if (response.ok === true) {
      // notification("success", response.message)
    } else {
      notification("error", response.message)
    }
    setLoading(false);
    return response.json();
  }
  
  async function postData(url = "") {
    setLoading(true);
    const response = await fetch(`${config.baseUrl}/api/v1/forms/${formPostData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPostData.data),
    });
    setLoading(false);
    return response.json();
  }
  async function submitForm(url = "") {
    setLoading(true);
    const response = await fetch(`${config.baseUrl}/api/v1/forms/submit/${formPostData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPostData.data),
    });
    if (response.ok === true) {
      // notification("success", response.message)
    } else {
      notification("error", response.message)
    }
    setLoading(false);
    return response.json();
  }
  const login = (data) => {
    setLoading(true)
    fetch(`${config.baseUrl}/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(response.data.user))
          localStorage.setItem("token", response.data.token)
          setuser(response.data.user)
          setLoading(false)
          //notification("success", response.message)
          return
        }
        notification("error", response?.message)
        setLoading(false)
      }).catch((err) => {
        notification("error", err.message)
        setLoading(false)
      });
  };

  useEffect(() => {

    let localuser = JSON.parse(localStorage.getItem("user")) || null
    setuser(localuser)
  }, []);

  const context = {
    user,
    disable,
    loading,
    formPostData,
    isLogin,
    isAdmin,
    submit,
    setUser,
    postForm,
    notification,
    changeIsLogin,
    changeIsAdmin,
    buttonState,
    loadingState,
    setFormPost,
    postData,
    submitForm,
    postPersonalData,
    login,
  };

  return <StateContext.Provider
    value={context}>
    {children}
  </StateContext.Provider>;
}
