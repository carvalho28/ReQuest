import React, { KeyboardEventHandler } from "react";

import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

interface Props {
  value: readonly Option[];
  setValue: (value: readonly Option[]) => void;
  onChange?: (value: readonly Option[]) => void;
}

/**
 * MultiSelectKeywords component is the component used to input keywords
 * @param value - The value of the keywords
 * @param setValue - The function to set the value of the keywords
 * @param onChange - The function to change the value of the keywords
 * @returns Returns the MultiSelectKeywords component
 */
const MultiSelectKeywords = ({ value, setValue }: Props) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue([...value, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <CreatableSelect
        id="keywords"
        instanceId="keywords"
        className="keywords text-lg"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "hotpink",
            primary: "blue",
          },
        })}
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type your keyword, then press enter, you can add multiple keywords ..."
        value={value}
      />
    </div>
  );
};

export default MultiSelectKeywords;
