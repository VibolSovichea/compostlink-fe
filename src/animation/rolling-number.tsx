import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { useEffect } from "react";

export const numberConversion = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

const RollingNumber = ({ value }: { value: number }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    return numberConversion(Math.round(latest));
  });

  useEffect(() => {
    if (isFirstRender) {
      motionValue.set(0);
      setIsFirstRender(false);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [value, isFirstRender, motionValue]);

  return <motion.div>{rounded}</motion.div>;
};

export default RollingNumber;
