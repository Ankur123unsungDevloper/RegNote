/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <label
      onClick={(e) => e.stopPropagation()}
      className="relative inline-block w-[40px] h-[20px] cursor-pointer"
    >
      
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      {/* Track */}
      <span
        className={`
          absolute inset-0 rounded-full transition-colors duration-300
          ${checked ? "bg-blue-500" : "bg-gray-300 dark:bg-neutral-600"}
        `}
      />

      {/* Knob */}
      <span
        className={`
          absolute left-[3px] top-[2px]
          h-[15px] w-[15px] rounded-full bg-white shadow-md
          transition-transform duration-300
          ${checked ? "translate-x-[16px]" : ""}
        `}
      />
    </label>
  );
};
