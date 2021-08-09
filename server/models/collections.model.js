const query = require("../config/mysql.conf");

// find collection by user_id
async function byUserID(res, user_id) {
  let json = { success: false, error: null, data: null };
  try {
    const collection = await query(
      "SELECT * FROM mycollection WHERE user_id = ?",
      [user_id]
    );
    json = { ...json, success: true, data: collection };
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// find collection by username
async function byUserName(res, username) {
  let json = { success: false, error: null, data: null };
  try {
    const collection = await query(
      "SELECT album_id, title, year, country, format, label, thumb FROM mycollection LEFT JOIN users ON mycollection.user_id = users.id WHERE username = ?",
      [username]
    );
    json = { ...json, success: true, data: collection };
    console.log(collection);
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// find albums by album_id
async function byAlbumID(res, id) {
  let json = { success: false, error: null, data: null };
  try {
    const collection = await query("SELECT * FROM mycollection WHERE id = ?", [
      id,
    ]);
    json = { ...json, success: true, data: collection[0] };
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// add album to collection
async function addAlbum(res, user_id, album) {
  let json = { success: false, error: null, data: null };
  try {
    const result = await query(
      "INSERT INTO mycollection ( album_id, user_id, title, year, country, format, label, thumb) VALUES (?,?,?,?,?,?,?,?)",
      [
        album.album_id,
        user_id,
        album.title,
        album.year,
        album.country,
        album.format,
        album.label,
        album.thumb,
      ]
    );
    album = { ...album, id: result.insertId, user_id };

    json = { ...json, success: true, data: album };
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// delete album by ID
async function removeAlbum(res, user_id, album_id) {
  let json = { success: false, error: null, data: null };
  try {
    await query("DELETE FROM mycollection WHERE user_id = ? AND album_id = ?", [
      user_id,
      album_id,
    ]);
    json = { ...json, success: true };
  } catch (err) {
    console.log(err);
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

module.exports = { byAlbumID, byUserID, addAlbum, removeAlbum, byUserName };
