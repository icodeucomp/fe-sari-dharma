"use client";

import { useToggleState } from "@/hooks";

import { PiCaretDownBold } from "react-icons/pi";

import { DropdownProps } from "@/types";
import { useState } from "react";

export const Dropdown = ({ parentClassName, className, data, handleFiltered, defaultValue }: DropdownProps) => {
  const [ref, popover, togglePopover] = useToggleState(false);

  const [display, setDisplay] = useState<string>(defaultValue);

  const handleClickChoose = (value: string, label: string) => {
    handleFiltered(value);
    setDisplay(label);
    togglePopover();
  };

  return (
    <div ref={ref} className={`dropdown ${parentClassName ?? ""} ${popover ? "border-primary" : "border-gray/50"}`}>
      {display}
      <button onClick={togglePopover} className="absolute right-0 h-full px-4 bg-primary rounded-e">
        <PiCaretDownBold size={20} className={`duration-300 fill-light ${popover && "rotate-180"}`} />
      </button>
      {popover && (
        <div className={`popover ${className ?? ""}`}>
          {data?.map((item, index) => (
            <button key={index} onClick={() => handleClickChoose(item.value, item.label)} className="w-full px-4 py-2 text-start hover:bg-gray/20">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
