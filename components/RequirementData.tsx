import { renderPriorityBadge } from "@/components/utils/general";
import DatePicker from "./DatePicker";
import Tiptap from "./TipTap";

interface RequirementDataProps {
  name: string;
  reqId: number;
  reqName: string;
  reqPriority: number;
  reqDueDate: string;
  reqUpdatedAt: string;
}

const RequirementData = ({
  name,
  reqId,
  reqName,
  reqPriority,
  reqDueDate,
  reqUpdatedAt,
}: RequirementDataProps) => {
  function daysBetween(date1: Date, date2: Date) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          <div>
            {/* title */}
            <h3 className="font-bold text-lg">{reqName}</h3>
            <div>
              {/* priority badge */}
              {renderPriorityBadge(reqPriority)}
            </div>

            {/* due date */}
            <DatePicker value={reqDueDate} />

            {/* updated at */}
            <div className="text-xs text-neutral-400">
              {daysBetween(new Date(), new Date(reqUpdatedAt))} days ago
            </div>

            {/* updated by */}
          </div>
          {reqId && <Tiptap userName={name} reqId={reqId} />}
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
