import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

const options = [
  { value: "fox", label: "John Doe" },
  { value: "Butterfly", label: "Marie Poppins" },
  { value: "Honeybee", label: "Sherlock Holmes" },
  { value: "asdfasdf", label: "Asdkfhnjkasdhfjkbnjkasdhfkjsabjkf" },
];

interface MultiselectPeopleProps {
  projectUserNames: string[];
  selectedUserNames: string[];
}

const MultiselectPeople = ({
  projectUserNames,
  selectedUserNames,
}: MultiselectPeopleProps) => {
  const [selected, setSelected] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  useEffect(() => {
    if (projectUserNames) {
      const options = projectUserNames.map((name) => ({
        // if name is too long, truncate it
        value: name,
        label: name.length > 15 ? name.slice(0, 13) + "..." : name,
      }));
      setOptions(options);
      setSelected(
        options.filter((option) => selectedUserNames.includes(option.value))
      );
    }
  }, [projectUserNames, selectedUserNames]);

  const handleChange = (value: any) => {
    setSelected(value);
  };

  return (
    <>
      {options && (
        <Select
          value={selected}
          onChange={handleChange}
          options={options}
          isMultiple={true}
          primaryColor="violet"
          classNames={{
            listItem: ({ isSelected }: any) =>
              `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? `text-white bg-contrast`
                  : `text-black hover:bg-violet-100 hover:text-contrasthover`
              }`,
            tagItem: ({ isSelected }: any) =>
              `bg-violet-200 border rounded-sm flex space-x-1 ${
                isSelected ? "border-gray-500 px-1" : "pl-1"
              }
              `,
          }}
        />
      )}
    </>
  );
};

export default MultiselectPeople;
