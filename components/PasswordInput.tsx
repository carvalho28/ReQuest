import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface PasswordInputProps {
  setPassword: (password: string) => void;
  placeholder: string;
}

const PasswordInput = ({ setPassword, placeholder }: PasswordInputProps) => {
  //   const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-2 relative rounded-md shadow-sm">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
        placeholder={placeholder}
        className="pl-4 block w-full pr-10 rounded-md border-gray-300 focus:border-contrast focus:ring-contrast sm:text-sm"
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
