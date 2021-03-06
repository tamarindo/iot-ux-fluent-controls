import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MethodNode, dateIsValid, DateFormat } from '../../Common';
import { FormField, FormFieldAttributes } from '../Field/FormField';
/** This import solves an error with exports of FormFieldAttributes defaults */
import { TimeInput, TimeInputAttributes } from './TimeInput';
import { DatePicker, DatePickerAttributes } from './DatePicker';
import { DivProps, SpanProps, Elements as Attr } from '../../Attributes';
const css = classNames.bind(require('./DateTimeField.module.scss'));

let instanceCount = 0; // maintain count to ensure unique IDs (ARIA)

export interface DateTimeFieldType { }

export interface DateTimeFieldAttributes {
    datePicker?: DatePickerAttributes;
    timeInput?: TimeInputAttributes;
    flexContainer?: DivProps;
    dateColumn?: SpanProps;
    timeColumn?: SpanProps;
}

export interface DateTimeFieldProps extends React.Props<DateTimeFieldType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue: string | Date;

    /** Label to display above input element */
    label?: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Date format in text input */
    format?: DateFormat;
    /** Tab index for calendar control */
    tabIndex?: number;
    /** Label for "AM" select option */
    amLabel?: string;
    /** Label for "PM" select option */
    pmLabel?: string;

    /**
     * Display the date in local timezone instead of GMT
     *
     * Default: true
     */
    localTimezone?: boolean;
    /** i18n locale */
    locale?: string;
    /**
     * Show Calendar below date picker input
     */
    showAbove?: boolean;
    /** Display the seconds dropdown */
    showSeconds?: boolean;
    /** Use 24 hour clock */
    militaryTime?: boolean;
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Set error field to display: none */
    hideError?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of DatePicker and TimeInput */
    inputClassName?: string;

    /**
     * callback for clicking calendar icon
     */
    onExpand?: (expanded: boolean) => void;

    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: DateTimeFieldAttributes & FormFieldAttributes;
}

export interface DateTimeFieldState {
    initialDate: string | Date;
    lastDate: string;
    lastTime: string;
}

