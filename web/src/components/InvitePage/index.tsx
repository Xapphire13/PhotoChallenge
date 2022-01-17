import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useOnEnter from "../../hooks/useOnEnter";
import usePersistentStorage from "../../hooks/usePersistentStorage";
import theme from "../../theme";
import User from "../../types/User";
import PrimaryButton from "../core/buttons/PrimaryButton";
import TextInput from "../core/forms/TextInput";
import ColumnLayout from "../layouts/ColumnLayout";

const classNames = {
  container: css`
    display: flex;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["8px"]};
    ${theme.responsive.mediumAndAbove} {
      width: 400px;
    }
  `,
};

export default function InvitePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, saveUser] = usePersistentStorage<User>("user");

  const submitDisabled = !username.trim() || !email.trim() || !password.trim();
  const handleSubmit = () => {
    if (!submitDisabled) {
      saveUser({
        username,
        email,
      });
      navigate("/");
    }
  };
  const handleKeyPress = useOnEnter(handleSubmit);

  return (
    <div className={cx(classNames.container)}>
      <ColumnLayout>
        <h1>Create an account</h1>
        <form className={cx(classNames.form)}>
          <TextInput
            id="username"
            placeholder="Username"
            fullWidth
            autoFocus
            value={username}
            onChange={setUsername}
          />
          <TextInput
            id="email"
            placeholder="Email"
            type="email"
            fullWidth
            value={email}
            onChange={setEmail}
          />
          <TextInput
            id="password"
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={setPassword}
            onKeyPress={handleKeyPress}
          />
          <PrimaryButton onClick={handleSubmit} disabled={submitDisabled}>
            Submit
          </PrimaryButton>
        </form>
      </ColumnLayout>
    </div>
  );
}
