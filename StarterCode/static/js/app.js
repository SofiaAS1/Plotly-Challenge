var init = '940';

d3.json('samples.json').then(data => {
    // console.log(data);
    var names = data.names;
    var demo = data.metadata.filter(obj => obj.id == init)[0];
    console.log(demo)
    // console.log(names);
    var select = d3.select('#selDataset');
    var info = d3.select('#sample-metadata');

names.forEach(name => {
    select.append("option").text(name).property('value', name);
});

Object.entries(demo).forEach(([key, value]) => {
    info.append("h6").text(`${key.toUpperCase()}: ${value}`)
})
nam = names;

})
