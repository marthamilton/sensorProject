function resetFilters(viewer, england, wales, scotland, northernIreland, countyAverage) {
    england.checked = false;
    wales.checked = false;
    scotland.checked = false;
    northernIreland.checked = false;
    countyAverage.checked = false;
    viewer.dataSources.removeAll();

}