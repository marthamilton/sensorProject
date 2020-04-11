function englandJson(Cesium, viewer) {
    $(document.getElementById("informationBox")).modal('hide');
    //Seed the random number generator for repeatable results.
    Cesium.Math.setRandomNumberSeed(0);

    var allRegionsID = [];
    var averageRegionsAQ = [];

    //gets all regions in the country Wales
    function addAllRegions(response) {
        var jsonResponse = $.parseJSON(response);
        var allRegions = jsonResponse.regions;
        if (allRegions === null) { } else {
            for (var i = 0; i < allRegions.length; i++) {
                allRegionsID.push(allRegions[i]);
            }
        }
    }

    $.ajax({
        async: false,
        type: "GET",
        url: "Php/getAllRegions.php?rc=2",
        datatype: "json",
        success: addAllRegions,
    });

    //gets average air quality for all regions in Wales
    function addRegionsAverageAQ(response) {
        var jsonResponse = $.parseJSON(response);
        if (jsonResponse === null) { } else {
            averageRegionsAQ.push(jsonResponse);
        }
    }

    for (var i = 0; i < allRegionsID.length; i++) {
        $.ajax({
            async: false,
            type: "GET",
            url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
            datatype: "json",
            success: addRegionsAverageAQ,
        });
    }

    var englandPromise = Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json');
    englandPromise.then(function (englandDataSource) {
        viewer.dataSources.add(englandDataSource);

        //Get the array of entities
        var englandEntities = englandDataSource.entities.values;

        for (var i = 0; i < englandEntities.length; i++) {
            //For each entity, create a random color based on the state name.
            var englandStr = englandEntities[i]._id;
            var englandRegionJsonId = englandStr.substring(8, 9);

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


            //Set the polygon material to our random color.
            englandEntity.polygon.material = color;
            //Remove the outlines.
            englandEntity.polygon.outline = false;

            if (englandEntity.polygon.extrudedHeight === undefined) {
                averageRegionsAQ.forEach(function (region) {
                    if (region.regionName === englandEntity._description) {
                        if (region.averageAirQuality !== null) {
                            englandEntity.airQuality = region.averageAirQuality;
                            englandEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                        }
                    }
                });
            }
        }
    });
}

function walesJson(Cesium, viewer) {
    $(document.getElementById("informationBox")).modal('hide');
    //Seed the random number generator for repeatable results.
    Cesium.Math.setRandomNumberSeed(0);

    var allRegionsID = [];
    var averageRegionsAQ = [];

    //gets all regions in the country Wales
    function addAllRegions(response) {
        var jsonResponse = $.parseJSON(response);
        var allRegions = jsonResponse.regions;
        if (allRegions === null) { } else {
            for (var i = 0; i < allRegions.length; i++) {
                allRegionsID.push(allRegions[i]);
            }
        }
    }

    $.ajax({
        async: false,
        type: "GET",
        url: "Php/getAllRegions.php?rc=1",
        datatype: "json",
        success: addAllRegions,
    });

    //gets average air quality for all regions in Wales
    function addRegionsAverageAQ(response) {
        var jsonResponse = $.parseJSON(response);
        if (jsonResponse === null) { } else {
            averageRegionsAQ.push(jsonResponse);
        }
    }

    for (var i = 0; i < allRegionsID.length; i++) {
        $.ajax({
            async: false,
            type: "GET",
            url: "Php/getRegionAverage.php?rid=" + allRegionsID[i].regionID,
            datatype: "json",
            success: addRegionsAverageAQ,
        });
    }

    var walesPromise = Cesium.GeoJsonDataSource.load('data/geo/walesRegions.json');
    walesPromise.then(function (walesDataSource) {
        viewer.dataSources.add(walesDataSource);

        //Get the array of entities
        var walesEntities = walesDataSource.entities.values;

        for (var i = 0; i < walesEntities.length; i++) {
            //For each entity, create a random color based on the state name.
            var walesStr = walesEntities[i]._id;
            var walesRegionJsonId = walesStr.substring(8, 9);

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

            //Set the polygon material to our random color.
            walesEntity.polygon.material = color;
            //Remove the outlines.
            walesEntity.polygon.outline = false;

            if (walesEntity.polygon.extrudedHeight === undefined) {
                averageRegionsAQ.forEach(function (region) {
                    if (region.regionName === walesEntity._description) {
                        if (region.averageAirQuality !== null) {
                            walesEntity.airQuality = region.averageAirQuality;
                            walesEntity.polygon.extrudedHeight = region.averageAirQuality * 1500;
                        }
                    }
                });
            }
        }
    });
}

function applyFilter(Cesium, viewer, england, wales, countyAverage, center) {
    $(document.getElementById("informationBox")).modal('hide');
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    if (countyAverage.checked) {
        if (england.checked) {
            viewer.camera.flyTo({
                destination: center,
                duration: 2
            });
            englandJson(Cesium, viewer);
        }
        if (wales.checked) {
            viewer.camera.flyTo({
                destination: center,
                duration: 2
            });
            walesJson(Cesium, viewer);
        }
        if (england.checked == false && wales.checked == false) {
            viewer.dataSources.removeAll();
            viewer.entities.removeAll();
            addCesiumPoints(Cesium, viewer);
            filterWarning();
        }
    } else {
        england.checked = false;
        wales.checked = true;
        countyAverage.checked = true;
        viewer.dataSources.removeAll();
        viewer.entities.removeAll();
        addCesiumPoints(Cesium, viewer);
        filterWarning();
    }
}

function resetFilter(Cesium, viewer, england, wales, countyAverage) {
    england.checked = false;
    wales.checked = true;
    countyAverage.checked = true;
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    addCesiumPoints(Cesium, viewer);
}