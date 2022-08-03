import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGetProfileDetails from "../../../hooks/useGetProfileDetails";
import { useForm } from "../../../hooks/useForm";
import goToPage from "../../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { address } from "../../../services/user";
import useProtectedPage from "../../../hooks/useProtected";
import Header from "../../../components/Header/Login-Signup/header";
import { LabelFloat } from "../../../services/FloatingLabel";

function EditEndePage() {
  const profileDetails = useGetProfileDetails();
  const navigate = useNavigate();
  useProtectedPage();

  const [form, onChange, cleanFields] = useForm({
    street: "",
    number: "",
    neighbourhood: "",
    city: "",
    state: "",
    complement: "",
  });

  const onSubmit = () => {
    address(form, cleanFields);
  };

  return (
    <Container>
      <Header page="profile" title="Endereço" />
      {/* <header>
        <div id="header">
          <button onClick={() => goToPage(navigate, "profile")}>Voltar</button>
          <p>Endereço</p>
        </div>
        <hr />
      </header> */}
      <main>
        <form id="forms">
          <LabelFloat>
            <input
               type="text"
              name="street"
              value={form.street}
              onChange={onChange}
              placeholder={profileDetails.street}
              required
            />
            <label>Rua*</label>
          </LabelFloat>
          <LabelFloat>
            <input
              type="number"
              name="number"
              value={form.number}
              onChange={onChange}
              placeholder={profileDetails.number}
              required
            />
            <label>Número*</label>
          </LabelFloat>
          <LabelFloat>
            <input
              name="complement"
              value={form.complement}
              onChange={onChange}
              placeholder="Apto./Bloco"
            ></input>
            <label>Complemento*</label>
          </LabelFloat>
          <LabelFloat>
            <input
              name="neighbourhood"
              value={form.neighbourhood}
              onChange={onChange}
              placeholder={profileDetails.neighbourhood}
              required
            />
            <label>Bairro*</label>
          </LabelFloat>
          <LabelFloat>
            <input
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder={profileDetails.city}
              required
            />
            <label>Cidade*</label>
          </LabelFloat>
          <LabelFloat>
            <input
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder={profileDetails.state}
              required
            />
            <label>Estado*</label>
          </LabelFloat>
          <button onClick={() => onSubmit()}><strong>Salvar</strong></button>
          {/* ADICIONAR FUNÇÃO DE ADD ADRESS NO ONCLICK*/}
        </form>
      </main>
    </Container>
  );
}

export default EditEndePage;
