async function loadDBtoRedis(db, redis) {
  try {
    await db.connect();
    await redis.connect();

    const { rows: tables } = await db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'aerio'

  `);
    console.log(tables);
  } catch (err) {
    console.error(err);
  }
}

module.exports = loadDBtoRedis;
