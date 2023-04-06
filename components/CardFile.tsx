import React from "react";
import {
  FaFile,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
} from "react-icons/fa";
import Loading from "./Loading";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "react-file-utils";

interface CardFileProps {
  files: any;
}

const CardFile = ({ files }: CardFileProps) => {
  if (!files) {
    return <Loading />;
  } else {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-black text-center">My Files</h2>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {files.map((file: any) => {
            return (
              <li
                key={file.name}
                className="col-span-1 flex rounded-md shadow-sm"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 bg-white text-black text-sm font-medium rounded-l-md">
                  {file.metadata.mimetype.includes("image") ? (
                    <FileIcon mimeType="image/png" filename="image.png" big />
                  ) : file.metadata.mimetype.includes("video") ? (
                    <FileIcon mimeType="video/mp4" filename="video.mp4" big />
                  ) : file.metadata.mimetype.includes("pdf") ? (
                    <FileIcon
                      mimeType="application/pdf"
                      filename="pdf.pdf"
                      big
                    />
                  ) : file.metadata.mimetype.includes("word") ? (
                    <FileIcon
                      mimeType="application/msword"
                      filename="word.doc"
                      big
                    />
                  ) : file.metadata.mimetype.includes("sheet") ? (
                    <FileIcon
                      mimeType="application/vnd.ms-excel"
                      filename="excel.xls"
                      big
                    />
                  ) : file.metadata.mimetype.includes("powerpoint") ? (
                    <FileIcon
                      mimeType="application/vnd.ms-powerpoint"
                      filename="powerpoint.ppt"
                      big
                    />
                  ) : (
                    <FileIcon mimeType="text/plain" filename="text.txt" big />
                  )}
                </div>
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <p className="text-black font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-gray-500">
                      {file.created_at.split("T")[0]}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Open options</span>
                      <EllipsisVerticalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default CardFile;
