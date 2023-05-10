async function getQueryResult(query, db, redis) {
  let result = await redis.get(query);
  if (result) {
    return JSON.parse(result);
  }
  result = await db.query(query);
  await redis.set(query, JSON.stringify(result));
  return result.rows;
}

//todo, module exports for each query. need specific redis interaction with each