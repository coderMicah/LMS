
import { IUserData } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserDetailContextType {
  userDetail: IUserData;
  setUserDetail: React.Dispatch<React.SetStateAction<IUserData>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);

export const UserDetailContextProvider = ({ children }: { children: ReactNode }) => {
  const [userDetail, setUserDetail] = useState<IUserData>({
    name: "",
    email: "",
    member: false,
    user: undefined,
  });

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};


export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within a UserDetailContextProvider");
  }
  return context;
};