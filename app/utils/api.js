const axios=require('axios');
const id='f8696cfd9f7820a326c2';
const sec='20cffcccee9af88780d107e106670c67a8bcd520';
const params= `?client_id=${id}&client_secrect=${sec}`;


function getProfile(username){
    return axios.get(`https://api.github/users/${username}${params}`)
    .then((user)=>{
        return user.data;
    });
}
function getRepos(username){
    return axios.get(`https://api.github/users/${username}/repos${params}&per_page=100`);
}
 function getStartCount(repos){
     return respos.data.reduce((count,repo)=>{
         return count+respo.stargazers_count;
     },0);
 }

function calculateScore(profile,repos){
    const followers=profile.followers;
    const totalStarts=getStartCount(repos);

    return(followers*3)+ totalStarts;
}

function handleError(error){
    console.warn(error);
    return null;
}
function sortPlayers(players){
    return players.sort((a,b)=>{
        return b.score - a.score;
    });
}
function getUserData(player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data)=>{
        const profile=data[0];
        const repos=data[1];
        return{
            profile,
            score:calculateScore(profile,repos)
        }
    });
}

module.exports = {
  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: function(language) {
    let encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

      return axios.get(encodeURI)
        .then((response) => {
          return response.data.items;
        });
  }
}
