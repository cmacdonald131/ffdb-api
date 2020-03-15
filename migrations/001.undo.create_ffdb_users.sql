ALTER TABLE ffdb_users
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS ffdb_users;
