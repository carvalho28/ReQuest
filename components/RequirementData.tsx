import {
  UserIdAndName,
  renderPriorityBadge,
  renderStatusBadge,
  renderTypeBadge,
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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";

interface RequirementDataProps {
  userId: string;
  name: string;
  requirement: Database["public"]["Tables"]["requirements"]["Row"];
  projectUserIdsAndNames: UserIdAndName[];
}

const RequirementData = ({
  userId,
  name,
  requirement,
  projectUserIdsAndNames,
}: RequirementDataProps) => {
  const [requirementData, setRequirementData] = useState<
    Database["public"]["Tables"]["requirements"]["Row"]
  >({} as Database["public"]["Tables"]["requirements"]["Row"]);

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  function getUserNamesFromIds(ids: string[] | null) {
    if (!ids) return [];
    const names: string[] = [];
    ids.forEach((id) => {
      const { name } = projectUserIdsAndNames?.find(
        (user) => user.id === id
      ) as UserIdAndName;
      names.push(name);
    });
    return names;
  }

  useEffect(() => {}, [requirementData]);

  const [isUpdatingUpdatedBy, setIsUpdatingUpdatedBy] = useState(false);

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
      status: requirement.status,
      id_proj: requirement.id_proj,
      closed_at: requirement.closed_at,
      closed_by: requirement.closed_by,
      type: requirement.type,
    });
  }, [requirement]);

  const [createdBy, setCreatedBy] = useState("");
  useEffect(() => {
    async function getCreatedByName() {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("name")
        .eq("id", requirement.created_by)
        .single();

      if (error) console.log(error);
      if (data) setCreatedBy(data.name);
    }
    getCreatedByName();
  }, [requirement.created_by, supabaseClient]);

  useEffect(() => {
    async function saveChanges() {
      // check if requirement.status is changed to completed
      if (
        requirement.status?.toLowerCase() !== "completed" &&
        requirementData.status?.toLowerCase() === "completed"
      ) {
        // add a closed_at date
        requirementData.closed_at = new Date().toISOString();
        // copy assigned_to to closed_by
        requirementData.closed_by = requirementData.assigned_to;

        console.log(requirementData.closed_by);

        // add to user's profiles +1 requirement
        const { data: dataReq, error: errorReq } = await supabaseClient.rpc(
          "increment_requirements_completed",
          { user_ids: requirementData.closed_by }
        );
        if (errorReq) {
          console.log(errorReq);
        }
      }

      const { error } = await supabaseClient
        .from("requirements")
        .update(requirementData)
        .eq("id", requirement?.id);
      if (error) console.log(error);
    }
    if (!isUpdatingUpdatedBy) saveChanges();
    else setIsUpdatingUpdatedBy(false);
  }, [requirementData, supabaseClient]);

  const [lastEditedName, setLastEditedName] = useState("");

  // realtime updates for the requirement updated by and updated at
  useEffect(() => {
    let channel: RealtimeChannel;
    async function updatedByAt() {
      channel = supabaseClient
        .channel("project_load")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "requirements",
          },
          async (payload: any) => {
            if (payload.new.id === requirement?.id) {
              setIsUpdatingUpdatedBy(true);
              // get the name from the id of updated_by
              const { data: updatedByName, error } = await supabaseClient
                .from("profiles")
                .select("name")
                .eq("id", payload.new.updated_by);
              if (error) console.log(error);
              if (!updatedByName) return;
              setRequirementData((prevState) => ({
                ...prevState,
                updated_at: payload.new.updated_at,
                updated_by: payload.new.updated_by,
              }));
              setLastEditedName(updatedByName[0].name);
            }
          }
        )
        .subscribe();

      return () => {
        supabaseClient.removeChannel(channel);
      };
    }

    updatedByAt();
  }, [requirement?.id, supabaseClient]);

  function changePriority(priority: string) {
    setRequirementData((prevState) => ({
      ...prevState,
      priority: priority,
    }));
  }

  function changeStatus(status: string) {
    setRequirementData((prevState) => ({
      ...prevState,
      status: status,
    }));
  }

  function changeDueDate(date: string) {
    setRequirementData((prevState) => ({
      ...prevState,
      due_date: date,
    }));
  }

  function changeType(type: string) {
    setRequirementData((prevState) => ({
      ...prevState,
      type: type,
    }));
  }

  const [isEditing, setIsEditing] = useState(false);

  function editRequirement() {
    setIsEditing(true);

    // set requirement name to be editable
    const requirementName = document.getElementById("requirement-name");
    if (requirementName) {
      requirementName.setAttribute("contentEditable", "true");
      // set max length of requirement name to 100
      requirementName.setAttribute("maxlength", "100");

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

    setRequirementData((prevState) => ({
      ...prevState,
      name: uneditedReqName,
    }));

    if (requirementName) {
      requirementName.innerText = uneditedReqName;
    }
  }

  function changeAssignedTo(assignedTo: string[]) {
    setRequirementData((prevState) => ({
      ...prevState,
      assigned_to: assignedTo,
    }));
  }

  const [uneditedReqName, setUneditedReqName] = useState("");

  useEffect(() => {
    setUneditedReqName(requirement.name);
  }, [requirement.name]);

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          {requirementData.id != undefined && (
            <div className="p-4">
              {/* title */}
              <div className="flex flex-row">
                <div className="flex flex-row w-9/12 space-x-3 items-center">
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
                {/* render type of requirement */}
                <div className="flex flex-row items-center justify-center w-3/12">
                  <Dropdown
                    func={renderTypeBadge}
                    options={["Functional", "Non-Functional"]}
                    selected={requirementData.type as string}
                    onSelect={(type) => changeType(type)}
                  />
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
                      options={["Not Started", "In Progress", "Completed"]}
                      selected={requirementData.status as string}
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
                      options={["P1", "P2", "P3"]}
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
                      onChange={(assignedTo) => changeAssignedTo(assignedTo)}
                      projectUserIdsAndNames={projectUserIdsAndNames}
                      selectedUsers={requirementData.assigned_to as string[]}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:w-1/3 w-full space-y-3 pl-8">
                  <div className="flex flex-row justify-center">
                    <span className="text-md text-black">Last updated</span>{" "}
                  </div>
                  <div className="flex flex-row space-x-3 ml-16">
                    <RiUserVoiceLine size={20} />
                    <span className="text-sm text-black truncate">
                      {/* {requirementData.updated_by} */}
                      {lastEditedName}
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
                          hour: "numeric",
                          minute: "numeric",
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
            userId={userId}
            reqId={requirement.id}
            reqDescription={requirement.description as string}
            reqCreatedAt={requirement.created_at}
            reqCreatedBy={requirement.created_by}
            reqName={requirement.name}
            reqUpdatedBy={requirement.updated_by}
            reqUpdatedAt={requirement.updated_at}
            createdBy={createdBy}
          />
        </div>
      </div>
    </>
  );
};

export default RequirementData;
