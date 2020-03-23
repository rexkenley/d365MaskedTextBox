import React, { useState, useEffect } from "react";
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Stack } from "office-ui-fabric-react";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";

initializeIcons();

/** @module maskedTextBox */

/**
 * @module maskedTextBox/MaskedTextBoxProps
 * @typedef {{}} MaskedTextBoxProps
 * @property {string} value
 * @property {string} mask
 * @property {string} maskChar
 * @property {boolean} disabled
 * @property {boolean} hidden
 * @property {boolean} required
 * @property {function} onChange
 */

/**
 * MaskedTextBox
 * @module maskedTextBox/MaskedTextBox
 * @function
 * @param {MaskedTextBoxProps} props
 * @returns {{}}
 */
const MaskedTextBox = props => {
  const { value, mask, maskChar, disabled, hidden, required, onChange } = props,
    [_value, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Fabric style={{ opacity: hidden ? 0 : 100 }}>
      <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
        <MaskedTextField
          value={_value}
          mask={mask}
          maskChar={maskChar}
          disabled={disabled}
          required={required}
          onChange={(ev, val) => {
            setValue(val);
            onChange && onChange(val);
          }}
        />
      </Stack>
    </Fabric>
  );
};

export default MaskedTextBox;
