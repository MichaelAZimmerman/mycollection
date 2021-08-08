const query = require("../config/mysql.conf");

// find albums by user_id
async function wantByUserID(res, user_id) {
  let json = { success: false, error: null, data: null };
  try {
    const wantList = await query("SELECT * FROM mywishlist WHERE user_id = ?", [
      user_id,
    ]);
    json = { ...json, success: true, data: wantList };
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// find albums by album_id
async function wantByAlbumID(res, id) {
  let json = { success: false, error: null, data: null };
  try {
    const wantList = await query("SELECT * FROM mywishlist WHERE id = ?", [id]);
    json = { ...json, success: true, data: wantList[0] };
  } catch (err) {
    json.error = "Something went wrong.";
  } finally {
    return res.send(json);
  }
}

// add album to want list
async function wantAlbum(res, user_id, album) {
  let json = { success: false, error: null, data: null };
  try {
    const result = await query(
      "INSERT INTO mywishlist ( album_id, user_id, title, year, country, format, label, thumb) VALUES (?,?,?,?,?,?,?,?)",
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
async function unwantAlbum(res, user_id, album_id) {
  let json = { success: false, error: null, data: null };
  try {
    await query("DELETE FROM mywishlist WHERE user_id = ? AND album_id = ?", [
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

module.exports = { wantByAlbumID, wantByUserID, wantAlbum, unwantAlbum };
