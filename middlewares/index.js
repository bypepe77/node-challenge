const checkUsernameAndPasswordAndNameNotEmpty = (req, res, next) => {
    const { username, password, name } = req.body;
  
    if (username !== "" && password !== "" && name !== "") {
      res.locals.auth = req.body;
      next();
    } else {
      res.status(422).json({ code: "validation" });
    }
  };

const ObjectIdIsValid = (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return true
    } else {
      return false
    }
  }
  module.exports = {
    checkUsernameAndPasswordAndNameNotEmpty,
    ObjectIdIsValid
  };
