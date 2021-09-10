const handleError = (error, res) => {
  console.log(error);

  res.status(error.status || 500).json({ message: error.message });
};

module.exports = handleError;
