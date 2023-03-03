import * as d3 from 'd3'

const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const userUrl = 'https://jsonplaceholder.typicode.com/users'

const getPosts = async () => {
    return d3.json(postsUrl)
}

const getUsers = async () => {
    return d3.json(userUrl)
}

const dataArray = async () => {
    const posts = await getPosts()
    const users = await getUsers()
    const data = []
    users.forEach(user => {
        const userPosts = posts.filter(post => post.userId === user.id)
        const userPostsTitles = userPosts.map(post => post.title)
        const userObject = {
        nom_utilisateur: user.username,
        ville: user.address.city,
        nom_companie: user.company.name,
        titres_posts: userPostsTitles
        }
        data.push(userObject)
    })
    return removeRandomPost(data)
}

const removeRandomPost = async (data) => {
    const randomNumber = Math.floor(Math.random() * 100)
    for (let i = 0; i < randomNumber; i++) {
        const randomUser = Math.floor(Math.random() * data.length)
        const randomPost = Math.floor(Math.random() * data[randomUser].titres_posts.length)
        data[randomUser].titres_posts.splice(randomPost, 1)
    }
    return data
}

//Calculez le nombre de posts par user
const postsByUser = async (data) => {
    return data.map(user => {
        return {
            nom_utilisateur: user.nom_utilisateur,
            nombre_posts: user.titres_posts.length
        }
    })
}

//Trouvez le user qui a écrit le texte le plus long dans posts.body avec d3.max
const longestPost = async (data) => {
    const postsLength = data.map(user => {
        return {
            nom_utilisateur: user.nom_utilisateur,
            nom_companie: user.nom_companie,
            ville: user.ville,
            longueur_posts: d3.max(user.titres_posts.map(post => post.length))
        }
    })
    return postsLength.filter(user => user.longueur_posts === d3.max(postsLength.map(user => user.longueur_posts)))
}

//Affichez le résultat dans le DOM
const displayData = async () => {
    const data = await dataArray()
    const postsByUserArray = await postsByUser(data)
    const longestPostArray = await longestPost(data)
    const container = d3.select('body')
        .append('div')
    container.selectAll('p')
        .data(postsByUserArray)
        .enter()
        .append('p')
        .text(d => `User ${d.nom_utilisateur} : ${d.nombre_posts}`)
    const container2 = d3.select('body')
        .append('div')
    container2.selectAll('p')
        .data(longestPostArray)
        .enter()
        .append('p')
        .text(d => `User ${d.nom_utilisateur} wrote the longest post with a length of ${d.longueur_posts}`)

    const svg = d3.select('body')
        .append('svg')
        .attr('width', 1000)
        .attr('height', 1000)

    const xScale = d3.scaleBand()
        .domain(postsByUserArray.map(user => user.nom_utilisateur))
        .range([0, 900])
        .padding(0.1)

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(postsByUserArray.map(user => user.nombre_posts))])
        .range([500, 0])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const group = svg.append('g').attr('transform', 'translate(30, 50)')

    group.append('g')
        .attr('transform', 'translate(0, 500)')
        .call(xAxis)

    group.append('g')
        .call(yAxis)

    group.selectAll('rect')
        .data(postsByUserArray)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.nom_utilisateur))
        .attr('y', d => 500 - yScale((d3.max(postsByUserArray.map(user => user.nombre_posts))-d.nombre_posts)))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale((d3.max(postsByUserArray.map(user => user.nombre_posts))-d.nombre_posts)))
        .attr('fill', 'blue')


}

displayData()