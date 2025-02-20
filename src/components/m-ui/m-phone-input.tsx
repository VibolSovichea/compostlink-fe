import React from "react";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface MPhoneNumberProps {
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const phoneNumberValidation = z.string().regex(/^(?:855|0)?(\d{8,9})$/, {
  message: "Phone number is required",
});

const MInputPhoneNumber = ({
  placeholder = "xxx-xxx-xxxx",
  onChange,
  ...props
}: MPhoneNumberProps) => {
  return (
    <>
      {props.label && <p className="text-sm text-label mb-1 text-black">{props.label}</p>}
      <div className="flex items-center border-0 border-b-2 ">
        <PhoneInput
          value={props.value}
          country="kh"
          buttonClass="!rounded-lg !shadow-sm !border-0 !bg-gray-50 !w-[40px] !h-[46px]"
          containerClass="!border-none w-full"
          inputClass="!w-full !h-[46px] !border-none !text-base !pl-[56px] !bg-transparent focus:!ring-0 !text-black"
          dropdownClass="!rounded-lg !border !border-gray-200 !shadow-lg"
          inputStyle={{
            backgroundColor: "transparent",
          }}
          onlyCountries={["kh"]}
          onChange={onChange}
          inputProps={{
            required: true,
            placeholder: placeholder,
          }}
          disableCountryGuess={true}
          masks={{
            kh: "(...) ... ... ...",
          }}
          enableClickOutside={true}
          showDropdown={false}
        />
      </div>
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.error}</p>
      )}
    </>
  );
};

export default MInputPhoneNumber;
