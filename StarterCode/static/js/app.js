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
d3.select('#selDataset').on('change', HoriBar);

function optionChanged() {
    let sub = d3.select('#selDataset').node().value

    // d3.event.preventDefault();

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

function HoriBar() {
    let sub = d3.select('#selDataset').node().value

    d3.event.preventDefault();

    d3.json('samples.json').then(data => {
        var hori = data.samples.filter(obj => obj.id == sub)[0];
        console.log(hori)
        var hor = d3.select('#bar');
        hor.html("")

        var ids = hori.otu_ids;
        var values = hori.sample_values;
        var labels = hori.otu_labels;

        var trace1 = {
        x: values,
        y: labels,
        text: labels,
        hover: ids,
        type: "bar",
        orientation: "h"
        }

        var data = [trace1];

        var layout = {
        title: `${hori} Top Ten Belly Button Microbes`,
        margin: {
            l:50,
            r:50,
            t:50,
            b:50,
            }
        }
        Plotly.newPlot("bar", data, layout);
        })

        
    }
    



