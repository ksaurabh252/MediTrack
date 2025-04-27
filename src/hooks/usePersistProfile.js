import { useEffect } from "react";
import { useSelector } from "react-redux";

export const usePersistProfile = () => {
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    localStorage.setItem("meditrack_profile", JSON.stringify(profile));
  }, [profile]);

  return profile;
};
