module.exports = {

  addCheckMonths: async (req, res) => {
    const db = req.app.get('db');
    const { year } = req.params;
    let checkMonthInfo = [];

    for (let i = 1; i < 13; i++) {
      let month = i.toString().padStart(2, '0');
      let [addedMonthInfo] = await db.add_check_months(year, month)
      checkMonthInfo.push(addedMonthInfo);
    }
    res.status(200).send(checkMonthInfo);
  },

  getCheckMonthsInYear: async (req, res) => {
    const db = req.app.get('db');
    const { year } = req.params;
    const allCheckMonthsInYear = await db.get_check_months_in_year(year);
    res.status(200).send(allCheckMonthsInYear);
  },

  addCheckDate: async (req, res) => {
    const db = req.app.get('db');

    const { check_month_id } = req.params;
    const { check_date } = req.body;

    const addedDate = await db.add_check_date(check_month_id, check_date);

    res.status(200).send(addedDate)
  },

  //! there is nothing in the db that tells if the month is archived yet. 
  getAllCheckMonthsAndDates: async (req, res) => {
    const db = req.app.get('db')
    const allCheckMonths = await db.get_all_check_months()
    // console.log(allCheckMonths)

    const allCheckDates = await db.get_all_check_dates()

    //Combine the months with their respected dates. 
    allCheckMonths.forEach(element => {
      let elementsId = element.check_month_id;
      element.check_dates = []
      allCheckDates.forEach(el => {
        if (el.check_month_id === elementsId) {
          element.check_dates.push(el)
        }
      })
    })

    //because of the forEach allCheckMonths now Includes their respected dates for that month. 
    res.status(200).send(allCheckMonths);
  },

  getUpcomingCheckDates: async (req, res) => {
    const db = req.app.get('db');

    const upcomingCheckDates = await db.get_upcoming_check_dates();

    res.status(200).send(upcomingCheckDates);
  },

  beginCleaningCheck: async (req, res) => {
    const db = req.app.get('db');

    console.log('body', req.body);
    const { check_month_id } = req.params;

    await db.alter_month_status_to_inprogress(check_month_id);

    const allApartments = await db.get_all_apartments();
    const allTenants = await db.get_all_tenants();

    //Creates a tenant report for every tenants currently within the app.
    for (let i = 0; i < allTenants.length; i++) {
      const currentTenantId = allTenants[i].tenant_id;
      //finds tenants apartment id using their tenant id
      const [apartmentId] = await db.get_tenants_apartment_id(currentTenantId);

      console.log(apartmentId)
      await db.assign_to_tenant_report(check_month_id, apartmentId.apartment_id, currentTenantId);
    }

    res.status(200).send(allApartments);
  },

  getTenantReports: async (req, res) => {
    const db = req.app.get('db');
    const { month_id, apartment_id } = req.params;

    console.log('here', month_id, apartment_id)

    const tenantReports = await db.get_tenant_reports_on_month_for_apartment(month_id, apartment_id);

    res.status(200).send(tenantReports);
  },

  submitTenantCleaningCheck: async (req, res) => {
    const db = req.app.get('db')
    const { checkStatus, failedInfo } = req.body;
    const { tenant_report_id } = req.params;

    console.log('checkStatus', checkStatus)
    console.log('failedInfo', failedInfo)
    console.log('tenantrid', tenant_report_id)

    await db.update_tenant_report(tenant_report_id, checkStatus, failedInfo)
    res.sendStatus(200);

  },

  getAllApartments: async (req, res) => {
    const db = req.app.get('db');

    const allApartments = await db.get_all_apartments();

    res.status(200).send(allApartments);
  },

  getTenantCleaningCheckHistory: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;

    const TenantCleaningCheckHistory = await db.get_tenant_cleaning_check_history(user_id);

    res.status(200).send(TenantCleaningCheckHistory);
  },

  archiveMonth: async (req, res) => {
    const db = req.app.get('db');
    const { month_id } = req.params;

    const monthArchived = await db.archive_month(month_id);

    res.status(200).send(monthArchived);
  },

  editCheckDate: async (req, res) => {
    const db = req.app.get('db');
    const { check_date_id, check_date } = req.params;

    await db.edit_check_date(check_date_id, check_date);

    res.sendStatus(200);

  }
}