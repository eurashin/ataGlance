DROP DATABASE Glance; 
CREATE DATABASE Glance;
 
USE Glance; 

DROP TABLE IF EXISTS Users;
CREATE TABLE Users
(

    userID      VARCHAR(7),     -- User id to identify individuals 
    userName    VARCHAR(50),    -- User name of person  
    password    VARCHAR(20),    -- User password for the account 
    

    PRIMARY KEY (userID)
);


DROP TABLE IF EXISTS Tag;
CREATE TABLE Tag
(

    tagID      VARCHAR(20),
    tagName    VARCHAR(20), 

    PRIMARY KEY (tagID)
);

DROP TABLE IF EXISTS Story;
CREATE TABLE Story
(

    sID      VARCHAR(20),           -- id created by all tag #
    start    DATE,                  -- the day the story started   
    PRIMARY KEY (sID)
);

DROP TABLE IF EXISTS Subscribe;
CREATE TABLE Subscribe
(

    start      date,     -- start date of users subscription 
    subName    VARCHAR(20),     -- name storied by person 
    subTag     VARCHAR(20),     -- story tag id  
    subID      VARCHAR(7),      -- the id of the user 
    FOREIGN KEY ( subID) references Users(userID),
    FOREIGN KEY ( subTag) references Story(sID),
    PRIMARY KEY (subName)
);


DROP TABLE IF EXISTS Picture;
CREATE TABLE Picture
(

    url         VARCHAR(2041),
    citation    VARCHAR(2041),
    PRIMARY KEY (url)
);

DROP TABLE IF EXISTS Text;
CREATE TABLE Text
(

    storyID      VARCHAR(20),           -- id story it goes  to 
    dateCreated    DATE, 
    info            VARCHAR(2041),
    picID           VARCHAR(2041),
    FOREIGN KEY(storyID) REFERENCES Story(sID),
    FOREIGN KEY(picID) REFERENCES Picture(url) ,               -- the day the story started  
    PRIMARY KEY (info)
);



INSERT INTO Tag VALUES ('1', 'climate');
INSERT INTO Tag VALUES ('2', 'europe');
INSERT INTO Tag VALUES ('3', 'us');
INSERT INTO Tag VALUES ('4', 'aisa');
INSERT INTO Tag VALUES ('5', 'south america');
INSERT INTO Tag VALUES ('6', 'africa');
INSERT INTO Tag VALUES ('7', 'flu');
INSERT INTO Tag VALUES ('8', 'conflict');
INSERT INTO Tag VALUES ('9', 'president');
INSERT INTO Tag Values ('10', 'investigation');
INSERT INTO Tag VALUES ('11', 'trump');
INSERT INTO Tag Values ('12', 'water');
INSERT INTO Tag VALUES ('13', 'youtube');
INSERT INTO Tag Values ('14', 'facebook');
INSERT INTO Tag Values ('15', 'technology');
INSERT INTO Tag VALUES ('16', 'economics');
INSERT INTO Tag Values ('17', 'stock market');
INSERT INTO Tag Values ('18', 'economey');
INSERT INTO Tag VALUES ('19', 'recession');
INSERT INTO Tag Values ('20', 'oscar');
