// var sub = '940';

d3.select('#selDataset').on("click", handleSelect);

function handleSelect() {
    let sub = d3.select('#selDataset').node().value
    d3.event.preventDefault();
    d3.json('samples.json').then(data => {
        var names = data.names;
        var demo = data.metadata.filter(obj => obj.id = sub)[0];
        console.log(demo)
        // console.log(names);
        var select = d3.select('#selDataset');
        var info = d3.select('#sample-metadata');

        d3.select("#selDataset").node().value = "";
        
        names.forEach(name => {
            select.append("option").text(name).property('value', name);
        });

        Object.entries(demo).forEach(([key, value]) => {
            info.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
    
}
