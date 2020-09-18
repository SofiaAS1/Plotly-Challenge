function init() {

    d3.json('samples.json').then(data => {
        var names = data.names;
        var select = d3.select('#selDataset');

        d3.select("#selDataset").node().value = "";
        
        names.forEach(name => {
            select.append("option").text(name).property('value', name);
        });

     
    })
    
}

init()

d3.select('#selDataset').on("change", optionChanged);

function optionChanged() {
    let sub = d3.select('#selDataset').node().value

    d3.event.preventDefault();
    d3.json('samples.json').then(data => {
        var demo = data.metadata.filter(obj => obj.id == sub)[0];
        console.log(demo)
        var info = d3.select('#sample-metadata');
        info.html("")

        Object.entries(demo).forEach(([key, value]) => {
            info.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
    
}
