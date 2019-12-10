import React from "react";
import { SwitchButton } from "./SwitchButton";
import { ProfunctorProps } from "../types/profunctor-props";
import { AiFillBug, AiOutlineBug } from "react-icons/ai";
import { AppState } from "../types/app-state";
import { lensProp } from "../utils/data";
import { AnimatePresence, motion } from "framer-motion";
export default function DebugInfo({
  prof: appStateProf,
}: ProfunctorProps<AppState>) {
  const visibleProf = appStateProf
    .promap(lensProp("debug"))
    .promap(lensProp("visible"));
  return (
    <div className="debug-info">
      <SwitchButton
        label={visibleProf.state ? <AiFillBug /> : <AiOutlineBug />}
        prof={visibleProf}
      ></SwitchButton>
      <AnimatePresence>
        {visibleProf.state && (
          <motion.pre
            exit={{ transform: "translateX(125%)" }}
            initial={{ transform: "translateX(125%)" }}
            animate={{ transform: "translateX(0%)" }}
          >
            {JSON.stringify(appStateProf.state, null, 2)}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
}
