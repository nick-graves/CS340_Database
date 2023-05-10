-- SELECT queries
-- Get all hikes with difficulty level 6 or higher
SELECT * FROM Hikes WHERE Difficulty >= 6;

-- Get all saved hikes for a specific user (dynamic input: UserID)
SELECT Hikes.Name, Hikes.Location, Hikes.Distance, Hikes.Elevation, Hikes.Difficulty, Hikes.Description
FROM Hikes
INNER JOIN Saved ON Hikes.HikeID = Saved.HikeID
WHERE Saved.UserID = :UserID;

-- Get the average rating for a specific hike (dynamic input: HikeID)
SELECT AVG(Rating) FROM Reviews WHERE HikeID = :HikeID;

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
UPDATE Hikes SET Difficulty = :DifficultyInput WHERE HikeID = :HikeID;

-- Update the email address of a specific user (dynamic inputs: UserID, Email)
UPDATE Users SET Email = :EmailInput WHERE UserID = :UserID;

-- Update the rating and comment of a specific review (dynamic inputs: ReviewID, Rating, Comment)
UPDATE Reviews SET Rating = :RatingInput, Comment = :CommentInput WHERE ReviewID = :ReviewID;

-- DELETE queries
-- Delete a specific hike (dynamic input: HikeID)
DELETE FROM Hikes WHERE HikeID = :HikeID;

-- Delete a specific user and all of their saved hikes and reviews (dynamic input: UserID)
DELETE FROM Users WHERE UserID = :UserID;

-- Delete a specific saved hike (dynamic inputs: UserID, HikeID)
DELETE FROM Saved WHERE UserID = :UserID AND HikeID = :HikeID;

-- Delete a specific review (dynamic input: ReviewID)
DELETE FROM Reviews WHERE ReviewID = :ReviewID;