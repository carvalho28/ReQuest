import React from "react";

interface DatePickerProps {
  value: string;
}

const DatePicker = ({ value }: DatePickerProps) => {
  if (!value) return null;
  const date = new Date(value).toISOString().split("T")[0];

  return (
    <>
      {date && (
        <input
          type="date"
          name="deadline"
          id="deadline"
          className="shadow-sm focus:ring-contrast focus:border-contrast block w-36 sm:text-sm border-gray-300 rounded-md"
          value={date}
          onChange={(e) => console.log(e.target.value)}
        />
      )}
    </>
  );
};

export default DatePicker;
