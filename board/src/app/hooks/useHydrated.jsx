"use client";
import React, { useEffect, useState } from "react";

const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    console.log("Effect ran");
    setHydrated(true);
  }, []);

  return hydrated;
};

export default useHydrated;
