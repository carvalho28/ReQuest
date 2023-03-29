import React from "react";

interface DatePickerProps {
  value: string;
  onDateChange: (date: Date) => void;
}

const DatePicker = ({ value, onDateChange }: DatePickerProps) => {
  if (!value) return null;
  const date = new Date(value).toISOString().split("T")[0];

  return (
    <>
      {date && (
        <input
          type="date"
          name="due_date"
          id="due_date"
          className="shadow-sm focus:ring-contrast focus:border-contrast block w-32 sm:text-sm border-gray-300 rounded-md h-8"
          value={date}
          onChange={(e) => onDateChange(new Date(e.target.value))}
        />
      )}
    </>
  );
};

export default DatePicker;
