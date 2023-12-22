import Client from "../../models/client.model.js";

export async function getClient(req, res, next) {
  try {
    const email = req.params.email;
    console.log(email);
    const client = await Client.findOne({ email: email }); 
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const { password, ...clientDetails } = client._doc;
    res.json(clientDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
