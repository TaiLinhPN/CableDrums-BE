import User from "../models/User";

export const checkUser = async (userId: string, userType: string) => {
  try {
    const user = await User.findById(userId).select("userType");
    if (user && user.userType === userType) {
      return true;
    }else return false;
  } catch (error) {
    console.log("checkUser", error);
    return false;
  }
};
