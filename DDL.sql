-- CS 340
-- Group 36 -> Jack Rundle, Nick Graves
-- Project step 2

-- hikes
CREATE TABLE Hikes (
    HikeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Distance FLOAT,
    Elevation INT,
    Difficulty INT,
    Description TEXT
);

-- users
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

-- saved
CREATE TABLE Saved (
    SavedHikeID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    HikeID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (HikeID) REFERENCES Hikes(HikeID)
);

-- reviews
CREATE TABLE Reviews (
    ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    HikeID INT,
    Rating INT,
    Comment VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (HikeID) REFERENCES Hikes(HikeID)
);


-- insert statments
INSERT INTO Hikes (HikeID, Name, Location, Distance, Elevation, Difficulty, Description) VALUES
(1, 'Mount Wilson Trail', 'Sierra Madre, CA', 14.5, 5388, 7, 'A steep trail with beautiful views.'),
(2, 'Runyon Canyon Park', 'Los Angeles, CA', 3.5, 1043, 3, 'A popular trail in the heart of Hollywood.'),
(3, 'Bridge to Nowhere', 'Azusa, CA', 10, 900, 6, 'A fun trail with a unique destination.');

INSERT INTO Users (UserID, Name, Email, Password) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123'),
(2, 'Jane Smith', 'janesmith@example.com', 'qwerty123'),
(3, 'Bob Johnson', 'bjohnson@example.com', 'letmein123');

INSERT INTO Saved (SavedHikeID, UserID, HikeID) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 1);
INSERT INTO Reviews (ReviewID, UserID, HikeID, Rating, Comment) VALUES
(1, 1, 1, 8, 'Great hike with beautiful scenery.'),
(2, 2, 2, 6, 'A bit crowded but still a nice hike.'),
(3, 3, 3, 9, 'The bridge is definitely worth the hike.'),
(4, 1, 2, 7, 'Nice views but too many tourists.'),
(5, 2, 1, 9, 'Challenging hike with amazing views.');



