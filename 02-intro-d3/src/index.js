import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

// Créez 3 cercles de 40px de rayon et placez-les respectivement à : (50,50), (150,150), (250,250)
d3.select("body").append("div").attr("class", "monSVG");

const monSVG= d3.select(".monSVG")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)

const groupe1 = monSVG.append('g').attr('id', 'groupe1')
const groupe2 = monSVG.append('g').attr('id', 'groupe2')
const groupe3 = monSVG.append('g').attr('id', 'groupe3')

groupe1
    .append("circle")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40")
    .attr('id', 'firstCircle')
groupe1
    .append("text")
    .text("Cercle 1")
    .attr("x", "40")
    .attr("y", "120")

groupe2
    .append("circle")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40")
    .attr('id', 'secondCircle')
groupe2
    .append("text")
    .text("Cercle 2")
    .attr("x", "150")
    .attr("y", "210")

groupe3
    .append("circle")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40")
    .attr('id', 'thirdCircle')
groupe3
    .append("text")
    .text("Cercle 3")
    .attr("x", "250")
    .attr("y", "310")

// Changez la couleur du deuxième cercle
d3.select("#secondCircle").attr("fill", "red");

// Déplacez de 50px vers la droite le premier et le deuxième cercle
d3.select("#firstCircle").attr("cx", +d3.select("#firstCircle").attr("cx") + 50);
d3.select("#secondCircle").attr("cx", +d3.select("#secondCircle").attr("cx") + 50);

// Alignez verticalement les cercles en cliquant sur le dernier cercle
d3.select("#thirdCircle").on("click", function() {
    d3.select("#firstCircle").attr("cx", +d3.select("#thirdCircle").attr("cx"));
    d3.select("#secondCircle").attr("cx", +d3.select("#thirdCircle").attr("cx"));
})

// bar chart
// Vous avez à disposition les données suivantes: [20, 5, 25, 8, 15]

const data = [20, 5, 25, 8, 15]
const maxVal = d3.max(data)
//get actual fontsize
const fontSize = parseInt(d3.select("body").style("font-size"), 10);
d3.select("body").append("div").attr("class", "barChart");
const barChart = d3.select(".barChart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)

barChart.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 25)
    .attr("y", d =>  maxVal-d)
    .attr("width", 20)
    .attr("height", (d, i) => d)
    .attr("fill", "red")

//ajout du texte
barChart.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", (d, i) => i * 25)
    .attr("y", d =>  maxVal + fontSize )
    .attr("fill", "black")


