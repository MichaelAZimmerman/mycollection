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

async function signup(res, username, password) {
  let json = { data: null, success: false, error: null };
  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users.length !== 0) {
      json.error = "Username already taken";
    } else {
      const hashed = await bcrypt.hash(password, 8);
      const uuid = uuidv4();
      await query(
        "INSERT INTO users (password, username, uuid) VALUES (?,?,?)",
        [hashed, username, uuid]
      );
      json = { ...json, success: true };
    }
  } catch (err) {
    console.log(err);
    json.error = "Something went wrong!";
  } finally {
    return res.send(json);
  }
}
