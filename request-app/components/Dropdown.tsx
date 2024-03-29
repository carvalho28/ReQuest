import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  func: (selected: string, sizex: number, sizey: number) => JSX.Element;
  selected: string;
  options: string[];
  onSelect: (option: string) => void;
}

/**
 * Dropdown component is a custom dropdown component
 * @param func - The function to call when the date is changed
 * @param selected - The selected option
 * @param options - The options to display
 * @param onSelect - The function to call when an option is selected
 * @returns Returns the Dropdown component
 */
export default function Dropdown({
  onSelect,
  selected,
  func,
  options,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 text-sm font-semibold text-black">
          {func(selected, 4, 1)}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-black mt-1"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onSelect(options[0])}
                >
                  {func(options[0], 4, 1)}
                </span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => onSelect(options[1])}
                >
                  {func(options[1], 4, 1)}
                </span>
              )}
            </Menu.Item>
            {options[2] && (
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => onSelect(options[2])}
                  >
                    {func(options[2], 4, 1)}
                  </span>
                )}
              </Menu.Item>
            )}
            {options[3] && (
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => onSelect(options[3])}
                  >
                    {func(options[3], 4, 1)}
                  </span>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
