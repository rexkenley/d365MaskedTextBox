import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import MaskedTextBox from "../src/jsx/maskedTextBox";

const mask = "(999) 999-9999",
  maskChar = "?";

storiesOf("MaskedTextBox", module)
  .add("Initial", () => <MaskedTextBox />)
  .add("with props hidden", () => <MaskedTextBox hidden />)
  .add("with props disabled", () => <MaskedTextBox disabled />)
  .add("with props required", () => <MaskedTextBox required />)
  .add("with props value and mask", () => (
    <MaskedTextBox value="(800) 642-7676" mask={mask} />
  ))
  .add("with props mask, maskChar and onChange", () => (
    <MaskedTextBox
      mask={mask}
      maskChar={maskChar}
      onChange={action("onChange")}
    />
  ))
  .add("currency example", () => (
    <MaskedTextBox mask="$999,999.00" onChange={action("onChange")} />
  ));
