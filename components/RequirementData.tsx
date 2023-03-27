// import Tiptap from "./TipTap";
// import { Editor } from "./LexicalReq";

import Tiptap from "./TipTap";

interface RequirementDataProps {
  name: string;
}

const RequirementData = ({ name }: RequirementDataProps) => {
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-neutral-50">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          {/* <div> */}
          <Tiptap name={name} />
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
