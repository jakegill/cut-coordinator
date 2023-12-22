import Client from "../../models/client.model.js";

export async function editClient(req, res, next) {
  const { email, profilePicture, barbers } = req.body;

  let updateData = {};
  console.log(updateData);
  if (profilePicture) {
    updateData.profilePicture = profilePicture;
  }
  if (barbers) {
    updateData.$push = {
      barbers: {
        barber: barbers.barber,
      },
    };
  }

  try {
    const updatedClient = await Client.findOneAndUpdate(
      { email: email },
      updateData
    );
    res.status(200).json({ message: "true", updatedClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
