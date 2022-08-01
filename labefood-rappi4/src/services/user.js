import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {BASE_URL} from './../constants/Url/url'
import goToPage from "../routes/coordinator";


export const login = (body, clear, Navigate, setIsLoading) => {

      axios
        .post(`${BASE_URL}/login`, body)
        .then((res) => {
            console.log(res)
          localStorage.setItem("token", res.data.token)
          clear()
          setIsLoading(false)
          goToPage(Navigate, "")

        })
        .catch((err) => {
          setIsLoading(false)
          alert(err);
        });

    };


export const signup = (body, clear, Navigate, setIsLoading, passVerify) => {


    if(body.password === passVerify){
      axios
              .post(`${BASE_URL}/signup`, body)
              .then((res) => {
                clear()
                setIsLoading(false)
                goToPage(Navigate, "login")
      
              })
              .catch((err) => {
                setIsLoading(false)
                alert(err);
              });
      
    }else{
      alert('senha não coincide')
    }
      };