let cities;
d3.csv('cities.csv', d=>{
	return {
	  ...d, // spread operator
	  eu: d.eu==='true', // convert to boolean
	  population: +d.population,
	  x: +d.x,
	  y: +d.y,
	}
  }).then(data=>{
	  console.log('cities', data);
	  cities = data;
	  cities = cities.filter(cities => cities.eu === true);
	  console.log('cities', cities);

	  d3.select('.city-count').text("Number of Cities: 28");

	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
		.attr('height', height);
		
		svg.selectAll('circle')
		.data(cities)
		.enter()
		.append('circle')
		.attr('cx', (d,i)=>(i+1)*(d.x + 210)/25)
		.attr('cy', (d,i)=>(i+1.5)*(d.y + 110)/25)
		.attr('r', function(d){
			let rad;
			if (d.population < 1000000){ 
				rad = 4;}
		else{
			rad = 8;}
		return rad;
	})
		.attr('fill', '#b8d8be')
		.attr('opacity', d=>d.population)

		svg.selectAll('text')
			.data(cities)
			.enter()
			.append('text')
			.text(function(d){
				if(d.population >= 1000000)
				return d.city;
			})
			.attr('x', (d,i)=>(i+1)*(d.x + 210)/25)
			.attr('y', (d,i)=>(i+.8)*(d.y + 110)/25)
			.attr("text-anchor", "middle")
			.attr("font-size", "11");
  });

  let buildings;
  d3.csv('buildings.csv', d=>{
	  return {
		...d, // spread operator
		height_m: +d.height_m,
		height_ft: +d.height_ft,
		height_px: +d.height_px,
		floors: + d.floors
	  }
	}).then(data=>{
		console.log('buildings', data);
		buildings = data;
		buildings = buildings.sort(function (a,b) { return b.height_ft - a.height_ft;});
		console.log('buildings', buildings);
		const extent = d3.extent(buildings, d=>d.height_ft);
		console.log(buildings.length, extent);
		
		function display(selection){
			console.log("hello");
		}
	  const width = 500;
	  const height = 500;
	  const svg1 = d3.select('.building-plot')
		  .append('svg')
		  .attr('width', width)
		  .attr('height', height);
		  
		  svg1.selectAll('rect')
		  .data(buildings)
		  .enter()
		  .append('rect')
		  .attr('y', (d,i)=>(40*i+50))
		  .attr('x', (d,i)=>(180))
		  .attr('width', d=>250*d.height_ft/extent[1])
		  .attr('height', 30)
		  .attr('fill', 'teal')

		  .attr('class', 'bar')
		  .on("click", (d, i) =>{
			d3.select('.name').text(i.building);
		  d3.select('.height').text(i.height_ft);
		  d3.select('.city').text(i.city);
		  d3.select('.country').text(i.country);
		  d3.select('.floors').text(i.floors);
		  d3.select('.completed').text(i.completed);
		  d3.select('.image').attr("src", "img/" + i.image);
		  });

		  svg1.selectAll('text.labels')
			  .data(buildings)
			  .enter()
			  .append('text')
			  .text(function(d){
				  return d.building;
			  })
			  .attr('x', (d,i)=>(0))
			  .attr('y', (d,i)=>(40*i+62))
			  .attr("text-anchor", "left")
			  .attr("font-size", "11")

			  svg1.selectAll('text.values')
			  .data(buildings)
			  .enter()
			  .append('text')
			  .text(function(d){
				  let height = d.height_ft
				  return height + " " + "ft";
			  })
			  .attr('x',d=>175 + 250*d.height_ft/extent[1])
			  .attr('y', (d,i)=>(40*i+62))
			  .attr("text-anchor", "end")
			  .attr("font-size", "11")
			  .attr("fill", "white")


	});