CREATE TABLE parks(
    PARK_ID VARCHAR(255)PRIMARY KEY NOT NULL,
    Park_name VARCHAR(255)NOT NULL,
    Address VARCHAR(255)NOT NULL,
    City VARCHAR(255)NOT NULL,
    Zip_code VARCHAR(10)NOT NULL,
    District VARCHAR(255)NOT NULL,
    Phone VARCHAR(20)NOT NULL,
    Longitude NUMERIC,
    Latitude NUMERIC,
    parkurl VARCHAR(255)NOT NULL,
    operhours VARCHAR(255)NOT NULL,
    restroom VARCHAR(3)NOT NULL,
    adacomply VARCHAR(3)NOT NULL,
    camping VARCHAR(3)NOT NULL,
    picnic VARCHAR(3)NOT NULL,
    playground VARCHAR(3)NOT NULL,
    basketball VARCHAR(3)NOT NULL,
    tennis VARCHAR(3)NOT NULL,
    volleyball VARCHAR(3)NOT NULL,
    spraygroun VARCHAR(3)NOT NULL,
    mtbcycle VARCHAR(3)NOT NULL,
    golf VARCHAR(3)NOT NULL,
    boating VARCHAR(3)NOT NULL,
    fishing VARCHAR(3)NOT NULL,
    swimming VARCHAR(3)NOT NULL,
    discgolf VARCHAR(3)NOT NULL,
    shelter VARCHAR(3)NOT NULL,
    walking VARCHAR(3)NOT NULL,
    dogpark VARCHAR(3)NOT NULL,
    ampitheate VARCHAR(3)NOT NULL,
    motorboat VARCHAR(3)NOT NULL,
    horseback VARCHAR(3)NOT NULL,
    garden VARCHAR(3)NOT NULL,
    historical VARCHAR(3)NOT NULL,
    skatepark VARCHAR(3)NOT NULL,
    interpreti VARCHAR(3)NOT NULL,
    tabletenni VARCHAR(3)NOT NULL,
    recgym VARCHAR(3)NOT NULL,
    fitness VARCHAR(3)NOT NULL,
    rvcamp VARCHAR(3)NOT NULL,
    sailing VARCHAR(3)NOT NULL,
    pickleball VARCHAR(3)NOT NULL,
    multipurpos VARCHAR(3)NOT NULL,
    rcflyarea VARCHAR(3)NOT NULL,
    flwrgarden VARCHAR(3)NOT NULL,
    indorpavil VARCHAR(3)NOT NULL,
    aquaticctr VARCHAR(3)NOT NULL,
    ballfield VARCHAR(3)NOT NULL,
    batingcage VARCHAR(3)NOT NULL,
    bicycleltr VARCHAR(3)NOT NULL,
    bmxtrack VARCHAR(3)NOT NULL,
    bocciball VARCHAR(3)NOT NULL,
    confcenter VARCHAR(3)NOT NULL,
    concesstnd VARCHAR(3)NOT NULL,
    firepit VARCHAR(3)NOT NULL,
    funbrella VARCHAR(3)NOT NULL,
    gagaball VARCHAR(3)NOT NULL,
    gazebo VARCHAR(3)NOT NULL,
    opngrnspac VARCHAR(3)NOT NULL,
    highropes VARCHAR(3)NOT NULL,
    horseshoe VARCHAR(3)NOT NULL,
    environedu VARCHAR(3)NOT NULL,
    dockpier VARCHAR(3)NOT NULL,
    playsixty VARCHAR(3)NOT NULL,
    rockclimb VARCHAR(3)NOT NULL,
    seniorctr VARCHAR(3)NOT NULL,
    shadearbor VARCHAR(3)NOT NULL,
    shuflboard VARCHAR(3)NOT NULL,
    trlrunning VARCHAR(3)NOT NULL,
    grnwyacces VARCHAR(3)NOT NULL,
    handball VARCHAR(3)NOT NULL,
    arts VARCHAR(3)NOT NULL,
    multiuser VARCHAR(3)NOT NULL,
    playswings VARCHAR(3)NOT NULL,
    parking VARCHAR(3)NOT NULL,
    picture VARCHAR(3)NOT NULL,
    PARK_TYPE VARCHAR(255)NOT NULL,
    Acres NUMERIC,
    Area NUMERIC,
    Length NUMERIC
);

	SELECT * from parks LIMIT 5;