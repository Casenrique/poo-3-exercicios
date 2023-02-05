-- Active: 1674650818868@@127.0.0.1@3306
CREATE TABLE tamers (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE digimons (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    stage TEXT NOT NULL,
    attribute TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO tamers
VALUES
    ("t001", "Taichi 'Tai' Kamiya", (DATETIME())),
    ("t002", "Yamato 'Matt' Ishida", (DATETIME())),
    ("t003", "Davis Motomiya", (DATETIME()));

INSERT INTO digimons
VALUES
    ("d001", "Leomon", "Champion", "Vaccine", (DATETIME())),
    ("d002", "MetalGreymon", "Ultimate", "Virus", (DATETIME())),
    ("d003", "GranKuwagamon", "Mega", "Free", (DATETIME()));

PRAGMA table_info('digimons');

DROP Table digimons;
DROP Table tamers;

SELECT * FROM digimons;