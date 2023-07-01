import { useState } from "react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface TabsProps {
  currentPage: string;
}

export type Tab = {
  name: string;
  onClick: () => void;
  current: boolean;
};

interface TabsProps {
  tabs: Tab[];
}

/**
 * Tabs component is the component used to display tabs
 * @param tabs - The tabs to display
 * @returns Returns the Tabs component
 */
const Tabs = ({ tabs }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState(
    tabs.find((tab) => tab.current)?.name ?? tabs[0].name
  );

  const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(event.target.value);
    const selectedTabItem = tabs.find((tab) => tab.name === event.target.value);
    if (selectedTabItem) {
      selectedTabItem.onClick(); // Call the onClick handler of the selected tab
    }
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedTab}
          onChange={handleTabChange}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={tab.onClick}
                className={classNames(
                  tab.current
                    ? "border-contrast text-contrasthover"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium hover:cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
