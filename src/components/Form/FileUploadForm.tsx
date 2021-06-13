import React, { useState, useEffect } from "react";
import parseCsv from "../../helpers/parseCsv";
import ResourceListItem from "../../types/ResourceListItem";
import Button from "../Button/Button";

export default function FileUploadPage(props: {
  onUpload: (items: ResourceListItem[], name: string) => void;
}) {
  const [data, setData] = useState<ResourceListItem[]>([]);
  const [fileName, setFilename] = useState<string | null>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files.length > 0) {
      var fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        if (
          fileLoadedEvent.target &&
          typeof fileLoadedEvent.target.result === "string"
        ) {
          const items = parseCsv(fileLoadedEvent.target.result);
          setData(items);
        } else {
          clearFile();
        }
      };
      setFilename(event.target?.files[0].name);
      fileReader.readAsText(event.target?.files[0], "UTF-8");
    } else {
      clearFile();
    }
  };

  const clearFile = () => {
    setData([]);
    setFilename(null);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmission = () => {
    props.onUpload(data, fileName ?? "Untitled");
  };

  return (
    <div>
      <div className="flex flex-col flex-grow my-3">
        <div className="block w-full py-5 px-3 relative bg-white dark:bg-gray-900 appearance-none rounded bg-gray-100 border-gray-400 cursor-pointer border-dashed border-2 hover:bg-gray-200 dark:bg-gray-700">
          <p className="absolute top-2 left-3 cursor-pointer w-full text-center text-gray-900  dark:text-white font-medium">
            {fileName ?? "Select a file"}
          </p>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            className="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {fileName && data.length > 0 && (
        <Button onClick={handleSubmission} color="green" text="Upload" />
      )}
    </div>
  );
}
