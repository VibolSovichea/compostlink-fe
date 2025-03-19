import clsx from "clsx";
import React from "react";
import MBottomNavigation from "../m-ui/m-bottom-navigation";
import Header from "./header";

interface BaseProps {
  children: React.ReactNode;
  Default?: boolean;
  hideNavigation?: boolean;
  outsideClassName?: React.ComponentProps<"div">["className"];
  insideClassName?: React.ComponentProps<"div">["className"];
  header?: boolean;
  username?: string;
  headerTitle?: string;
  headerVariant?: "default" | "return-button" | undefined;
  headerContent?: {
    username?: string;
    pageTitle?: string;
  }
}

const getDefaultOuterClasses = () => "flex justify-center bg-slate-300 min-h-screen";
const getDefaultInnerClasses = () => "flex flex-col w-full px-base gap-base pb-16 bg-secondary";

const Base: React.FC<BaseProps> = ({
  children,
  outsideClassName,
  insideClassName,
  Default: isDefault = true,
  hideNavigation = false,
  headerVariant = undefined,
  headerTitle,
  headerContent
}) => {
  const containerClasses = clsx(
    { [getDefaultOuterClasses()]: isDefault },
    outsideClassName
  );

  const contentWrapperClasses = clsx(
    { [getDefaultInnerClasses()]: isDefault },
    insideClassName
  );

  const handleHeaderClick = () => {
    window.location.href = "/profile";
  }

  return (
    <div className={containerClasses}>
      <div className="w-full max-w-[430px] bg-secondary shadow-lg relative h-screen flex flex-col">
        {headerVariant && 
          <Header 
            variant={headerVariant} 
            username={headerContent?.username} 
            pageTitle={headerContent?.pageTitle} 
            onClick={handleHeaderClick}
          />
        }
        <div className="flex-1 overflow-y-auto">
          <div className={contentWrapperClasses}>
            {children}
          </div>
        </div>
        {!hideNavigation && <MBottomNavigation />}
      </div>
    </div>
  );
};

export default Base;