import React from "react";

interface DatePickerProps {
  value: string;
  onDateChange: (date: string) => void;
}

const DatePicker = ({ value, onDateChange }: DatePickerProps) => {
  // if (!value) return null;

  const data = value.substring(0, 10);

  return (
    <>
      <input
        type="date"
        name="due_date"
        id="due_date"
        className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md h-8"
        value={data || ""}
        onChange={(e) => {
          onDateChange(e.target.value);
        }}
      />
    </>
  );
};

export default DatePicker;
