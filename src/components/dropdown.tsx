"use client";

import { useToggleState } from "@/hooks";
import { PiCaretDownBold } from "react-icons/pi";
import { DropdownProps } from "@/types";
import { useState, useRef, useEffect } from "react";

export const Dropdown = ({ parentClassName, className, data, handleFiltered, defaultValue, displayValue }: DropdownProps & { displayValue?: string }) => {
  const [ref, popover, togglePopover] = useToggleState(false);
  const [display, setDisplay] = useState<string>(defaultValue);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (popover && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [popover]);

  // Update display when displayValue prop changes
  useEffect(() => {
    if (displayValue !== undefined) {
      setDisplay(displayValue);
    }
  }, [displayValue]);

  const handleClickChoose = (value: string, label: string) => {
    handleFiltered(value, label);
    setDisplay(label);
    togglePopover();
    setSearchTerm("");
  };

  const filteredData = data?.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div ref={ref} className={`dropdown max-h-[48px] ${parentClassName ?? ""} ${popover ? "border-primary" : "border-gray/50"}`}>
      {display.length > 30 ? `${display.slice(0, 30)}...` : display}
      <button onClick={togglePopover} className="absolute right-0 h-full px-4 bg-primary rounded-e">
        <PiCaretDownBold size={20} className={`duration-300 fill-light ${popover && "rotate-180"}`} />
      </button>
      {popover && (
        <div className={`popover ${className ?? ""} max-h-[300px] overflow-y-scroll`}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Cari..."
            className="w-full px-4 py-2 border-b border-gray/20 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredData?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClickChoose(item.value, item.label)}
              className="w-full px-4 py-2 text-start hover:bg-gray/20"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
