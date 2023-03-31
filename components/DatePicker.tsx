import React from "react";

interface DatePickerProps {
  value: string;
  onDateChange: (date: string) => void;
}

const DatePicker = ({ value, onDateChange }: DatePickerProps) => {
  // if (!value) return null;

  // console.log("value", value);

  return (
    <>
      <input
        type="date"
        name="due_date"
        id="due_date"
        className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md h-8"
        value={value || ""}
        onChange={(e) => {
          onDateChange(e.target.value);
        }}
      />
    </>
  );
};

export default DatePicker;
