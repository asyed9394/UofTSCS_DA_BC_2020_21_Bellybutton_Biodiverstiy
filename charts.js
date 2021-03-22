function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Create a variable that holds the samples array. 
    var sampleNames = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = sampleNames.filter(sampleObj => sampleObj.id == sample);

      console.log(filteredSamples);
    // Create a variable that holds the first sample in the array.
    var filteredArray = [filteredSamples[0]];
    console.log(filteredArray);
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    //first create new array that has three columns, then sort in desc order and then slice 10 

    var sortedOtuData = filteredArray.sort((a,b) => 
        a.sample_values - b.sample_values).reverse(); 
    console.log(sortedOtuData);
      
    var otuIds = sortedOtuData[0].otu_ids.slice(0,10);
    var otuLabels = sortedOtuData[0].otu_labels.slice(0,10)
    var otuSampleValues = sortedOtuData[0].sample_values.slice(0,10);
    
    console.log(otuIds);
    console.log(otuLabels);
    console.log(otuSampleValues);

    //console.log(otuId);

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last. 

    //var yticks = 

    // Create the trace for the bar chart. 
    //var barData = [
      
    //];
    // Create the layout for the bar chart. 
    //var barLayout = {
     
   // };
    // Use Plotly to plot the data with the layout. 

    // 1. Create the trace for the bubble chart.
   // var bubbleData = [
   
  //  ];

    // 2. Create the layout for the bubble chart.
  //  var bubbleLayout = {
      
   // };

    // 3. Use Plotly to plot the data with the layout.
    
  });
}