import { auth } from "@/firebase";

type UserStatus = "base" | "standard" | "premium" | undefined;

export default async function useUserStatus(): Promise<UserStatus> {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  // console.log("decodedToken ===>", decodedToken);
  return decodedToken?.claims?.stripeRole;
}
