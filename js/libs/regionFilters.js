// Adds the England filter to the map using a json file - found in data/geo/englandRegions.js
function englandJson(Cesium, viewer) {
    // Hides the sensor information box modal
    $(document.getElementById("informationBox")).modal('hide');
    // Seed the random number generator for repeatable results
    Cesium.Math.setRandomNumberSeed(0);

    var allRegionsID = [];
    var averageRegionsAQ = [];

    // Adds all regionID's in the country England to allRegionsID
    function addAllRegions(response) {
        var jsonResponse = $.parseJSON(response);
        var allRegions = jsonResponse.regions;
        if (allRegions !== null) {
            for (var i = 0; i < allRegions.length; i++) {
                allRegionsID.push(allRegions[i]);
            }
        }
    }

    // Gets all regionID's in the country England from the database
    $.ajax({
        async: true,
        type: "GET",
        url: "Php/getAllRegions.php?rc=2",
        datatype: "json",
        success: addAllRegions,
    });

    // Adds average air quality for all regions in England to averageRegionsAQ
    function addRegionsAverageAQ(response) {
        var jsonResponse = $.parseJSON(response);
        if (jsonResponse !== null) {
            averageRegionsAQ.push(jsonResponse);
        }
    }

    // For all regions in England, gets the region air quality average from the database
    for (var i = 0; i < allRegionsID.length; i++) {
        $.ajax({
            async: true,
            type: "GET",
            url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
            datatype: "json",
            success: addRegionsAverageAQ,
        });
    }

    // Adds json file to Cesium viewer datasources 
    var englandPromise = Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json');
    englandPromise.then(function(englandDataSource) {
        viewer.dataSources.add(englandDataSource);

        // Gets the array of region entities
        var englandEntities = englandDataSource.entities.values;

        //For each region in England
        for (var i = 0; i < englandEntities.length; i++) {
            var englandStr = englandEntities[i]._id;
            var englandRegionJsonId = englandStr.substring(8, 9);

            // Adds the regionID, name, country and entity type into each Cesium entity based on the ID from the json file
            switch (englandRegionJsonId) {
                case "1":
                    englandEntities[i]._name = "2857";
                    englandEntities[i]._description = "North East";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";

                    break;
                case "2":
                    englandEntities[i]._name = "8675";
                    englandEntities[i]._description = "North West";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "3":
                    englandEntities[i]._name = "1264";
                    englandEntities[i]._description = "Yorkshire and The Humber";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "4":
                    englandEntities[i]._name = "7657";
                    englandEntities[i]._description = "East Midlands";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "5":
                    englandEntities[i]._name = "5431";
                    englandEntities[i]._description = "West Midlands";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "6":
                    englandEntities[i]._name = "1865";
                    englandEntities[i]._description = "Eastern";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "7":
                    englandEntities[i]._name = "9783";
                    englandEntities[i]._description = "London";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "8":
                    englandEntities[i]._name = "6758";
                    englandEntities[i]._description = "South East";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                case "9":
                    englandEntities[i]._name = "1587";
                    englandEntities[i]._description = "South West";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
                default:
                    englandEntities[i]._name = "undefined";
                    englandEntities[i]._description = "undefined";
                    englandEntities[i].country = "England";
                    englandEntities[i].type = "filterRegion";
                    break;
            }

            //For each entity, creates a random color based on the region name
            var colorHash = {};
            const englandEntity = englandEntities[i];
            var name = englandEntity._id;
            var color = colorHash[name];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha: 1.0
                });
                colorHash[name] = color;
            }

            // Sets the polygon material to a random color
            englandEntity.polygon.material = color;
            // Removes the outlines
            englandEntity.polygon.outline = false;

            // Checks if the hieght of the entity is undefined
            if (englandEntity.polygon.extrudedHeight === undefined) {
                // Checks for each region if there is an average air quality reading
                console.log("height is undefined");
                averageRegionsAQ.forEach(function(region) {
                    // If the region name matches the entity name
                    console.log("not the same name");
                    if (region.regionName === englandEntity._description) {
                        // Checks the region average isn't null
                        if (region.averageAirQuality !== null) {
                            console.log("in the right place");
                            // Adds the hieght to the region
                            englandEntity.airQuality = region.averageAirQuality;
                            englandEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                        }
                    }
                });
            }
        }
    });
}

