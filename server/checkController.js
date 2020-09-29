module.exports = {
  addCleaningCheck: async (req, res) => {
    const db = req.app.get('db');
    const { check_month, check_date, recheck_date } = req.body;

    const [checkMonthId] = await db.add_check_month(check_month);

    const addedDate = await db.add_check_dates(checkMonthId.check_month_id, check_date, recheck_date);

    res.status(200).send(addedDate);
  },

  // addCheckMonth: async (req, res) => {
  //   const db = req.app.get('db');
  //   const { check_month } = req.body;

  //   const checkMonthId = await db.add_check_month(check_month);

  //   res.status(200).send(checkMonthId);
  // },

  addCheckMonths: async (req, res) => {
    const db = req.app.get('db');
    const { year } = req.params;
    let checkMonthIds = [];

    for (let i = 1; i < 13; i++) {
      let month = i.toString().padStart(2, '0');
      checkMonthIds.push(await db.add_check_months(year, month));
    }
    res.status(200).send(checkMonthIds);
  },

  getCheckMonthsInYear: async (req, res) => {
    const db = req.app.get('db');
    const { year } = req.params;
    const allCheckMonthsInYear = await db.get_check_months_in_year(year);
    res.status(200).send(allCheckMonthsInYear);
  },

  // addCheckDates: async (req, res) => {

  // },

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

    res.status(200).send(allApartments);
  },

  submitTenantCleaningCheck: async (req, res) => {
    const db = req.app.get('db')
    const { status, failed_info } = req.body;
    const { tenant_report_id } = req.params;

    await db.update_tenant_report(tenant_report_id, status, failed_info)

    res.sendStatus(200);

  }
}