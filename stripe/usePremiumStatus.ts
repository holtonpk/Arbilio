import { useState, useEffect } from "react";
import isUserPremium from "./isUserPremium";
import { User } from "firebase/auth";

export default function usePremiumStatus(user: User | undefined) {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (user) {
      const checkPremium = async () => {
        const premium = await isUserPremium();
        setIsPremium(premium);
      };
      checkPremium();
    }
  }, [user]);

  return isPremium;
}
