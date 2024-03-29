import React from "react";

interface DatePickerProps {
  value: string;
  onDateChange: (date: string) => void;
}

/**
 * DatePicker component is a custom date picker component
 * @param value - The value of the date picker
 * @param onDateChange - The function to call when the date is changed
 * @returns Returns the DatePicker component
 */
const DatePicker = ({ value, onDateChange }: DatePickerProps) => {
  const data = value?.substring(0, 10) || "";
  return (
    <>
      <input
        type="date"
        name="due_date"
        id="due_date"
        // className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md h-8"
        className="block w-32 rounded-md border-0 py-1 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-contrast md:text-sm text-sm
                    sm:leading-6 px-2"
        value={data || ""}
        onChange={(e) => {
          onDateChange(e.target.value);
        }}
      />
    </>
  );
};

export default DatePicker;
