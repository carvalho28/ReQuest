import {
  DefaultRequirement,
  renderPriorityBadge,
  renderStatusBadge,
  Requirement,
} from "@/components/utils/general";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import {
  RiBarChartHorizontalLine,
  RiCalendarLine,
  RiErrorWarningLine,
  RiUser5Fill,
  RiUser5Line,
  RiUserReceived2Line,
} from "react-icons/ri";
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
    setRequirementData((prevState) => ({
      ...prevState,
      priority: priority,
    }));
  }

  function changeStatus(status: number) {
    setRequirementData((prevState) => ({
      ...prevState,
      checked: status,
    }));
  }

  function changeDueDate(date: Date) {
    setRequirementData((prevState) => ({
      ...prevState,
      due_date: date,
    }));
  }

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          {requirementData.id != undefined && (
            <div className="p-4">
              {/* title */}
              <h3 className="font-bold text-2xl">{requirement.name}</h3>

              <div className="flex flex-row justify-between items-center p-4">
                <div className="flex flex-col w-1/3 space-y-5">
                  {/* status */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4">
                      <RiBarChartHorizontalLine size={20} />
                      <span className="text-md text-black">Status</span>{" "}
                    </div>
                    <Dropdown
                      func={renderStatusBadge}
                      selected={requirementData.checked}
                      onSelect={(status) => changeStatus(status)}
                    />
                  </div>

                  {/* priority badge */}
                  <div className="flex flex-row mt-5 space-x-3">
                    <div className="flex flex-row space-x-4">
                      <RiErrorWarningLine size={20} />
                      <span className="text-md text-black">Priority</span>{" "}
                    </div>
                    <Dropdown
                      func={renderPriorityBadge}
                      selected={requirementData.priority}
                      onSelect={(option) => changePriority(option)}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-1/3 space-y-5">
                  {/* due date */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row mt-1.5 space-x-4">
                      <RiCalendarLine size={20} />
                      <span className="text-md text-black">Due date</span>{" "}
                    </div>
                    <DatePicker
                      value={requirementData.due_date.toString()}
                      onDateChange={(date) => changeDueDate(date)}
                    />
                  </div>

                  {/* assigned to */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4">
                      <RiUserReceived2Line size={20} />
                      <span className="text-md text-black">
                        Assigned to {requirementData.assigned_to}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center w-1/3">
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