/**
 * High level date time field
 *
 * @param props Control properties (defined in `DateTimeFieldProps` interface)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export class DateTimeField extends React.Component<DateTimeFieldProps, Partial<DateTimeFieldState>> {
    static defaultProps = {
        format: DateFormat.MMDDYYYY,
        tabIndex: -1,
        localTimezone: true,
        showAbove: false,
        showSeconds: false,
        militaryTime: false,
        attr: {
            fieldContainer: {},
            fieldLabel: {},
            fieldContent: {},
            fieldError: {},
            flexContainer: {},
            dateColumn: {},
            timeColumn: {},
            datePicker: {
                container: {},
                inputContainer: {},
                input: {},
                inputIcon: {},
                calendar: {},
            },
            timeInput: {
                container: {},
                hourSelect: {},
                hourOption: {},
                minuteSelect: {},
                minuteOption: {},
                secondSelect: {},
                secondOption: {},
                periodSelect: {},
                periodOption: {},
            }
        }
    };

    constructor(props: DateTimeFieldProps) {
        super(props);

        this.state = DateTimeField.getInitialState(props);
    }

    static getInitialState(props: DateTimeFieldProps): DateTimeFieldState {
        const local = props.localTimezone;
        let invalid = false;
        let initialValue = null;
        if (props.initialValue || props.initialValue === '') {
            if (typeof props.initialValue === 'string') {
                const date = new Date(props.initialValue);
                if (dateIsValid(date, local)) {
                    /**
                     * This is where DateTimeField receives an initial Date value
                     * so this is where localTimezone/GMT have to be handled.
                     *
                     * Calling new Date(Date.UTC(year, month, date, ...)) creates
                     * a Date object that looks like the local timezone but actually
                     * represents a time in GMT
                     */
                    initialValue = local
                        ? date
                        : new Date(Date.UTC(
                            date.getUTCFullYear(),
                            date.getUTCMonth(),
                            date.getUTCDate(),
                            date.getUTCHours(),
                            date.getUTCMinutes(),
                            date.getUTCSeconds()
                        ));
                } else {
                    invalid = true;
                }
            } else {
                if (!dateIsValid(props.initialValue, local)) {
                    invalid = true;
                } else {
                    /**
                     * This is where DateTimeField receives an initial Date value
                     * so this is where localTimezone/GMT have to be handled.
                     *
                     * Calling new Date(Date.UTC(year, month, date, ...)) creates
                     * a Date object that looks like the local timezone but actually
                     * represents a time in GMT
                     */
                    initialValue = local
                        ? new Date(props.initialValue)
                        : new Date(Date.UTC(
                            props.initialValue.getUTCFullYear(),
                            props.initialValue.getUTCMonth(),
                            props.initialValue.getUTCDate(),
                            props.initialValue.getUTCHours(),
                            props.initialValue.getUTCMinutes(),
                            props.initialValue.getUTCSeconds()
                        ));
                }
            }
        }

        let defaultTime = null;
        if (invalid) {
            const date = new Date();
            defaultTime = props.localTimezone ? date
                : new Date(Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    date.getUTCHours(),
                    date.getUTCMinutes(),
                    date.getUTCSeconds()
                ));
        }

        return {
            initialDate: invalid ? props.initialValue : initialValue.toJSON(),
            lastTime: invalid ? defaultTime.toJSON() : initialValue.toJSON(),
            lastDate: invalid ? 'invalid' : initialValue.toJSON()
        };
    }

    static getDerivedStateFromProps(props: DateTimeFieldProps, _state: DateTimeFieldState): Partial<DateTimeFieldState> | null {
        return DateTimeField.getInitialState(props);
    }

    onDatePaste = (newDate: string): boolean => {
        const date = new Date(newDate);
        if (dateIsValid(date, this.props.localTimezone)) {
            const utcDate = date.toJSON();
            this.setState({
                initialDate: date,
                lastDate: utcDate,
                lastTime: utcDate
            });
            this.props.onChange(utcDate);
            return false;
        }
        this.setState({
            lastDate: 'invalid'
        });
        this.props.onChange('invalid');
        return true;
    }

    onChange = (newDate: string | Date, newTime: string | Date): Date => {
        if (newDate === '') {
            this.props.onChange(newDate);
            return null;
        }
        if (newDate === 'invalid' || newTime === 'invalid' || !newDate || !newTime) {
            this.props.onChange('invalid');
            return null;
        }

        const date = typeof (newDate) === 'string' ? new Date(newDate) : newDate;
        const time = typeof (newTime) === 'string' ? new Date(newTime) : newTime;
        const newValue = this.props.localTimezone
            ? new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds()
            ) : new Date(Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                time.getUTCHours(),
                time.getUTCMinutes(),
                time.getUTCSeconds()
            ));
        const utcValue = newValue.toJSON();
        if (utcValue === 'Invalid Date') {
            this.props.onChange('invalid');
        } else {
            this.props.onChange(utcValue);
        }
        return newValue;
    }

    onDateChange = (newDate: string) => {
        const newValue = this.onChange(newDate, this.state.lastTime);
        if (newValue) {
            const utcValue = newValue.toJSON();
            this.setState({
                lastTime: utcValue,
                lastDate: utcValue
            });
        } else {
            this.setState({
                lastDate: newDate
            });
        }
    }

    onTimeChange = (newTime: string) => {
        const newValue = this.onChange(this.state.lastDate, newTime);
        if (newValue) {
            const utcValue = newValue.toJSON();
            this.setState({
                initialDate: newValue,
                lastTime: utcValue,
                lastDate: utcValue
            });
        }
    }

    render() {
        const errorId = `${this.props.name}-error-${instanceCount++}`;
        let describedby = errorId;
        const dateAttr: DatePickerAttributes = {
            input: Object.assign({
                'aria-describedby': describedby
            }, this.props.attr?.datePicker?.input),
            inputContainer: this.props.attr?.datePicker?.inputContainer,
            inputIcon: this.props.attr?.datePicker?.inputIcon,
        };
        const timeAttr: TimeInputAttributes = {
            hourSelect: {
                'aria-describedby': describedby,
                ...(this.props.attr?.timeInput?.hourSelect)
            },
            minuteSelect: {
                'aria-describedby': describedby,
                ...(this.props.attr?.timeInput?.minuteSelect)
            },
            secondSelect: {
                'aria-describedby': describedby,
                ...(this.props.attr?.timeInput?.secondSelect)
            },
            periodSelect: {
                'aria-describedby': describedby,
                ...(this.props.attr?.timeInput?.periodSelect)
            },
            ...(this.props.attr?.timeInput)
        };
        const fieldAttr: FormFieldAttributes = {
            fieldLabel: this.props.attr?.fieldLabel,
            fieldError: Object.assign({
                id: errorId
            }, this.props.attr?.fieldError),
            fieldContent: this.props.attr?.fieldContent,
            fieldContainer: this.props.attr?.fieldContainer
        };

        return (
            <FormField
                name={this.props.name}
                label={this.props.label}
                error={this.props.error}
                loading={this.props.loading}
                required={this.props.required}
                hideError={this.props.hideError}
                className={css('datetime-field', this.props.className)}
                attr={fieldAttr}
                tooltip={this.props.tooltip}
                labelFarSide={this.props.labelFarSide}
                disabled={this.props.disabled}
            >
                <Attr.div
                    className={css('field-content')}
                    attr={this.props.attr?.flexContainer}
                >
                    <Attr.span
                        className={css('field-date')}
                        attr={this.props.attr?.dateColumn}
                    >
                        <DatePicker
                            name={this.props.name}
                            initialValue={this.state.initialDate}
                            tabIndex={this.props.tabIndex}
                            error={!!this.props.error}
                            disabled={this.props.disabled}
                            locale={this.props.locale}
                            localTimezone={this.props.localTimezone}
                            showAbove={this.props.showAbove}
                            format={this.props.format}
                            required={this.props.required}
                            onPaste={this.onDatePaste}
                            onChange={this.onDateChange}
                            onExpand={this.props.onExpand}
                            className={css('date-picker', this.props.inputClassName)}
                            attr={dateAttr}
                        />
                    </Attr.span>
                    <Attr.span
                        className={css('field-time')}
                        attr={this.props.attr?.timeColumn}
                    >
                        <TimeInput
                            name={this.props.name}
                            value={this.state.lastTime}
                            amLabel={this.props.amLabel}
                            pmLabel={this.props.pmLabel}
                            localTimezone={this.props.localTimezone}
                            showSeconds={this.props.showSeconds}
                            militaryTime={this.props.militaryTime}
                            error={!!this.props.error}
                            disabled={this.props.disabled}
                            onChange={this.onTimeChange}
                            className={css('time-picker', this.props.inputClassName)}
                            attr={timeAttr}
                        />
                    </Attr.span>
                </Attr.div>
            </FormField>
        );
    }
}

export default DateTimeField;