// Adds the Wales filter to the map using a json file - found in data/geo/walesRegions.js
function walesJson(Cesium, viewer) {
    // Hides the sensor information box modal
    $(document.getElementById("informationBox")).modal('hide');
    // Seed the random number generator for repeatable results
    Cesium.Math.setRandomNumberSeed(0);

    var allRegionsID = [];
    var averageRegionsAQ = [];

    // Adds all regionID's in the country Wales to allRegionsID
    function addAllRegions(response) {
        var jsonResponse = $.parseJSON(response);
        var allRegions = jsonResponse.regions;
        if (allRegions !== null) {
            for (var i = 0; i < allRegions.length; i++) {
                allRegionsID.push(allRegions[i]);
            }
        }
    }

    // Gets all regionID's in the country Wales from the database
    $.ajax({
        async: false,
        type: "GET",
        url: "Php/getAllRegions.php?rc=1",
        datatype: "json",
        success: addAllRegions,
    });

    // Adds average air quality for all regions in England to averageRegionsAQ
    function addRegionsAverageAQ(response) {
        var jsonResponse = $.parseJSON(response);
        if (jsonResponse === null) {
            averageRegionsAQ.push(jsonResponse);
        }
    }

    // For all regions in Wales, gets the region air quality average from the database
    for (var i = 0; i < allRegionsID.length; i++) {
        $.ajax({
            async: false,
            type: "GET",
            url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
            datatype: "json",
            success: addRegionsAverageAQ,
        });
    }

    // Adds json file to Cesium viewer datasources 
    var walesPromise = Cesium.GeoJsonDataSource.load('data/geo/walesRegions.json');
    walesPromise.then(function(walesDataSource) {
        viewer.dataSources.add(walesDataSource);

        // Gets the array of region entities
        var walesEntities = walesDataSource.entities.values;

        //For each region in Wales
        for (var i = 0; i < walesEntities.length; i++) {
            var walesStr = walesEntities[i]._id;
            var walesRegionJsonId = walesStr.substring(8, 9);

            // Adds the regionID, name, country and entity type into each Cesium entity based on the ID from the json file
            switch (walesRegionJsonId) {
                case "1":
                    walesEntities[i]._name = "2958";
                    walesEntities[i]._description = "North Wales";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";
                    break;
                case "6":
                    walesEntities[i]._name = "3857";
                    walesEntities[i]._description = "Mid and West Wales";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";

                    break;
                case "7":
                    walesEntities[i]._name = "4859";
                    walesEntities[i]._description = "South Wales Central";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";

                    break;
                case "8":
                    walesEntities[i]._name = "9275";
                    walesEntities[i]._description = "South Wales East";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";

                    break;
                case "9":
                    walesEntities[i]._name = "9185";
                    walesEntities[i]._description = "South Wales West";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";

                    break;
                default:
                    walesEntities[i]._name = "undefined";
                    walesEntities[i]._description = "undefined";
                    walesEntities[i].type = "filterRegion";
                    walesEntities[i].country = "Wales";
                    break;
            }

            //For each entity, creates a random color based on the region name
            var colorHash = {};
            const walesEntity = walesEntities[i];
            var name = walesEntity._id;
            var color = colorHash[name];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha: 1.0
                });
                colorHash[name] = color;
            }

            // Sets the polygon material to a random color
            walesEntity.polygon.material = color;
            // Removes the outlines
            walesEntity.polygon.outline = false;

            // Checks if the hieght of the entity is undefined
            if (walesEntity.polygon.extrudedHeight === undefined) {
                // Checks for each region if there is an average air quality reading
                averageRegionsAQ.forEach(function(region) {
                    // If the region name matches the entity name
                    if (region.regionName === walesEntity._description) {
                        // Checks the region average isn't null
                        if (region.averageAirQuality !== null) {
                            // Adds the hieght to the region
                            walesEntity.airQuality = region.averageAirQuality;
                            walesEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                        }
                    }
                });
            }
        }
    });
}

// Applies the filters selected
function applyFilter(Cesium, viewer, england, wales, regionAverage, center) {
    // Hides the sensor information box modal
    $(document.getElementById("informationBox")).modal('hide');
    // Removes all datasources and entities
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();

    // Checks what checkboxes have been selected
    if (regionAverage.checked) {
        if (england.checked) {
            // Positions the map to the UK
            viewer.camera.flyTo({
                destination: center,
                duration: 2
            });
            // Adds the England regions filter
            englandJson(Cesium, viewer);
        }
        if (wales.checked) {
            // Positions the map to the UK
            viewer.camera.flyTo({
                destination: center,
                duration: 2
            });
            // Adds the Wales regions filter
            walesJson(Cesium, viewer);
        }

        if (england.checked == false && wales.checked == false) {
            // Removes all datasources and entities
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            // Adds Cesium points to the map - found in createCesiumPoints.js
            addCesiumPoints(Cesium, viewer);
            // Displays a warning - found in warnings.js
            filterWarning();
        }
    } else {
        // Sets default for checkboxes
        england.checked = false;
        wales.checked = true;
        regionAverage.checked = true;
        // Removes all datasources and entities
        viewer.dataSources.removeAll();
        viewer.entities.removeAll();
        // Adds Cesium points to the map - found in createCesiumPoints.js
        addCesiumPoints(Cesium, viewer);
        // Displays a warning - found in warnings.js
        filterWarning();
    }
}

// Resets filter to display Cesium points on the map
function resetFilter(Cesium, viewer, england, wales, countyAverage) {
    // Sets default for checkboxes
    england.checked = false;
    wales.checked = true;
    countyAverage.checked = true;
    // Removes all datasources and entities
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    // Adds Cesium points to the map - found in createCesiumPoints.js
    addCesiumPoints(Cesium, viewer);
}