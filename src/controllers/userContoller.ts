import User from "../models/User";

export const findUser = async (req, res) => {
  const { query } = req.body;
  const searchString = String(query);
  try {
    const users = await User.find(
      {
        $or: [
          { email: { $regex: searchString, $options: "i" } }, 
          { username: { $regex: searchString, $options: "i" } },
        ],
      },
      "_id username email avatar"
    );

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
