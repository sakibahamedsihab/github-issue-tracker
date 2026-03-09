const allCardContainer = document.getElementById('all-card-container')
const allNavBtn = document.querySelectorAll('.navBtn')
const totalEl = document.querySelector('#total-issue')

const issueModal  = document.getElementById('issue-modal')
const modalContent = document.getElementById('modal-content')

let arrayDB = []

function totalCount(num) {
    totalEl.textContent = `${num} Issues`
}

function getHtmlForLabels(labels) {
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
function getHtmlForStatus(status) {
    const styles = {
        'open': 'bg-green-200 text-green-400',
        'closed': 'bg-purple-200 text-purple-400'
    }
    const style = styles[status.toLowerCase()]
    return `<p class="${style} py-1 px-2 rounded-md text-xs w-fit">
               ${status}
            </p>`


}
function getPriorityStyle(priority) {
    const styels = {
        'high': 'bg-[#EF4444] text-white',
        'medium': 'bg-[#D97706] text-white'
    }

    return styels[priority.toLowerCase()] || 'bg-gray-300 text-gray-600'
}

function getAssignee(assignee) {
    if(!assignee) {
        return 'Not Found'
    }
    return assignee
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
                    ${getHtmlForStatus(data.status)}
                    <span class="flex items-center flex-wrap gap-2">
                        ${getHtmlForLabels(data.labels)}
                    </span>
                </div>
                <hr class="text-gray-300">

                <div class="px-5 flex flex-col gap-2">
                    <h2 class="text-xs text-gray-400">#${data.id} by ${data.author}</h2>
                    <h2 class="text-xs text-gray-400" >${new Date(data.createdAt).toLocaleDateString()}</h2>
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


        div.addEventListener('click', () => {
            modalContent.innerHTML = `
                <h2 class="text-2xl font-bold">${data.title}</h2>

                            <div class="flex items-center gap-2">
                                ${getHtmlForStatus(data.status)}
                                <p class="text-xs text-gray-300">Opened by ${getAssignee(data.assignee)}</p>
                                
                                <p class="text-xs text-gray-300" >${new Date(data.createdAt).toLocaleDateString()}</p>
                            </div>
                            
                            <span class="w-fit flex flex-0 gap-2">
                            ${getHtmlForLabels(data.labels)}
                            </span>

                            <p class="flex-1 text-xs text-[#64748B]">${data.description}</p>

                            <div class="flex items-center justify-around bg-sky-50 p-2 rounded-md">
                                <span class="">
                                    <p class="text-gray-500">Assingee:</p>
                                    ${getAssignee(data.assignee)}
                                </span>

                                <span>
                                    <p class="text-gray-500">Priority:</p>
                                    <p class="text-xs py-1.5 px-4 rounded-full font-medium ${getPriorityStyle(data.priority)} capitalize">
                                    ${data.priority} Priority
                                    </p>
                                </span>
                            </div>
            `
            issueModal.showModal()
        })

        allCardContainer.appendChild(div)

    })
}



// console.log(arrayDB)
loadCard()