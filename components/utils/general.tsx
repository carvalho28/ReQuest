// render different badge depending on priority

export type Requirement = {
  id: number;
  name: string;
  description: string;
  due_date: Date;
  priority: number;
  updated_at: Date;
  updated_by: string;
  created_at: Date;
  created_by: string;
  assigned_to: string;
  checked: boolean;
};

function renderPriorityBadge(priority: number) {
  if (priority === 1) {
    return (
      <div className="priority-badge">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          High
        </span>
      </div>
    );
  } else if (priority === 2) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Medium
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Low
      </span>
    );
  }
}

export { renderPriorityBadge };
