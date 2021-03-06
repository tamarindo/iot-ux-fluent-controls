import * as React from 'react';
import {MethodNode} from '../../Common';
import {FormField, FormFieldAttributes} from './FormField';
import {Toggle, ToggleAttributes} from '../Toggle';

export interface ToggleFieldType {}

export interface ToggleFieldProps extends React.Props<ToggleFieldType> {
    /** HTML form element name */
    name: string;
    /**
     * Current value of HTML select element
     *
     * This must be an `Object` that is in `SelectInputProps.options`
     */
    value: boolean;

    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Set error field to display: none */
    hideError?: boolean;

    onLabel?: MethodNode;
    offLabel?: MethodNode;

    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Auto Focus */
    autoFocus?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for `onChange` events */
    onChange: (newValue: any) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of SelectInput */
    inputClassName?: string;
    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;
    /** Label to be announced before the error message to announce to the user that there's an error */
    errorAriaLabel?: string;

    attr?: FormFieldAttributes & ToggleAttributes;
}

/**
 * High level form toggle switch control
 *
 * @param props: Object fulfilling `ToggleFieldProps` interface
 */
export const ToggleField = React.memo((props: ToggleFieldProps) => {
    const toggleAttr: ToggleAttributes = {
        container: Object.assign({
            'aria-label': props.label,
            'aria-required': props.required
        }, props.attr?.container),
        switchContainer: props.attr?.switchContainer,
        switch: props.attr?.switch,
        text: props.attr?.text
    };
    const fieldAttr: FormFieldAttributes = {
        fieldLabel: props.attr?.fieldLabel,
        fieldError: props.attr?.fieldError,
        fieldContent: props.attr?.fieldContent,
        fieldContainer: props.attr?.fieldContainer,
    };

    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            hideError={props.hideError}
            loading={props.loading}
            required={props.required}
            tooltip={props.tooltip}
            className={props.className}
            attr={fieldAttr}
            labelFarSide={props.labelFarSide}
            errorAriaLabel={props.errorAriaLabel}
            disabled={props.disabled}
        >
            <Toggle
                on={props.value}
                name={props.name}
                disabled={props.disabled}
                onChange={props.onChange}
                onLabel={props.onLabel}
                offLabel={props.offLabel}
                className={props.inputClassName}
                autoFocus={props.autoFocus}
                attr={toggleAttr}
            />
        </FormField>
    );
});

export default ToggleField;
