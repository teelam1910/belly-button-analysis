// Instructions
// Complete the following steps:

// Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.

// Use otu_ids as the labels for the bar chart.

// Use otu_labels as the hovertext for the chart.

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const optionChanged = async id => {
  
  // Test Subject ID No Dropdown Option
  let {names, metadata, samples} = await d3.json(url);

  if (id == undefined) {
    names.forEach(name => {
      d3.select('select').append('option').text(name);
    });
    
    id = names[0];
  };




  // Demographic
  let meta = metadata.find(dict => dict.id == id);
  d3.select('#sample-metadata').html('');
  Object.entries(meta).forEach(([key,val]) => {
    d3.select('#sample-metadata').append('h6').text(`${key.toUpperCase()}: ${val}`);
  });





  // Samples
  let sample = samples.find(sample => sample.id == id);

  // Make the bar chart desc order 
  let sortedSampleData = sample.sample_values
  .map((value, index) => ({ value, id: sample.otu_ids[index] }))
  .sort((a, b) => b.value - a.value);

  // Take first 10 sorted sample values and corresponding OTU IDs
  let sampleValues = sortedSampleData.slice(0, 10).map(data => data.value);
  let otuIds = sortedSampleData.slice(0, 10).map(data => `OTU ${data.id}`);

// console.log(samples);





  // Bar Chart
  let trace1 = {
    x: sampleValues,
    y: otuIds,   //removed otuIds.map(id => `OTU ${id}`),  was causing OTU to show twice
    type: "bar",
    orientation: "h"
  };

  let data1 = [trace1];
  Plotly.newPlot("bar", data1); //Show bar chart




  // Bubble Chart
  let trace2 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    mode: 'markers',
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids
    },
    text: sample.otu_ids.map((id, index) => `OTU ${id}: ${sample.otu_labels[index]}`) // Use OTU IDs as labels with OTU label text
  };
  
  let data2 = [trace2];
  
  let layout2 = {
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" } // Update y-axis title if needed
  };
  
  Plotly.newPlot('bubble', data2, layout2);

  



  // Gauge Chart


};


optionChanged();

