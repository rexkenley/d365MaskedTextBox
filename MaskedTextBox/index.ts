import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

import MtB from "../src/jsx/maskedTextBox";

export class MaskedTextBox
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private value: string | null;
  private mask: string | null;
  private maskChar: string | null;
  private updatedByReact: boolean;
  private isControlDisabled: boolean;
  private isVisible: boolean;
  private isRequired: boolean;

  equivalent(parameters) {
    const { value } = parameters;
    return value && value.raw === this.value;
  }

  syncData(parameters) {
    const { value } = parameters;
    this.value = (value && value.raw) || null;
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    const { parameters, mode } = context,
      { value, mask, maskChar } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.value = value && value.raw;
    this.mask = mask && mask.raw;
    this.maskChar = maskChar && maskChar.raw;
    this.updatedByReact = false;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
    this.isRequired = false;

    ReactDOM.render(
      React.createElement(MtB, {
        value: this.value,
        mask: this.mask,
        maskChar: this.maskChar,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        required: this.isRequired,
        onChange: text => {
          // @ts-ignore
          this.value = text;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const { parameters, mode } = context,
      { isControlDisabled, isVisible } = mode;

    if (this.updatedByReact) {
      if (this.equivalent(parameters)) this.updatedByReact = false;

      return;
    }

    if (
      this.equivalent(parameters) &&
      this.isControlDisabled === isControlDisabled &&
      this.isVisible === isVisible
    )
      return;

    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
    this.syncData(parameters);

    ReactDOM.render(
      React.createElement(MtB, {
        value: this.value,
        mask: this.mask,
        maskChar: this.maskChar,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        required: this.isRequired,
        onChange: text => {
          // @ts-ignore
          this.value = text;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    // @ts-ignore
    return { value: this.value };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
