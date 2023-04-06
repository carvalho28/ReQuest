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

interface CardFileProps {
  files: any;
}

const CardFile = ({ files }: CardFileProps) => {
  if (!files) return <></>;
  else {
    // multiple cards with file name and image
    return (
      <div>
        {files.map((file: any) => {
          if (!file) {
            return (
              // return a card with file name and image
              <div key={file.name} className="flex shadow-lg w-36">
                {file.name}
                <FaFile />
              </div>
            );
          } else {
            return (
              // return a card with file name and image
              <div
                key={file.name}
                className="flex flex-col shadow-lg w-36 items-center justify-center"
              >
                {file.metadata.mimetype.includes("image") ? (
                  <FaFileImage />
                ) : file.metadata.mimetype.includes("video") ? (
                  <FaFileVideo />
                ) : file.metadata.mimetype.includes("pdf") ? (
                  <FaFilePdf />
                ) : file.metadata.mimetype.includes("word") ? (
                  <FaFileWord />
                ) : file.metadata.mimetype.includes("excel") ? (
                  <FaFileExcel />
                ) : file.metadata.mimetype.includes("powerpoint") ? (
                  <FaFilePowerpoint />
                ) : (
                  <FaFile />
                )}
                {file.name.split(".")[0]} <br />
                {file.created_at.split("T")[0]}
              </div>
            );
          }
        })}
      </div>
    );
  }
};

export default CardFile;
