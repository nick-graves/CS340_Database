-- SELECT statements
-- Get all hikes
SELECT * FROM Hikes;

-- Get all saved hikes for a specific user (dynamic input: UserID)
SELECT Hikes.HikeID, Hikes.Name, Hikes.Location, Hikes.Distance, Hikes.Elevation, Hikes.Difficulty, Hikes.Description
FROM Hikes
INNER JOIN Saved ON Hikes.HikeID = Saved.HikeID
WHERE Saved.UserID = :UserIDInput;

-- Get the average rating for a specific hike (dynamic input: HikeID)
SELECT AVG(Rating) FROM Reviews WHERE HikeID = :HikeIDInput;

-- INSERT queries
-- Add a new hike (dynamic inputs: Name, Location, Distance, Elevation, Difficulty, Description)
INSERT INTO Hikes (Name, Location, Distance, Elevation, Difficulty, Description)
VALUES (:NameInput, :LocationInput, :DistanceInput, :ElevationInput, :DifficultyInput, :DescriptionInput);

-- Add a new user (dynamic inputs: Name, Email, Password)
INSERT INTO Users (Name, Email, Password)
VALUES (:NameInput, :EmailInput, :PasswordInput);

-- Add a new saved hike for a specific user (dynamic inputs: UserID, HikeID)
INSERT INTO Saved (UserID, HikeID)
VALUES (:UserIDInput, :HikeIDInput);

-- Add a new review for a specific hike by a specific user (dynamic inputs: UserID, HikeID, Rating, Comment)
INSERT INTO Reviews (UserID, HikeID, Rating, Comment)
VALUES (:UserIDInput, :HikeIDInput, :RatingInput, :CommentInput);

-- UPDATE queries
-- Update the difficulty level of a specific hike (dynamic inputs: HikeID, Difficulty)
UPDATE Hikes SET Difficulty = :DifficultyInput WHERE HikeID = :HikeIDInput;

-- Update the email address of a specific user (dynamic inputs: UserID, Email)
UPDATE Users SET Email = :EmailInput WHERE UserID = :UserIDInput;

-- Update the rating and comment of a specific review (dynamic inputs: ReviewID, Rating, Comment)
UPDATE Reviews SET Rating = :RatingInput, Comment = :CommentInput WHERE ReviewID = :ReviewIDInput;

-- DELETE queries
-- Delete a specific hike (dynamic input: HikeID)
DELETE FROM Hikes WHERE HikeID = :HikeIDInput;

-- Delete a specific user and all of their saved hikes and reviews (dynamic input: UserID)
DELETE FROM Users WHERE UserID = :UserIDInput;

-- Delete a specific saved hike (dynamic inputs: UserID, HikeID)
DELETE FROM Saved WHERE UserID = :UserIDInput AND HikeID = :HikeIDInput;

-- Delete a specific review (dynamic input: ReviewID)
DELETE FROM Reviews WHERE ReviewID = :ReviewIDInput;
