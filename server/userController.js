module.exports = {
  getAllUsers: async (req, res) => {
    const db = req.app.get('db');
    const allUsers = await db.get_all_users();
    res.status(200).send(allUsers);
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
  }
}