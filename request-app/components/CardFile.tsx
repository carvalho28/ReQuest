import React, { useState } from "react";
import Loading from "./Loading";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "react-file-utils";
import Image from "next/image";
import { RiDownload2Line, RiDownloadLine } from "react-icons/ri";

interface CardFileProps {
  files: any;
}

const CardFile = ({ files }: CardFileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState("");

  function handleClick(url: string) {
    setIsModalOpen(true);
    setImageSelected(url);
    console.log("clicked");
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function downloadOnClick(url: string) {
    // start download of file
    window.open(url, "_blank");
  }

  if (files.length <= 0) {
    return <></>;
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
                className="col-span-1 flex rounded-md shadow-sm border-2 border-gray-200"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 bg-white text-black text-sm font-medium rounded-l-md">
                  {file.metadata.mimetype.includes("image") ? (
                    // <FileIcon mimeType="image/png" filename="image.png" big />
                    // render image
                    <>
                      <Image
                        src={file.url}
                        alt="image"
                        width={500}
                        height={500}
                        className="object-cover h-16 w-auto hover:cursor-pointer"
                        onClick={() => handleClick(file.url)}
                      />
                      {isModalOpen && (
                        <div className="fixed z-10 inset-0 overflow-y-auto bg-white p-2 bg-opacity-50">
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="relative max-w-2xl mx-auto">
                              <button
                                className="absolute top-0 right-0 m-4 text-white bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center"
                                onClick={handleClose}
                              >
                                &times;
                              </button>
                              <Image
                                src={imageSelected}
                                alt="image"
                                width={500}
                                height={500}
                                className="object-contain max-h-screen mx-auto"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
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
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white">
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
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-contrast focus:ring-offset-2"
                    >
                      <span className="sr-only">Open options</span>
                      <RiDownloadLine
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={() => downloadOnClick(file.url)}
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
