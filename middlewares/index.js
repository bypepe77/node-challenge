const checkUsernameAndPasswordAndNameNotEmpty = (req, res, next) => {
    const { username, password, name } = req.body;
  
    if (username !== "" && password !== "" && name !== "") {
      res.locals.auth = req.body;
      next();
    } else {
      res.status(422).json({ code: "validation" });
    }
  };

  module.exports = {
    checkUsernameAndPasswordAndNameNotEmpty,
  };