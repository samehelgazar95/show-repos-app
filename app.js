// Let's Get Started
let theInput = document.querySelector(".get-repos input")
let getButton = document.querySelector(".get-repos span")
let reposData = document.querySelector(".show-data")

getButton.onclick = function () {
  getData()
}

theInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault()
    getData()
  }
})

function getData() {
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Write Github username!</span>"
  } else {
    
    reposData.innerHTML = ""

    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    
    .then ((response) => { 
      return response.json()
    })

    .then (
      (repos) => {
      let countDiv = document.createElement("div")
      countDiv.className = "counter"
      let firstSpan = document.createElement("span")
      let reposCount = document.createElement("span")
      reposCount.className = "counter-number"
      let reposCountText = document.createTextNode(repos.length)
      let firstSpanText = document.createTextNode("Repos Count")
      
      firstSpan.appendChild(firstSpanText)
      reposCount.appendChild(reposCountText)
      countDiv.appendChild(firstSpan)
      countDiv.appendChild(reposCount)
      reposData.appendChild(countDiv)

      repos.forEach((theRepo) => {
        let mainDiv = document.createElement("div")
        let firstDiv = document.createElement("div")
        let secondDiv = document.createElement("div")
        firstDiv.className = "first"
        secondDiv.className = "second"

        let repoNameSpan = document.createElement("span")
        let repoNameText = document.createTextNode(theRepo.name)
        repoNameSpan.appendChild(repoNameText)
        firstDiv.appendChild(repoNameSpan)

        let repoUrl = document.createElement("a")
        let urlText = document.createTextNode("Link")
        repoUrl.appendChild(urlText)
        repoUrl.href = theRepo.html_url
        repoUrl.setAttribute = ("target", "_blank")
        secondDiv.appendChild(repoUrl)

        let stars = document.createElement("span")
        stars.className = "stars-box"
        let starsText = document.createTextNode(`${theRepo.stargazers_count} Stars`)
        stars.appendChild(starsText)
        secondDiv.appendChild(stars)

        mainDiv.appendChild(firstDiv)
        mainDiv.appendChild(secondDiv)
        reposData.appendChild(mainDiv)
      })
    })
  }
}
// // ====================================================================================================================
// // ====================================================================================================================
// // ====================================================================================================================

// // !! Not related to the project just to explain those concepts >>> JSON - AJAX - Promise - Fetch

// // [1] First Example
// const getData = (apiLink) => {

//   return new Promise( (resolve, reject) => {
//     // (1)
//     let myRequest = new XMLHttpRequest()

//     // (2)
//     myRequest.onload = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         // console.log(this.responseText)
//         resolve(JSON.parse(this.responseText))
//       } else {
//         // console.log("ERRRROOOOORRRR")
//         reject(Error("No Data To Show"))
//       }
//     }

//     // (3)
//     myRequest.open("GET", apiLink)
//     myRequest.send()
//   })
//   }

// getData("https://api.github.com/users/elzerowebschool/repos").then(
//   (secondResult) => {
//     secondResult.length = 10
//     // console.log(secondResult)
//     return secondResult
//   }
// ).then(
//   (thirdResult) => {
//     console.log(thirdResult[0].name)
//   }
// ).catch(
//   (rej) => console.log(rej)
// )
// // ====================================================================================================================
// // ====================================================================================================================
// // [2] Second Example
// fetch("https://api.github.com/users/elzerowebschool/repos").then(
//   (result) => {
//     // console.log(result)
//     // Next Line is the main difference between the upper func and this func (fetch) 
//     let myData = result.json()
//     // console.log(myData)
//     return myData
//   }
// ).then(
//   (secondResult) => {
//     secondResult.length = 10
//     // console.log(secondResult)
//     return secondResult
//   }
// ).then(
//   (thirdResult) => {
//     console.log(thirdResult[0].name)
//   }
// ).catch(
//   () => console.log("URL is not valid")
// )

