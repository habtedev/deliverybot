import "dotenv/config";
import connectDB from "./src/utils/db.js";
import User from "./src/models/userModel.js";

const phone = "251703870700"; // without +

async function main() {
  await connectDB();
  const user = await User.findOne({ phone });
  if (!user) {
    console.log(`User with phone ${phone} not found.`);
  } else {
    if (user.role !== "admin") {
      user.role = "admin";
      await user.save();
      console.log(`User ${user.name} role updated to admin.`);
    } else {
      console.log(`User ${user.name} is already admin.`);
    }
  }
  process.exit(0);
}

main();
