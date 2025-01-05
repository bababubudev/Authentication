import { jwtVerifier } from "../utils/jwtHelper";

export default async function authorize(req, res, next) {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const payload = jwtVerifier(jwtToken)
    req.user = payload.user;
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Unauthorized" });
  }
}