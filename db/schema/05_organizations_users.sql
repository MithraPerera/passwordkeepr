DROP TABLE IF EXISTS organizations_users CASCADE;

CREATE TABLE organizations_users (
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(organization_id, user_id)
);
