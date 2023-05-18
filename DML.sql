-- SELECT queries
-- Get all hikes with difficulty level 6 or higher
SELECT * FROM 'Hikes';

-- Get all saved hikes for a specific user (dynamic input: UserID)
SELECT `HikeID`, `Name`, `Location`, `Distance`, `Elevation`, `Difficulty`, `Description` FROM `Hikes` 


-- Get the average rating for a specific hike (dynamic input: HikeID)
SELECT AVG(Rating) FROM `Reviews` WHERE HikeID = x;

-- INSERT queries
-- Add a new hike (dynamic inputs: Name, Location, Distance, Elevation, Difficulty, Description)
INSERT INTO `Hikes` (Name, Location, Distance, Elevation, Difficulty, Description)
VALUES (:NameInput, :LocationInput, :DistanceInput, :ElevationInput, :DifficultyInput, :DescriptionInput);

-- Add a new user (dynamic inputs: Name, Email, Password)
INSERT INTO `Users` (Name, Email, Password)
VALUES (:NameInput, :EmailInput, :PasswordInput);

-- Add a new saved hike for a specific user (dynamic inputs: UserID, HikeID)
INSERT INTO `Saved` (UserID, HikeID)
VALUES (:UserIDInput, :HikeIDInput);

-- Add a new review for a specific hike by a specific user (dynamic inputs: UserID, HikeID, Rating, Comment)
INSERT INTO `Reviews` (UserID, HikeID, Rating, Comment)
VALUES (:UserIDInput, :HikeIDInput, :RatingInput, :CommentInput);

-- UPDATE queries
-- Update the difficulty level of a specific hike (dynamic inputs: HikeID, Difficulty)
UPDATE `Hikes` SET `Difficulty` = `[value]` WHERE HikeID = x;

-- Update the email address of a specific user (dynamic inputs: UserID, Email)
UPDATE `Users` SET `Name`='[value]',`Email`='[value]',`Password`='[value]' WHERE UserID = x;

-- Update the rating and comment of a specific review (dynamic inputs: ReviewID, Rating, Comment)
UPDATE `Reviews` SET `Rating`='[value]',`Comment`='[value]' WHERE ReviewID = x;

-- DELETE queries
-- Delete a specific hike (dynamic input: HikeID)
DELETE FROM `Hikes` WHERE HikeID = x;

-- Delete a specific user and all of their saved hikes and reviews (dynamic input: UserID)
DELETE FROM `Users` WHERE UserID = x;

-- Delete a specific saved hike (dynamic inputs: UserID, HikeID)
DELETE FROM `Saved` WHERE UserID = x AND HikeID = y;

-- Delete a specific review (dynamic input: ReviewID)
DELETE FROM `Reviews` WHERE ReviewID = x;