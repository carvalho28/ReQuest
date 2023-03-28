import { renderPriorityBadge } from "@/utils/generalFunctions";
import DatePicker from "./DatePicker";
import Tiptap from "./TipTap";

interface RequirementDataProps {
  name: string;
  reqName: string;
  reqPriority: number;
  reqDueDate: string;
}

const RequirementData = ({
  name,
  reqName,
  reqPriority,
  reqDueDate,
}: RequirementDataProps) => {
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          <div>
            {/* title */}
            <h3 className="font-bold text-lg">{reqName}</h3>
            {/* priority badge */}
            {renderPriorityBadge(reqPriority)}

            {/* due date */}
            <DatePicker value={reqDueDate} />
          </div>
          <Tiptap userName={name} />
          {/* </div> */}
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
