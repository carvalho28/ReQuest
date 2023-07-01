import { RiCheckboxLine } from "react-icons/ri";

interface SuccessMessageProps {
  message: string;
}

/**
 * SuccessMessage component is the component used to display success messages
 * @param message - The message to display
 * @returns Returns the SuccessMessage component
 */
const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <RiCheckboxLine
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <div className=" text-sm text-blue-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
