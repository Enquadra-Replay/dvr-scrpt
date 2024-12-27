const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

function isValidDateTime(dateTime) {
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateTime);
}

app.get("/cgi-bin/loadfile.cgi", (req, res) => {
  const { action, channel, subtype = 0, Types = "dav" } = req.query;
  console.log("hererm")

  const startTime = req.query.startTime
  const endTime = req.query.endTime
  console.log(req.query);

  if (action !== "startLoad") {
    return res.status(400).send("Invalid action. Use action=startLoad.");
  }
  if (!channel || !startTime || !endTime) {
    const url = req.url;
    console.log(url,"Missing required parameters: channel, startTime, endTime.");
    return res
      .status(400)
      .send("Missing required parameters: channel, startTime, endTime.");
  }


  const filePath = path.join(__dirname, "video.mp4");

  if (!fs.existsSync(filePath)) {
    console.log(filePath);
    return res.status(404).send("File not found for the given parameters.");
  }

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="channel${channel}_${startTime}_${endTime}.${Types}"`
  );

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  fileStream.on("error", (err) => {
    console.error("File streaming error:", err);
    res.status(500).send("Internal server error while streaming the file.");
  });
});

app.listen(PORT, () => {
  console.log(`DVR server is running on http://localhost:${PORT}`);
});
