import React from 'react'
import Plot from 'react-plotly.js';

export default function graph(props) {
    return (
        <div>
             <Plot useResizeHandler={true}
            data={[
              {
                x: props.xaxis,
                y: props.yaxis,
                type: 'scatter',
                fill: 'tozeroy',
                mode: 'lines+markers',
                marker: {gradient: { type:"vertical",
                                    color: "white",
                                    },
                         color: "green"
                                },
                        
              }
              
            ]}
            layout={{
                plot_bgcolor:"#26282E",
                paper_bgcolor:"#26282E",
                autosize: true,
                xaxis:{
                    zerolinecolor: '#ffffff',
                    linecolor: '#ffffff',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#ffffff'
                    }
                    
                },
                yaxis:{
                    range:[200, 600],
                    zerolinecolor: '#ffffff',
                    linecolor: '#ffffff',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#ffffff'
                    }
                }
            }}
          />
        </div>
    )
}
