const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      res.status(500).json({ message: err.message });
    });
  };
}

export default asyncHandler;
// This middleware is used to handle asynchronous errors in Express routes.