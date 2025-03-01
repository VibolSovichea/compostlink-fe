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

const getDefaultOuterClasses = () => "flex justify-center bg-slate-300 min-h-screen";
const getDefaultInnerClasses = () => "w-full max-w-[430px] bg-secondary shadow-lg relative h-screen flex flex-col";

const Base: React.FC<BaseProps> = ({
  children,
  outsideClassName,
  insideClassName,
  Default: isDefault = true,
  hideNavigation = false,
}) => {
  const containerClasses = clsx(
    { [getDefaultOuterClasses()]: isDefault },
    outsideClassName
  );

  const contentWrapperClasses = clsx(
    { [getDefaultInnerClasses()]: isDefault },
    insideClassName
  );

  return (
    <div className={containerClasses}>
      <div className={contentWrapperClasses}>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col w-full p-half gap-base pb-16">
            {children}
          </div>
        </div>
        {!hideNavigation && <MBottomNavigation />}
      </div>
    </div>
  );
};

export default Base;