class Sensor {
    serialNumber;
    description;
    latitude;
    longitude;
    type;
    deploymentDate;
    minData;
    maxData;
    currentData
    currentStatus;

    /**
     * Instantiates a Sensor object
     * @param json Json object being passed from the API
     */
    constructor(json) {
        this.serialNumber = json.serialNumber;
        this.description = json.description;
        this.latitude = json.latitude;
        this.longitude = json.longitude;
        this.type = json.type;
        this.deploymentDate = json.deploymentDate;
        this.minData = json.minData;
        this.maxData = json.maxData;
        this.currentData = json.currentData;
        this.currentStatus = json.currentStatus;
    }
}