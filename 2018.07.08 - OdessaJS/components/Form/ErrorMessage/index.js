/* @flow */

import classNames from "classnames";
import * as React from "react";
import styles from "./styles.css";
import { formContextTypes, getErrorMessage } from "./utils";
import type { FormContextType } from "./types";

type Props = {
  name: string,
  children?: Function
};

export default function ErrorMessage(
  { name, children }: Props,
  { form }: FormContextType
) {
  const message = getErrorMessage(form, name);

  if (!message) {
    return null;
  }

  if (typeof children === "function") {
    return children(message) || null;
  }

  return <Font.Text color="error">{message}</Font.Text>;
}

ErrorMessage.defaultProps = { name: "base"};
ErrorMessage.contextTypes = formContextTypes;
