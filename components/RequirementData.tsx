import {
  renderPriorityBadge,
  renderStatusBadge,
} from "@/components/utils/general";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import {
  RiBarChartHorizontalLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiPencilLine,
  RiTimerFlashLine,
  RiUserReceived2Line,
  RiUserVoiceLine,
} from "react-icons/ri";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import MultiselectPeople from "./MultiselectPeople";
import Tiptap from "./TipTap";

interface RequirementDataProps {
  name: string;
  requirement: Database["public"]["Tables"]["requirements"]["Row"];
  projectUserNames: string[];
}

const RequirementData = ({
  name,
  requirement,
  projectUserNames,
}: RequirementDataProps) => {
  function daysBetween(date1: Date, date2: Date) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  const [requirementData, setRequirementData] = useState<
    Database["public"]["Tables"]["requirements"]["Row"]
  >({} as Database["public"]["Tables"]["requirements"]["Row"]);

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
      id_proj: requirement.id_proj,
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

  function changeDueDate(date: string) {
    setRequirementData((prevState) => ({
      ...prevState,
      due_date: date,
    }));
  }

  const [isEditing, setIsEditing] = useState(false);

  function editRequirement() {
    setIsEditing(true);

    // set requirement name to be editable
    const requirementName = document.getElementById("requirement-name");
    if (requirementName) {
      requirementName.setAttribute("contentEditable", "true");

      // set focus on the requirement name in the last position
      requirementName.focus();
      const length = requirementName.innerText.length;

      // set the cursor at the end of the text
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(requirementName.childNodes[0], length);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  function saveTitle() {
    const requirementName = document.getElementById("requirement-name");
    if (requirementName) {
      requirementName.setAttribute("contentEditable", "false");

      // save the new title
      setRequirementData((prevState) => ({
        ...prevState,
        name: requirementName.innerText,
      }));
    }

    setIsEditing(false);
  }

  function cancelTitle() {
    const requirementName = document.getElementById("requirement-name");
    if (requirementName) {
      requirementName.setAttribute("contentEditable", "false");
    }

    setIsEditing(false);
  }

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          {requirementData.id != undefined && (
            <div className="p-4">
              {/* title */}
              <div className="flex flex-row space-x-8">
                <h3
                  className="font-bold text-2xl
                focus:border-contrast focus:border-2 focus:outline-none px-1"
                  id="requirement-name"
                >
                  {requirement.name}
                </h3>
                {/* show pencil icon and make it editable, then show a check icon to save or a cross icon to cancel */}
                <div className="flex flex-row items-center">
                  {!isEditing ? (
                    <RiPencilLine
                      size={20}
                      className="cursor-pointer hover:scale-110 hover:bg-neutral-200 rounded-full"
                      onClick={() => editRequirement()}
                    />
                  ) : (
                    <div className="flex flex-row space-x-5">
                      <RiCheckLine
                        size={20}
                        className="cursor-pointer hover:scale-110 hover:bg-neutral-200 rounded-full bg-green-100"
                        onClick={() => saveTitle()}
                      />

                      <RiCloseLine
                        size={20}
                        color="red"
                        className="cursor-pointer hover:scale-110 hover:bg-neutral-200 rounded-full bg-red-100"
                        onClick={() => cancelTitle()}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center p-4 ">
                <div className="flex flex-col md:w-1/3 w-full space-y-5">
                  {/* status */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                      <RiBarChartHorizontalLine size={20} />
                      <span className="text-md text-black">Status</span>{" "}
                    </div>
                    <Dropdown
                      func={renderStatusBadge}
                      selected={requirementData.checked as number}
                      onSelect={(status) => changeStatus(status)}
                    />
                  </div>

                  {/* priority badge */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4 justify-center items-center">
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

                <div className="flex flex-col md:w-1/3 w-full space-y-5">
                  {/* due date */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                      <RiCalendarLine size={20} />
                      <span className="text-md text-black">Due date</span>{" "}
                    </div>
                    <DatePicker
                      value={requirementData.due_date as string}
                      onDateChange={(date) => changeDueDate(date)}
                    />
                  </div>

                  {/* assigned to */}
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                      <RiUserReceived2Line size={20} />
                      {/* Assigned to {requirementData.assigned_to} */}
                      <span className="text-md text-black">Assigned</span>{" "}
                    </div>
                    <MultiselectPeople
                      projectUserNames={projectUserNames}
                      selectedUserNames={
                        requirementData.assigned_to as string[]
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col md:w-1/3 w-full space-y-3 pl-8">
                  <div className="flex flex-row justify-center">
                    <span className="text-md text-black">Last updated</span>{" "}
                  </div>
                  <div className="flex flex-row space-x-3 ml-16">
                    <RiUserVoiceLine size={20} />
                    <span className="text-sm text-black">
                      {requirementData.updated_by?.length! > 15
                        ? requirementData.updated_by?.slice(0, 15) + "..."
                        : requirementData.updated_by}
                    </span>
                  </div>
                  <div className="flex flex-row space-x-3 ml-16">
                    <RiTimerFlashLine size={20} />
                    <span className="text-sm text-black">
                      {new Date(requirementData.updated_at).toLocaleDateString(
                        "pt-PT",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Tiptap
            userName={name}
            reqId={requirement.id}
            reqDescription={requirement.description as string}
          />
          <div className="text-md text-neutral-400 flex justify-end mr-4 italic">
            Created by {requirementData.created_by} -{" "}
            {new Date(requirementData.created_at).toLocaleDateString("pt-PT", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
          <div className="modal-action p-4">
            <label
              htmlFor="my-modal-5"
              className="btn bg-contrast text-white border-0 hover:bg-contrasthover hover:cursor-pointer"
            >
              Done
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequirementData;
