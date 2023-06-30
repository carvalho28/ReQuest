import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { UserIdAndName } from "./utils/general";

interface MultiselectPeopleProps {
  selectedUsers: string[];
  projectUserIdsAndNames: UserIdAndName[];
  onChange: (value: any) => void;
}

const MultiselectPeople = ({
  projectUserIdsAndNames,
  selectedUsers,
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
    if (projectUserIdsAndNames && projectUserIdsAndNames.length > 0) {
      const options = projectUserIdsAndNames.map((user) => ({
        value: user.id,
        label:
          user.name.length > 15 ? user.name.slice(0, 13) + "..." : user.name,
      }));
      setOptions(options);
      setSelected(
        selectedUsers && selectedUsers.length > 0
          ? options.filter((option) => selectedUsers.includes(option.value))
          : null
      );
    } else {
      setOptions([]);
      setSelected(null);
    }
  }, [projectUserIdsAndNames, selectedUsers]);

  const handleChange = (value: any) => {
    setSelected(value);
    // change data onChange, if null send empty array
    onChange(value?.map((item: any) => item.value) || null);
  };

  return (
    <div className="flex flex-col w-72">
      <Select
        placeholder={"\xa0\xa0\xa0Assign users"}
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
            `bg-violet-200 border rounded-sm flex space-x-1 ml-2 ${
              isSelected ? "border-gray-500 px-1" : "pl-1"
            }
              `,
        }}
      />
    </div>
  );
};

export default MultiselectPeople;
