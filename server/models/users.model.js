const bcrypt = require("bcrypt");
const query = require("../config/mysql.conf");
const { v4: uuidv4 } = require("uuid");

async function getByUserID(uuid) {
  let json = { error: null, data: null };
  try {
    const users = await query(
      "SELECT id, username, uuid FROM users WHERE uuid = ?",
      [uuid]
    );
    if (users.length === 0) {
      json.error = "No user found";
    } else {
      json = { ...json, data: users[0] };
    }
  } catch (err) {
    json.error = "Something went wrong?";
  } finally {
    return json;
  }
}
