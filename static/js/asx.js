//get the end point/ json

const url_top_ten = ;

// Fetch the Json data and extract required data: sample_value, otu_ids and otu_labels

d3.json(url).then(function(data) {
    let all_sample_value = data.samples.map(sample => sample.sample_values);
    console.log(all_sample_value);
    let otu_ids = data.samples.map(sample => sample.otu_ids);
    console.log(otu_ids);
    let otu_labels = data.samples.map(sample => sample.otu_labels);
    console.log(otu_labels);

   
    //use these top 10 samples to populate the dropdown
    let names = data.names;
    addIdToDropdown(names);

    console.log(names)

    function addIdToDropdown(samples) {
        const dropdown = d3.select('#selDataset');
        samples.forEach(sample => {
            dropdown.append('option').attr('value', sample).text(sample);
        });
    }

    //Initial setup
    function init() {

        let initialSample = data.samples[0];
        let initialMetadata = data.metadata[0];

        plotBarChart(initialSample);
        displayMetadata({metadata: initialMetadata});
        plotBubbleChart(initialSample);
    }
    console.log(data.samples[0]);

    //create a function for the bar chart
    function plotBarChart(sample) {
        let x_values = sample.sample_values.slice(0,10).reverse(); // access only the top ten sample_values
        console.log(x_values);
        let y_values = sample.otu_ids.slice(0,10).reverse(); // access only the top ten otu_ids
        console.log(y_values);
        let labels = sample.otu_labels.slice(0,10).reverse();
        console.log(labels)

        let trace = {
            
                x: x_values,
                y: y_values.map(id => `OTU ${id}`),
                text: labels,
                type: 'bar',
                orientation: 'h'

            };
        
        let layout = {
            title: `Top 10 OTUs for sample ${sample.id}`,
            xaxis: {
                title: 'Sample Values'
            },

            yaxis: {
                title: 'OTU ID',
            }
        };

        let data = [trace];

        Plotly.newPlot('bar', data, layout);
    };

    //create the bubble chart
    function plotBubbleChart(sample) {
        let x_values = sample.otu_ids;
        let y_values = sample.sample_values;
        let marker_size = sample.sample_values;
        let marker_colors = sample.otu_ids;
        let text_values = sample.otu_labels;
    
        let trace = {
            x: x_values,
            y: y_values,
            text: text_values,
            mode: 'markers',
            marker: {
                size: marker_size,
                color: marker_colors,
                colorscale: 'Earth'  // You can adjust the colorscale as needed
            }
        };
        
    // set the layout of the bubble chart
        let layout = {
            title: `Bubble Chart for Sample ${sample.id}`,
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            }
        };
    
        let data = [trace];
    
        Plotly.newPlot('bubble', data, layout);
    }
    

    //Display MetaData
     function displayMetadata(sample) {
        const panel = d3.select('#sample-metadata');
        panel.html(''); // clears existing metadata
        panel.append('p').text(`id: ${sample.metadata.id}`);
        panel.append('p').text(`'Ethnicity: ${sample.metadata.ethnicity}`);
        panel.append('p').text(`gender: ${sample.metadata.gender}`);
        panel.append('p').text(`age: ${sample.metadata.age}`);
        panel.append('p').text(`Location: ${sample.metadata.location}`);
        panel.append('p').text(`bbtype: ${sample.metadata.bbtype}`);
        panel.append('p').text(`wfreq: ${sample.metadata.wfreq}`);


     }
    
    //create a function to update the chart each time a new id is selected from the drop_down
    function optionChanged(value) {
        let selectedId = data.samples.find(sample => String(sample.id) === String(value));
        let selectedMetada = data.metadata.find(meta => String(meta.id) === String(value));
        plotBarChart(selectedId);
        displayMetadata({metadata: selectedMetada});
        plotBubbleChart(selectedId);
    };

      // Attach the function to the window object to make it globally accessible
    window.optionChanged = optionChanged;
    
    init(); // initialise the chart
});




