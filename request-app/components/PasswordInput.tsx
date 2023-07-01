import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface PasswordInputProps {
  setPassword: (password: string) => void;
  placeholder: string;
  id: string;
}

/**
 * PasswordInput component is the component used to input passwords
 * @param setPassword - The function to set the value of the password
 * @param placeholder - The placeholder of the password input
 * @param id - The id of the password input
 * @returns Returns the PasswordInput component
 */
const PasswordInput = ({
  setPassword,
  placeholder,
  id,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-2 relative rounded-md shadow-sm">
      <input
        id={id}
        name={id}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
        placeholder={placeholder}
        className="pl-4 block w-full rounded-md border-0
                   py-1.5 shadow-sm ring-1 ring-inset 
                   ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset 
                   focus:ring-contrast sm:text-sm sm:leading-6"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {showPassword ? (
          <RiEyeOffFill
            className="h-5 w-5 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <RiEyeFill
            className="h-5 w-5 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
