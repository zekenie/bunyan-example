module.exports = () => (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  console.error(err);
  res.json({ message: err.message || "Server error" });
};
