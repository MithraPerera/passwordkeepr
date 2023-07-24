-- Sample data for the accounts table (with 4 users and 3 organizations)
INSERT INTO accounts (name, url, password, category, user_id, organization_id, created_on)
VALUES
  -- Finance (Organization ID: 1)
  ('Scotia Bank', 'https://www.scotiabank.com', '123', 'Finance', 1, 1, '2023-07-24'),
  ('TD', 'https://www.td.com', '123', 'Finance', 1, 1, '2023-07-25'),
  ('CIBC', 'https://www.cibc.com', '123', 'Finance', 2, 1, '2023-07-26'),
  ('HSBC', 'https://www.hsbc.com', '123', 'Finance', 3, 1, '2023-07-27'),
  ('RBC', 'https://www.rbc.com', '123', 'Finance', 2, 1, '2023-07-28'),
  ('BMO', 'https://www.bmo.com', '123', 'Finance', 4, 1, '2023-07-29'),

  -- Social Media (Organization ID: 2)
  ('Instagram', 'https://www.instagram.com', '123', 'Social Media', 1, 2, '2023-08-01'),
  ('Facebook', 'https://www.facebook.com', '123', 'Social Media', 2, 2, '2023-08-02'),
  ('LinkedIn', 'https://www.linkedin.com', '123', 'Social Media', 3, 2, '2023-08-03'),
  ('Reddit', 'https://www.reddit.com', '123', 'Social Media', 4, 2, '2023-08-04'),
  ('Twitter', 'https://www.twitter.com', '123', 'Social Media', 1, 2, '2023-08-05'),

  -- Entertainment (Organization ID: 3)
  ('AppleTV', 'https://www.apple.com/tv', '123', 'Entertainment', 2, 3, '2023-08-06'),
  ('Audible', 'https://www.audible.com', '123', 'Entertainment', 3, 3, '2023-08-07'),
  ('Trello', 'https://www.trello.com', '123', 'Entertainment', 4, 3, '2023-08-08'),
  ('Youtube', 'https://www.youtube.com', '123', 'Entertainment', 1, 3, '2023-08-09'),
  ('Spotify', 'https://www.spotify.com', '123', 'Entertainment', 3, 3, '2023-08-10'),
  ('Netflix', 'https://www.netflix.com', '123', 'Entertainment', 2, 3, '2023-08-11');
