import {
  DefaultRequirement,
  renderPriorityBadge,
  renderStatusBadge,
  Requirement,
} from "@/components/utils/general";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import Tiptap from "./TipTap";

interface RequirementDataProps {
  name: string;
  requirement: Requirement;
}

const RequirementData = ({ name, requirement }: RequirementDataProps) => {
  function daysBetween(date1: Date, date2: Date) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  const [requirementData, setRequirementData] = useState<DefaultRequirement>(
    {} as DefaultRequirement
  );

  useEffect(() => {
    setRequirementData({
      id: requirement.id,
      name: requirement.name,
      description: requirement.description,
      due_date: requirement.due_date,
      priority: requirement.priority,
      updated_at: requirement.updated_at,
      updated_by: requirement.updated_by,
      created_at: requirement.created_at,
      created_by: requirement.created_by,
      assigned_to: requirement.assigned_to,
      checked: requirement.checked,
    });
  }, [requirement]);

  function changePriority(priority: number) {
    console.log("change priority");
    console.log(priority);

    setRequirementData((prevState) => ({
      ...prevState,
      priority: priority,
    }));
  }

  function changeStatus(status: number) {
    console.log("change status");
    console.log(status);

    setRequirementData((prevState) => ({
      ...prevState,
      checked: status,
    }));
  }

  console.log(requirementData);

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          {requirementData.id != undefined && (
            <div className="p-4">
              {/* title */}
              <h3 className="font-bold text-2xl">{requirement.name}</h3>
              <div className="flex flex-col justify-center items-center">
                {/* priority badge */}
                <div className="flex flex-row">
                  <span className="text-md text-black">Priority:</span>{" "}
                  <Dropdown
                    func={renderPriorityBadge}
                    selected={requirementData.priority}
                    onSelect={(option) => changePriority(option)}
                  />
                </div>

                {/* due date */}
                <div className="flex flex-row">
                  <span className="text-md text-black mt-2">Due date:</span>{" "}
                  <DatePicker value={requirementData.due_date.toString()} />
                </div>

                {/* updated at */}
                <div className="text-xs text-neutral-400">
                  {daysBetween(
                    new Date(),
                    new Date(requirementData.updated_at)
                  )}{" "}
                  days ago
                </div>

                {/* updated by */}
                <div className="text-xs text-neutral-400">
                  Updated by {requirementData.updated_by}
                </div>

                {/* created at */}
                <div className="text-xs text-neutral-400">
                  {daysBetween(
                    new Date(),
                    new Date(requirementData.created_at)
                  )}{" "}
                  days ago
                </div>

                {/* created by */}
                <div className="text-xs text-neutral-400">
                  Created by {requirementData.created_by}
                </div>

                {/* assigned to */}
                <div className="text-xs text-neutral-400">
                  Assigned to {requirementData.assigned_to}
                </div>

                {/* checked - checkbox */}
                <div className="ml-3 flex h-6 items-center">
                  Done
                  <Dropdown
                    func={renderStatusBadge}
                    selected={requirementData.checked}
                    onSelect={(status) => changeStatus(status)}
                  />
                </div>
              </div>
            </div>
          )}
          <Tiptap
            userName={name}
            reqId={requirement.id}
            reqDescription={requirement.description}
          />
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequirementData;
