import React from "react";
import classNames from "../../../helpers/classNames";
import ShareSettings from "../../../types/ShareSettings";

const CheckBox: React.FC<{
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  name: string;
}> = ({ checked, onChange, name }) => {
  return (
    <label className="flex justify-start items-center w-full py-1">
      <span
        className={classNames(
          "bg-white border-2 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer",
          checked ? "border-green-600 bg-green-100" : "border-gray-400"
        )}
      >
        <input
          type="checkbox"
          className="opacity-0 absolute cursor-pointer"
          onClick={() => onChange(!checked)}
        />
        <svg
          aria-label={checked ? "Checkbox checked" : "Checkbox unchecked"}
          className={classNames(
            "fill-current w-3 h-3 text-green-600 cursor-pointer",
            checked ? "block" : "hidden"
          )}
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </span>
      <span className=" text-gray-500 font-medium">{name}</span>
    </label>
  );
};

const ChangePermissionsWidget: React.FC<{
  onChange: (shareSettings: ShareSettings) => void;
  shareSettings: ShareSettings;
}> = ({ onChange, shareSettings }) => {
  return (
    <div className="flex flex-col">
      <CheckBox
        checked={shareSettings === "HOMEPAGE"}
        onChange={(checked: boolean) => {
          if (checked) {
            onChange("HOMEPAGE");
          }
        }}
        name="Share with livlearn community and via link"
      />
      <CheckBox
        checked={shareSettings === "ONLYLINK"}
        onChange={(checked: boolean) => {
          if (checked) {
            onChange("ONLYLINK");
          }
        }}
        name="Only accessible to those with link"
      />
      <CheckBox
        checked={shareSettings === "PRIVATE"}
        onChange={(checked: boolean) => {
          if (checked) {
            onChange("PRIVATE");
          }
        }}
        name="Private"
      />
    </div>
  );
};

export default ChangePermissionsWidget;
