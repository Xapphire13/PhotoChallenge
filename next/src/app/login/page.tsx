"use client";

import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ElevatedCardContainer from "../core/Card/ElevatedCardContainer";
import Card from "../core/Card";
import CardContent from "../core/Card/CardContent";
import TextInput from "../core/forms/TextInput";
import PrimaryButton from "../core/buttons/PrimaryButton";
import useOnEnter from "../hooks/useOnEnter";
import styles from "./page.module.css";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const submitDisabled = !username.trim() || !password.trim();
  const handleSubmitForm = () => {
    if (!submitDisabled) {
      formRef.current?.submit();
    }
  };

  const loginError = Boolean(searchParams.get("error"));
  const handleKeyDown = useOnEnter(handleSubmitForm);

  return (
    <ElevatedCardContainer>
      <Card>
        <CardContent className={styles.cardContent}>
          <h1>Login</h1>

          <form ref={formRef} className={styles.form} method="POST">
            <TextInput
              id="username"
              name="username"
              value={username}
              onChange={setUsername}
              placeholder="Username"
              className={styles.formField}
              autoFocus
            />
            <TextInput
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              onKeyDown={handleKeyDown}
              type="password"
              className={styles.formField}
            />

            <PrimaryButton
              className={styles.submitButton}
              disabled={submitDisabled}
              submit
            >
              Submit
            </PrimaryButton>
          </form>

          {loginError && (
            <p className={styles.loginError}>Incorrect username/password</p>
          )}
        </CardContent>
      </Card>
    </ElevatedCardContainer>
  );
}
