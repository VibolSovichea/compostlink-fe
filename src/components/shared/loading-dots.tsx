"use client";

const LoadingThreeDotsPulse = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <div className="size-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: "0s" }} />
      <div className="size-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
      <div className="size-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
    </div>
  );
};

export default LoadingThreeDotsPulse;
