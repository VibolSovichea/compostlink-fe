import clsx from "clsx";
import React from "react";
import MBottomNavigation from "../m-ui/m-bottom-navigation";
interface BaseProps {
  children: React.ReactNode;
  Default?: boolean;
  hideNavigation?: boolean;
  outsideClassName?: React.ComponentProps<"div">["className"];
  insideClassName?: React.ComponentProps<"div">["className"];
}

const Base: React.FC<BaseProps> = ({
  children,
  outsideClassName,
  insideClassName,
  Default: isDefault = true,
  hideNavigation = false,
}) => {
  return (
    <div
      className={clsx(
        { "flex justify-center bg-secondary h-full max-h-screen": isDefault },
        outsideClassName
      )}
    >
      <div
        className={clsx(
          { "flex flex-col w-full max-w-[430px] bg-secondary px-base py-half shadow-black shadow-lg h-full min-h-screen max-h-screen relative ": isDefault },
          insideClassName
        )}
      >
        {children}
        {!hideNavigation && <MBottomNavigation />}
      </div>
    </div>
  );
};


export default Base;
