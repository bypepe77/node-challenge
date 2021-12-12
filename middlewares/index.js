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
const checkIfLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.status(401).json({ code: "You are not logged in" });
    }
  };
  module.exports = {
    checkUsernameAndPasswordAndNameNotEmpty,
    ObjectIdIsValid,
    checkIfLoggedIn
  };
