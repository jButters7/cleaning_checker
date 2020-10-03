module.exports = {
  getAllUsers: async (req, res) => {
    const db = req.app.get('db');
    const allUsers = await db.get_all_users();
    res.status(200).send(allUsers);
  },

  updateUserInformation: async (req, res) => {
    const db = req.app.get('db');


    console.log('punch the fruit')

    const { first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, user_role, apartment_num, tenant_id } = req.body;

    const { user_id } = req.params;

    await db.update_user_info(user_id, first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, user_role);

    //get new apartment id 
    const [newApartmentId] = await db.get_apartment_id(apartment_num);

    await db.update_tenant_apartment(tenant_id, newApartmentId.apartment_id);

    res.sendStatus(200);
  }
}