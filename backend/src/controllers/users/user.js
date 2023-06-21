const Artist = require("../../models/Artist");


async function createProfile(req, res) {
  try {
    const { name, description, image } = req.body;


    const newProfile = new Artist({
        name,
        description,
        image,
    });

    const profileSaved = await newProfile.save();
    res.status(201).json(profileSaved);

  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getProfile(req, res) {
    const { id } = req.params;
    try {
        const profile = await Artist.find()

        console.log("Perfil del usuario: ", profile);
        console.log("ID del perfil", profile.id)

        return res.json(profile)

    } catch(error) {
        console.log("No se pudo traer el perfil", error)
        return res.json(error)
    }
}


async function updateProfileById(req, res, next) {

}

async function deleteProfileById(req, res, next) {
 
}

module.exports = {
    createProfile,
    getProfile,
    updateProfileById,
    deleteProfileById,
};
