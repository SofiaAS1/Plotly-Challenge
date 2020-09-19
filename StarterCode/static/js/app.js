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
        var values = hori.sample_values
        // var svaluess = svalues.sort((a, b) => b.sample_values - a.sample_values);
        // var valuess = svaluess.slice(0,10);
        // var values = valuess.reverse();
        var otu_labels = hori.otu_labels;
        var labels = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var trace1 = {
        x: values.slice(0, 10).reverse(),
        // y: values.map(object => object.otu_ids),
        y: labels,
        // text: values.map(object => object.otu_ids),
        text: ids,
        hover: labels,
        // hover: values.map(object => object.otu_labels),
        type: "bar",
        orientation: "h",
        }

        var data = [trace1];

        var layout = {
        title: `${hori.id}'s Top Ten Belly Button Microbes`,
        // xaxis: { title:"placeholder"},
        // yaxis: { title:"OTU"},
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
    



