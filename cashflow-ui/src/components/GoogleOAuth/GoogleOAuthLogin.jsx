import React from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function GoogleOAuth({ setAppState, setLoginError, setIsLoading }) {
  const navigateTo = useNavigate();
  async function login(email, password) {
    setIsLoading(true);
    try {
      const { data, error, message } = await apiClient.login({
        email: email,
        password: password,
      });
      if (error) {
        setLoginError("Invalid email and/or password.");
        setIsLoading(false);
        return;
      }
      if (data) {
        setAppState((prevState) => ({
          ...prevState,
          user: data.user,
          isAuthenticated: true,
          quizzes: data.quizzes,
          goals: data.goals,
        }));

        localStorage.setItem("CashFlow_Token", data.token);
        apiClient.setToken(data.token);
        if (data.user.quiztaken === "N") {
          navigateTo("/registerquiz");
        } else {
          navigateTo("/");
        }
      } else {
        setLoginError("Invalid email and/or password.");
      }
    } catch (err) {
      console.log(err);
      setLoginError("Invalid email and/or password.");
    }
    setIsLoading(false);

  }

  function handleCallbackResponse(response) {
    const user = jwt_decode(response.credential);
    if (user) {
      login(user.email, user.sub);
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "477805064769-8qp811kp2mhb4aim7g8c5agcjaq9bdpk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("logInDiv"), {
      theme: "outline",
      context: "login",
      size: "large",
    });
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        width: "fit-content",
        textAlign: "center",
      }}
      id="logInDiv"
    ></div>
  );
}
