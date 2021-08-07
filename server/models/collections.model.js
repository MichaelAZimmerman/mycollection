const query = require("../config/mysql.conf");

// find albums by user_id
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
      "INSERT INTO mycollection (user_id, album_id, title, year, country, format, label, thumb) VALUES (?,?,?,?,?,?,?,?)",
      [
        user_id,
        album.album_id,
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
