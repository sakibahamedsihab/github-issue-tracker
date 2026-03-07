const allCardContainer = document.getElementById('all-card-container')
const allNavBtn = document.querySelectorAll('.navBtn')
const totalEl = document.querySelector('#total-issue')
let arrayDB = []

function totalCount(num) {
    totalEl.textContent = `${num} Issues`
}

function getHtml(labels) {
   const styles = {
    'bug': 'bg-[#FECACA] text-[#EF4444]',
    'enhancement': 'bg-[#BBF7D0] text-[#00A96E]'
   }

   const icons = {
    'bug': './assets/BugDroid.png',
    'enhancement': './assets/Sparkle.png'
   }

   return labels.map((label) => {
    const style = styles[label.toLowerCase()] || 'bg-[#FDE68A] text-[#D97706]'
    const icon = icons[label.toLowerCase()] || './assets/Vector.png'

    return `<p class="flex items-center gap-2 ${style} py-1.5 px-3 rounded-full uppercase text-xs">
                <img src="${icon}">
                ${label}
            </p>`
   }).join('')
}

async function loadCard() {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const response = await fetch(url)
    const data = await response.json()
    arrayDB = data.data
    // render card
    // console.log(arrayDB)
    displayCard(arrayDB)
    totalCount(arrayDB.length)
    // navbar active state and tab filter
    allNavBtn.forEach((navBtn) => {
        navBtn.addEventListener('click', (e) => {
            allNavBtn.forEach((btn) => btn.classList.remove('btn-primary'))
            navBtn.classList.add('btn-primary')

            const btnText = e.target.textContent.toLowerCase()
            if(btnText === 'all') {
                displayCard(arrayDB)
                totalCount(arrayDB.length)
            }
            else {
                displayCard(arrayDB.filter((db) => db.status === btnText))
                totalCount((arrayDB.filter((db) => db.status === btnText).length))
            }
        })
    })

    // totalCount(arrayDB)

}

function displayCard(dataList) {
    allCardContainer.innerHTML = ""
    

    dataList.forEach((data) => {
        const div = document.createElement('div')
        div.innerHTML = `
                 <div class="issue-card bg-white py-5 rounded-xl shadow-md space-y-3 flex flex-col h-full">
                <div class="flex justify-between px-5">
                    <img id="closed" src="./assets/Closed- Status .png">
                    <img id="open" src="./assets/Open-Status.png">
                    <span id="${data.priority}" class="text-xs py-1.5 px-6 rounded-full">
                        ${data.priority}
                    </span>
                </div>

                <div class="px-5 flex flex-col flex-1 gap-2">
                    <h2 class="text-[14px] font-semibold">${data.title}</h2>
                    <p class="flex-1 text-xs text-[#64748B]">${data.description}</p>
                    <span class="flex items-center flex-wrap gap-2">
                        ${getHtml(data.labels)}
                    </span>
                </div>
                <hr class="text-gray-300">

                <div class="px-5 flex flex-col gap-2">
                    <h2 class="text-xs text-gray-400">#1 by ${data.author}</h2>
                    <h2 class="text-xs text-gray-400" >${data.updatedAt}</h2>
                </div>
            </div>
        `


        // adding challange task
        const openEl = div.querySelector('#open')
        const closeEl = div.querySelector('#closed')


        if(data.status === 'open') {
            div.classList.add('border-t-5', 'border-green-500', 'rounded-t-2xl')
            openEl.classList.remove('hidden')
            closeEl.classList.add('hidden')
        }
        else {
             div.classList.add('border-t-5', 'border-[#A855F7]', 'rounded-t-2xl')
             openEl.classList.add('hidden')
             closeEl.classList.remove('hidden')
        }

        // update the priority
        if(data.priority === 'high') {
            const highEl = div.querySelector('#high')
            highEl.classList.add('bg-[#FEECEC]', 'text-[#EF4444]')            
        }
        else if(data.priority === 'medium') {
            const mediumEl = div.querySelector('#medium')
            mediumEl.classList.add('bg-[#FFF6D1]', 'text-[#F59E0B]')
        }
        else {
            const lowEl = div.querySelector('#low')
            lowEl.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]')
        }

        allCardContainer.appendChild(div)

    })
}



// console.log(arrayDB)
loadCard()