import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

interface MultiselectPeopleProps {
  projectUserNames: string[];
  selectedUserNames: string[];
  onChange: (value: any) => void;
}

const MultiselectPeople = ({
  projectUserNames,
  selectedUserNames,
  onChange,
}: MultiselectPeopleProps) => {
  const [selected, setSelected] = useState<
    | {
        value: string;
        label: string;
      }[]
    | null
  >([]);
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >();

  useEffect(() => {
    if (projectUserNames && projectUserNames.length > 0) {
      const options = projectUserNames.map((name) => ({
        value: name,
        label: name.length > 15 ? name.slice(0, 13) + "..." : name,
      }));
      setOptions(options);
      setSelected(
        selectedUserNames && selectedUserNames.length > 0
          ? options.filter((option) => selectedUserNames.includes(option.value))
          : null
      );
    } else {
      setOptions([]);
      setSelected(null);
    }
  }, [projectUserNames, selectedUserNames]);

  const handleChange = (value: any) => {
    setSelected(value);
    // change data onChange, if null send empty array
    onChange(value?.map((item: any) => item.value) || null);
  };

  return (
    <>
      <Select
        placeholder={"Assign users"}
        value={selected}
        onChange={handleChange}
        options={options || []}
        isMultiple={true}
        primaryColor="violet"
        noOptionsMessage="No users available"
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
    </>
  );
};

export default MultiselectPeople;
