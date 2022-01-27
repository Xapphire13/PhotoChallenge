import { css, cx } from "@linaria/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { gql, useMutation } from "urql";
import useOnEnter from "../../../hooks/useOnEnter";
import theme from "../../../theme";
import PrimaryButton from "../../core/buttons/PrimaryButton";
import TextInput from "../../core/forms/TextInput";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";

const classNames = {
  form: css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing["8px"]};
    ${theme.responsive.mediumAndAbove} {
      width: 400px;
    }
  `,
};

const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $invitationCode: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      invitationCode: $invitationCode
    ) {
      success
    }
  }
`;

export default function InvitePage() {
  const navigate = useNavigate();
  const { invitationCode } = useParams();
  const [, createUserMutation] = useMutation(CREATE_USER_MUTATION);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = (
    // eslint-disable-next-line no-shadow
    username: string,
    // eslint-disable-next-line no-shadow
    email: string,
    // eslint-disable-next-line no-shadow
    password: string,
    // eslint-disable-next-line no-shadow
    invitationCode: string
  ) =>
    createUserMutation({
      username,
      email,
      password,
      invitationCode,
    });
  const submitDisabled = !username.trim() || !email.trim() || !password.trim();
  const handleSubmit = async () => {
    if (!submitDisabled && invitationCode) {
      await handleCreateUser(username, email, password, invitationCode);
      navigate("/");
    }
  };
  const handleKeyPress = useOnEnter(handleSubmit);

  return (
    <CenterLayout>
      <ColumnLayout>
        <h1>Create an account</h1>
        <form className={cx(classNames.form)}>
          <TextInput
            id="username"
            name="username"
            placeholder="Username"
            fullWidth
            autoFocus
            value={username}
            onChange={setUsername}
          />
          <TextInput
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            fullWidth
            value={email}
            onChange={setEmail}
          />
          <TextInput
            id="password"
            name="password"
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
    </CenterLayout>
  );
}
