import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import LoadingScreen from '../Main Components/LoadingScreen';

function ClottingLevels() {
   //factors affecting clotting levels:
   const [latestBloodClot, setLatestBloodClot]= useState(null);
   const [age, setAge] = useState(0);
   const [sex, setSex] = useState("");
   const [genetics, setGenetics] = useState("");
   const [medicalCondition, setMedicalCondition] = useState("");
   const [medications, setMedications] = useState("");
   const [diet, setDiet] = useState("");
   const [loading, setLoading] = useState(true);
   const [nextPage, setNextPage] = useState(false);
   const [prevPage, setPrevPagge] = useState(false);

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/HaemophiliaLabResults");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/BloodTest");
    setPrevPagge(true);
  }

 
  
   const svgRef = useRef();
   
     //retriveing the blood clot period from bleeding data:
     useEffect(()=>{
      const storedBleedLogs = JSON.parse(localStorage.getItem("bleedingLogs") || "[]");
      localStorage.setItem("age", age); //saving the age bc I'm gonna reu-use this value to for other health issues 
      const timerDelay = setTimeout(()=>{
        setLoading(false);
       }, 2000)
      if(storedBleedLogs.length > 0){
       const lastBloodClotEntry = storedBleedLogs[storedBleedLogs.length - 1] //getting the selected option from the drop down
       const clottingPeriod = lastBloodClotEntry.bloodClot;
       setLatestBloodClot(clottingPeriod);
       console.log(clottingPeriod);
        }
        return () => clearTimeout(timerDelay);
     }, []);

     if(loading){
      return <LoadingScreen/>
     }

    

  //here i want to create an impact score scaling based on the answers to the factors that affect clotting that users log in
     function calculateImpactScores(){
      return {
        Age: age > 60 ? 8 : age > 40 ? 5 : 2, //impact based on age scaling
        Sex: sex === 'Female' ? 4 : 2,
        Genetics: genetics ? 9 : 2,
        "Medical Condi" : medicalCondition ? 7 : 2,
        Medications: medications.toLowerCase().includes("blood thinner") ? 9 : 4,
        Diet: diet.toLowerCase().includes("vitamin K") ? 2 : 6,
      };

     }

     function getColor(value){
      if(value <= 3) return "green";
      if(value <= 6) return "yellow";
      if(value >= 7) return "red"; 
     }

     //I'm creating a chart based visualisaton to showcase the impact of different clotting factors on the person's overall clotting levels:
      function renderChart(){
    
        //check if al the fields have been filled in first:
        if(!age || !sex || !genetics || !medicalCondition || !medications || !diet || !latestBloodClot){
          alert("Please log in the factors that affect clotting levels to be able to generate a clotting levels chart");
          return
        }
        const scores = calculateImpactScores();
        const data = Object.entries(scores).map(([label, value])=> ({label, value}));

        //the chart dimensions:
        const width = 600;
        const height = 300;
        const margin = {top: 30, right: 30, bottom: 50, left: 40};


        //creating svg:
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); //if there's any previous charts

        //creatog scales:
        const xScale = d3.scaleBand()
          .domain(data.map(d=> d.label))
          .range([margin.left, width - margin.right])
          .padding(0.2);

        const yScales = d3.scaleLinear()
        .domain([0, 10])
        .range([height - margin.bottom, margin.top])

        svg.attr("width", width).attr("height", height);

        //chart title:
        svg.append("text")
        .attr("x", width/2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFEBD7")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .text("Clotting Levels impact by Factors");


        //creating the X-Axis:
        svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

        //creating the Y-Axis:
        svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScales));

         // Legend / Color key:
        const legendData = [
         { color: "green", label: "Low Impact"},
         { color: "yellow", label: "Medium Impact" },
         { color: "red", label: "High Impact" },
          ];

         const legend = svg.selectAll(".legend")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (_, i) => `translate(10, ${i * 20 + 40})`);

        legend.append("rect")
        .attr("x", width - 150)
        .attr("width", 15)
        .attr("height", 15)
        .attr("border-radius", 15)
        .attr("fill", d => d.color);

        legend.append("text")
         .attr("x", width - 130)
         .attr("y", 12)
         .attr("font-size", "12px")
         .attr("fill", "#FFEBD7")
         .text(d => d.label);

        //Designing Bars:
        const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#35136F")
        .style("color", "#FFEBD7")
        .style("padding", "6px 10px")
        .style("border-radius", "8px")
        .style("opacity", "0")
        .style("pointer-events", "none")

        svg.selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x",d => xScale(d.label))
         .attr("y",d=> yScales(d.value))
         .attr("width", xScale.bandwidth())
         .attr("height", d => yScales(0) - yScales(d.value))
         .attr('fill', d => getColor(d.value))
         .on('mouseover', (event, d) => {
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.html(`<strong>${d.label}</strong>: ${d.value}<br/>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(300).style('opacity', 0);
      });
      }

  return (
    <div className='clottingLevels-Container'>
       <h2 className='subheading'>Clotting factors data entry:</h2><br/>
      <p className='content'>Based on your bleeding data, it took {latestBloodClot} for your blood to clot.</p><br/>
      <p className='content'> Please fill in the following fields that also affect your blood clotting ability to generate a specific coagulation test:</p>
      <label className='content'> 1. How old are you ?:</label><br /><br />
      <input type='number' min= "0" className='setUp' value={age} onChange={(d)=> setAge(d.target.value)} required/>
      <br /><br />
      <label className='content'>2. Please select your sexual orientiation:</label><br /><br />
      <select value={sex} className='setUp' onChange={(s)=> setSex(s.target.value)}>
        <option value="">Select Sexual Orientation below:</option>
        <option value= "Male">Male</option>
        <option value= "Female">Female</option>
      </select>
       <br /><br />
      <label className='content'>3. Please select a genetic condition(s) you have (if any):</label><br/><br/>
      <select value={genetics} className='setUp' onChange={(g)=> setGenetics(g.target.value)}>
        <option value="">Select a genetic condition below:</option>
        <option value= "Fibrinogen deficiency">Fibrinogen deficiency</option>
        <option value= "Von Willebrand disease">Von Willebrand disease</option>
        <option value= "Haemophilia">Haemophilia</option>
        <option value= "Factor V Leiden thrombophilia">Factor V Leiden thrombophilia</option>
        <option value= "Protein C &  Protein S deficiency">Protein C and Protein S deficiency</option>
      </select>
      <br /><br />

      <label className='content'>4. Please select  other Medical Condition(s) you have (if any):</label><br /><br />
      <select value={medicalCondition} className='setUp' onChange={(m)=> setMedicalCondition(m.target.value)}>
        <option value="">Select medical condition below:</option>
        <option value= "lung disease">Lung Disease</option>
        <option value="kidney disease">Kidney Disease</option>
        <option value= "liver disease">Liver Disease</option>
        <option value= "None">None</option>
      </select>
      <br /><br />
      < label className='content'>5. Please specify which kind of medications you take?</label><br /><br />
      <input type='text' value={medications} placeholder='Medications like blood thinners, red blood cells pills etc.' className='setUp' onChange={(m)=> setMedications(m.target.value)}/>
      <br /><br />
      <label className='content'>6. Please explain your diet intake :</label><br/><br/>
      <input value={diet} type='text' placeholder='Include foods rich in Vitamin K' className='setUp' onChange={(d)=> setDiet(d.target.value)}/>
      <br />
      <button onClick={renderChart} className='clotting-Chart-Btn'> Generate Clotting Levels Chart </button>
      <svg ref={svgRef}></svg>
      <br/><br/>
      <button onClick={GoBack} className='prevBtn'>Previous</button>

      <button onClick={NavigateNextPage} className='nextButton'>Next</button>
    </div>
  );
};
export default ClottingLevels;
