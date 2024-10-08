import { useState } from "react";

const useProfile = () => {
  const userProfileSession =  localStorage.getItem("user")
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  return { userProfile, loading };
};

export { useProfile };
