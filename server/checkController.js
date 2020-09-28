module.exports = {
  addCleaningCheck: async (req, res) => {
    const db = req.app.get('db');
    const { check_month, check_date, recheck_date } = req.body;

    const [checkMonthId] = await db.add_check_month(check_month);

    const addedDate = await db.add_check_dates(checkMonthId.check_month_id, check_date, recheck_date);

    res.status(200).send(addedDate);
  }
}