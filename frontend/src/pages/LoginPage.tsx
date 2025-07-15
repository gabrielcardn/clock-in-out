import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError("Por favor, insira um código.");
      return;
    }
    setError("");

    try {
      const response = await axios.get(`http://localhost:3001/users/by-code/${code}`);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/dashboard");
      }
    } catch (err) {
      setError("Código de usuário inválido.");
      console.error(err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Ponto Ilumeo</h1>
      <form className={styles.form} onSubmit={handleConfirm}>
        <label htmlFor="userCode" style={{ display: "none" }}>
          Código do usuário
        </label>
        <input
          id="userCode"
          className={styles.input}
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="INSIRA SEU CÓDIGO"
          autoFocus
        />
        <button type="submit" className={styles.button}>
          Confirmar
        </button>
      </form>
      <p className={styles.error}>{error || " "}</p>
    </div>
  );
}
