-- Sample data for the accounts table (with 4 users and 3 organizations)
INSERT INTO accounts (name, url, username, password, category_id, user_id, organization_id, created_on)
VALUES
  -- Finance
  ('Scotia Bank', 'https://www.scotiabank.com', 'scotia01','k12F97lP', 1, 1, 1, '2023-07-24'),
  ('TD', 'https://www.td.com', 'TD01','5yGh@93L', 1, 1, 1, '2023-07-25'),
  ('CIBC', 'https://www.cibc.com', 'CIBC01','P9Xm#17K', 1, 1, 1, '2023-07-26'),
  ('HSBC', 'https://www.hsbc.com', 'HSBC01','B3h*64pJ', 1, 2, 1, '2023-07-27'),
  ('RBC', 'https://www.rbc.com', 'RBC01','7A@pZ29X', 1, 2, 1, '2023-07-28'),
  ('BMO', 'https://www.bmo.com', 'BMO01','2tY!aRq6', 1, 2, 1, '2023-07-29'),

  -- Social Media
  ('Instagram', 'https://www.instagram.com', 'insta001','I6z@qJ8e', 2, 1, 1, '2023-08-01'),
  ('Facebook', 'https://www.facebook.com', 'facebook001','U3r#f9Vp', 2, 1, 1, '2023-08-02'),
  ('LinkedIn', 'https://www.linkedin.com', 'linkedin001','L2p@7c4s', 2, 1, 1, '2023-08-03'),
  ('Instagram', 'https://www.instagram.com', 'insta002', 'B1s@9zYp', 2, 2, 1, '2023-08-01'),
  ('Facebook', 'https://www.facebook.com', 'facebook002','T6q#cN3w', 2, 2, 2, '2023-08-02'),
  ('LinkedIn', 'https://www.linkedin.com', 'linkedin002','H7m@mJ4r', 2, 3, 2, '2023-08-03'),
  ('Reddit', 'https://www.reddit.com', 'reddit01','R8y*qX2z', 2, 4, 2, '2023-08-04'),
  ('Twitter', 'https://www.twitter.com','twitter01', 'M2a@cE1u', 2, 1, 2, '2023-08-05'),

  -- Entertainment
  ('AppleTV', 'https://www.apple.com/tv', 'apletv','V1g#oN6b', 3, 1, 1, '2023-08-06'),
  ('Audible', 'https://www.audible.com', 'audible123', 'X5h@kR2m', 3, 1, 1, '2023-08-07'),
  ('Netflix', 'https://www.trello.com', 'netflix123','K8p@uZ3s', 3, 1, 1, '2023-08-08'),
  ('Youtube', 'https://www.apple.com/tv', 'youtube123','P3w#lF5s', 3, 1, 1, '2023-08-06'),
  ('Audible', 'https://www.audible.com', 'audible107','Q9z@rE1v', 3, 3, 3, '2023-08-07'),
  ('Netflix', 'https://www.trello.com', 'netflix01', 'R7u@dL6x', 3, 4, 3, '2023-08-08'),
  ('Youtube', 'https://www.youtube.com', 'youtube02', 'E5k@mZ9v', 3, 1, 3, '2023-08-09'),
  ('Spotify', 'https://www.spotify.com', 'spotify123', 'H2m#vB3s', 3, 3, 3, '2023-08-10'),
  ('Youtube', 'https://www.netflix.com', 'youtube23', 'B4q#nU8m', 3, 2, 3, '2023-08-11'),

  -- Work
  ('Trello', 'https://www.trello.com', 'trello123', 'J7s#oN1m', 4, 1, 1, '2023-08-06'),
  ('Google Meeting', 'https://meet.google.com', 'google123', 'Z9b@xV4h',4, 1, 1, '2023-08-07'),
  ('Adobe', 'https://www.adobe.com', 'adobe123', 'M1r@kX3d', 4, 1, 1, '2023-08-08'),
  ('Podcast', 'https://www.youtube.com', 'youtube123', 'L2p@cH5b', 4, 1, 1, '2023-08-09'),
  ('Zoho Mail', 'https://mail.zoho.com', 'zoho123', 'W8f@gA3r', 4, 1, 3, '2023-08-10'),
  ('Trello', 'https://www.trello.com', 'trello123', 'R4b@lF2h',4, 2, 1, '2023-08-06'),
  ('Google Meeting', 'https://meet.google.com', 'google123', 'V5m@gE3l', 4, 3, 3, '2023-08-07'),
  ('Adobe', 'https://www.adobe.com', 'adobe123', 'F7z@oW1p', 4, 3, 2, '2023-08-08'),
  ('Podcast', 'https://www.youtube.com', 'youtube123', 'H2n@cQ8m', 4, 2, 4, '2023-08-09'),
  ('Zoho Mail', 'https://mail.zoho.com', 'zoho123', 'T3e@dF9v', 4, 4, 3, '2023-08-10');
