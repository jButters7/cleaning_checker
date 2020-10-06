module.exports = {
  getAllCurrentUsers: async (req, res) => {
    const db = req.app.get('db');
    const allCurrentUsers = await db.get_all_current_users();
    res.status(200).send(allCurrentUsers);
  },

  updateUserInformation: async (req, res) => {
    const db = req.app.get('db');


    console.log('punch the fruit')
    console.log(req.body)

    const { firstName, lastName, givenEmail, phoneNum, isEmailSub, isTextSub, userRole, apartmentNum, tenant_id } = req.body;


    const { user_id } = req.params;

    await db.update_user_info(user_id, firstName, lastName, givenEmail, phoneNum, isEmailSub, isTextSub, userRole);

    //get new apartment id 
    const [newApartmentId] = await db.get_apartment_id(apartmentNum);

    await db.update_tenant_apartment(tenant_id, newApartmentId.apartment_id);

    res.sendStatus(200);
  },


  deleteUser: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params

    await db.alter_user_status(user_id);

    res.sendStatus(200)
  }
}