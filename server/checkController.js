module.exports = {
  addCleaningCheck: async (req, res) => {
    const db = req.app.get('db');
    const { check_month, check_date, recheck_date } = req.body;

    const [checkMonthId] = await db.add_check_month(check_month);

    const addedDate = await db.add_check_dates(checkMonthId.check_month_id, check_date, recheck_date);

    res.status(200).send(addedDate);
  },

  beginCleaningCheck: async (req, res) => {
    const db = req.app.get('db');

    const { check_date_id } = req.params;

    const allApartments = await db.get_all_apartments();

    //Assigns each apartment id a cleaning check date id. 
    for (let i = 0; i < allApartments.length; i++) {
      await db.assign_apartment_cleaning_date(allApartments[i].apartment_id, check_date_id);
    }

    const allTenants = await db.get_all_tenants();

    for (let i = 0; i < allTenants.length; i++) {
      const currentTenantId = allTenants[i].tenant_id;
      const [apartmentId] = await db.get_tenants_apartment_id(currentTenantId);
      const [apartmentCheckId] = await db.find_recent_apartment_check_id(apartmentId.apartment_id);
      console.log(apartmentCheckId.max, currentTenantId);
      await db.assign_to_tenant_report(apartmentCheckId.max, currentTenantId);
    }

    res.status(200).send(allApartments)
  },

  submitTenantCleaningCheck: async (req, res) => {
    const { tenant_report_id, status, failed_info } = req.body
  }
}