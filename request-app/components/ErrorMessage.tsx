import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

/**
 * ErrorMessage component is component used to display an error message
 * @param message - The message to display
 * @returns Returns the ErrorMessage component
 */
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <div className=" text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
