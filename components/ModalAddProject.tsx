import React from "react";

interface Props {
  name: string;
  setName: (name: string) => void;
  saveName: () => void;
  toggleModal: () => void;
}

const ModalAddProject = ({ name, setName, saveName, toggleModal }: Props) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-center items-center">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 ml-2">
                <h3
                  className="text-lg leading-6 font-medium text-black"
                  id="modal-headline"
                >
                  Change your name
                </h3>
                <div className="mt-6 w-72">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm focus:ring-contrast focus:border-contrast block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-contrast text-base font-medium text-white hover:bg-contrasthover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-contrast sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => saveName()}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-contrast sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProject;
