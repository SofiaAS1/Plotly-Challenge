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

    d3.json('samples.json').then(data => {
        var demo = data.metadata.filter(obj => obj.id == sub)[0];
        var info = d3.select('#sample-metadata');
        info.html("")

        Object.entries(demo).forEach(([key, value]) => {
            info.append("h6").text(`${key.toUpperCase()}: ${value}`);
        })
    })
    
    HoriBar();
    BubbleBar();
}

function HoriBar() {
    let sub = d3.select('#selDataset').node().value

    d3.event.preventDefault();

    d3.json('samples.json').then(data => {
        var hori = data.samples.filter(obj => obj.id == sub)[0];
        var hor = d3.select('#bar');
        hor.html("")

        var ids = hori.otu_ids;
        var sample_values = hori.sample_values;
        var values =sample_values.slice(0, 10).reverse();
        var labels = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var otu_labels = hori.otu_labels;
        var hover = otu_labels.slice(0, 10).reverse()

        // console.log(hover)

        var trace1 = {
        x: values,
        y: labels,
        text: hover,
        hoverinfo: 'text',
        type: "bar",
        orientation: "h",
        }

        var data = [trace1];

        var layout = {
        title: `Test Subject ID No. ${hori.id}'s Top 10 Belly Button Microbes`,
        hovermode: 'closest',
        margin: {
            l:75,
            r:75,
            t:75,
            b:75,
            }
        }

        Plotly.newPlot("bar", data, layout);

        })

    }
    
    function BubbleBar() {
        let sub = d3.select('#selDataset').node().value
    
        d3.event.preventDefault();
    
        d3.json('samples.json').then(data => {
            var Bubb = data.samples.filter(obj => obj.id == sub)[0];
            var bub = d3.select('#Bubble');
            bub.html("")
    
            var ids = Bubb.otu_ids;
            var values = Bubb.sample_values;
            var otu_labels = Bubb.otu_labels;
            var max_mark_size = 160;
    
            var trace1 = {
            x: ids,
            y: values,
            text: otu_labels,
            hoverinfo: 'text',
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: values,
                sizemode: 'area',
                sizeref: 2.0 * Math.max(...values)/ max_mark_size**2,
                color: ids,
                colorscale: 'Earth',
                cmin: 0,
                cmax: 4000,
            }
            }
    
            var data = [trace1];
    
            var layout = {
            title: `Test Subject ID No. ${Bubb.id}'s Belly Button Microbes`,
            xaxis: {title: 'OTU ID'},
            hovermode: 'closest',
            showlegend: false,
            height: 600,
            width: 1200,
            }

            Plotly.newPlot("Bubble", data, layout);

            })
    
            
        }

        

