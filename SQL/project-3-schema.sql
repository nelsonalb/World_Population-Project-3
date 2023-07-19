--Option to drop parent tables and all respective child tables
DROP TABLE IF EXISTS world_map CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS subregions CASCADE;
DROP TABLE IF EXISTS continents CASCADE;

--Four tables that correspond with .csv files in SQL folder

CREATE TABLE "world_map" (
    "country" VARCHAR   NOT NULL,
    "capital" VARCHAR   NOT NULL,
    "region_id" INT   NOT NULL,
    "subregion_id" INT   NOT NULL,
    "continents_id" INT   NOT NULL,
    CONSTRAINT "pk_world_map" PRIMARY KEY (
        "country"
     )
);

CREATE TABLE "regions" (
    "region_id" INT   NOT NULL,
    "region" VARCHAR   NOT NULL,
    CONSTRAINT "pk_regions" PRIMARY KEY (
        "region_id"
     )
);

CREATE TABLE "subregions" (
    "subregion_id" INT   NOT NULL,
    "subregion" VARCHAR   NOT NULL,
    CONSTRAINT "pk_subregions" PRIMARY KEY (
        "subregion_id"
     )
);

CREATE TABLE "continents" (
    "continent_id" INT   NOT NULL,
    "continent" VARCHAR   NOT NULL,
    CONSTRAINT "pk_continents" PRIMARY KEY (
        "continent_id"
     )
);

ALTER TABLE "world_map" ADD CONSTRAINT "fk_world_map_region_id" FOREIGN KEY("region_id")
REFERENCES "regions" ("region_id");

ALTER TABLE "world_map" ADD CONSTRAINT "fk_world_map_subregion_id" FOREIGN KEY("subregion_id")
REFERENCES "subregions" ("subregion_id");

ALTER TABLE "world_map" ADD CONSTRAINT "fk_world_map_continents_id" FOREIGN KEY("continents_id")
REFERENCES "continents" ("continent_id");