import clsx from "clsx";
import React from "react";
interface BaseProps {
  children: React.ReactNode;
  Default?: boolean;
  outsideClassName?: React.ComponentProps<"div">["className"];
  insideClassName?: React.ComponentProps<"div">["className"];
}

const Base: React.FC<BaseProps> = ({
  children,
  outsideClassName,
  insideClassName,
  Default: isDefault = true,
}) => {
  return (
    <div>
      <div
        className={clsx(
          { "flex justify-center bg-secondary": isDefault },
          outsideClassName
        )}
      >
        <div
          className={clsx(
            { "flex flex-col w-[430px] bg-secondary px-base py-half shadow-black shadow-lg min-h-screen": isDefault },
            insideClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};


export default Base;
