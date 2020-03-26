function resetFilters(viewer, england, wales, scotland, northernIreland, countyAverage) {
    england.checked = false;
    wales.checked = false;
    scotland.checked = false;
    northernIreland.checked = false;
    countyAverage.checked = false;
    viewer.dataSources.removeAll();

}

function englandJson(Cesium) {
    //Seed the random number generator for repeatable results.
    Cesium.Math.setRandomNumberSeed(0);

    var promise = Cesium.GeoJsonDataSource.load('data/geo/englandRegions.json');
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);

        //Get the array of entities
        var entities = dataSource.entities.values;

        var colorHash = {};

        for (var i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            var str = entities[i]._id;
            var regionJsonId = str.substring(8, 9);

            switch (regionJsonId) {
                case "1":
                    entities[i]._name = "2857";
                    entities[i]._description = "North East";
                    break;
                case "2":
                    entities[i]._name = "8675";
                    entities[i]._description = "North West";
                    break;
                case "3":
                    entities[i]._name = "1264";
                    entities[i]._description = "Yorkshire and The Humber";
                    break;
                case "4":
                    entities[i]._name = "7657";
                    entities[i]._description = "East Midlands";
                    break;
                case "5":
                    entities[i]._name = "5431";
                    entities[i]._description = "West Midlands";
                    break;
                case "6":
                    entities[i]._name = "1865";
                    entities[i]._description = "Eastern";
                    break;
                case "7":
                    entities[i]._name = "9783";
                    entities[i]._description = "London";
                    break;
                case "8":
                    entities[i]._name = "6758";
                    entities[i]._description = "South East";
                    break;
                case "9":
                    entities[i]._name = "1587";
                    entities[i]._description = "South West";
                    break;
                default:
                    entities[i]._name = "undefined";
                    entities[i]._description = "undefined";
                    break;
            }

            var entity = entities[i];
            var name = entity._id;
            var color = colorHash[name];
            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha: 1.0
                });
                colorHash[name] = color;
            }

            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = false;

            if (entities[i].name === "undefined" || entities[i]._description === "undefined") {} else {
                if (entities[i].polygon.extrudedHeight === undefined) {
                    $.ajax({
                        async: true,
                        type: "GET",
                        url: "Php/getRegionAverage.php?rid=" + entities[i]._name,
                        datatype: "json",
                        success: function(data) {
                            var sensorData = $.parseJSON(data);
                            if (sensorData.regionName === null || sensorData.averageAirQuality === null) {} else {
                                var jsonEntities = dataSource.entities.values;
                                for (var i = 0; i < jsonEntities.length; i++) {
                                    if (jsonEntities[i]._description === sensorData.regionName) {
                                        jsonEntities[i].polygon.extrudedHeight = sensorData.averageAirQuality * 1500;
                                        console.log("setting json colour");
                                    } else {
                                        //entities[i].polygon.extrudedHeight = 0;
                                    }
                                }
                            }
                        }
                    });
                }

            }
            //var cesiumSensors = viewer.entities._entities._array;

            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.
            //entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
        }
    });

}