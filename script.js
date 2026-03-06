const allCardContainer = document.getElementById('all-card-container')
const allNavBtn = document.querySelectorAll('.navBtn')
let arrayDB = []

async function loadCard() {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const response = await fetch(url)
    const data = await response.json()
    arrayDB = data.data
    // render card
    // console.log(arrayDB)
    displayCard(arrayDB)

    allNavBtn.forEach((navBtn) => {
        navBtn.addEventListener('click', (e) => {
            allNavBtn.forEach((btn) => {
                btn.classList.remove('btn-primary')
            })
            navBtn.classList.add('btn-primary')

            // const filter = arrayDB.filter((Db) => (Db.status === e.target.textContent))
            console.log(e.target.textContent.toLowerCase())
            arrayDB.forEach((db) => {
                console.log(db.status.toLowerCase())
            })
        
        })
    })


}

function displayCard(dataList) {
    allCardContainer.innerHTML = ""
    

    dataList.forEach((data) => {
        const div = document.createElement('div')
        div.innerHTML = `
                 <div class="issue-card bg-white py-5 rounded-xl shadow-md space-y-3 flex flex-col h-full">
                <div class="flex justify-between px-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="#a855f7" stroke-width="2"/>
                        <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#a855f7" stroke-width="2" stroke-linecap="round"    stroke-linejoin="round"/>
                    </svg>
                    <span class="bg-[#FEECEC] text-xs text-[#EF4444] py-1.5 px-6 rounded-full">
                        ${data.priority}
                    </span>
                </div>

                <div class="px-5 flex flex-col gap-2">
                    <h2 class="text-[14px] font-semibold">${data.title}</h2>
                    <p class="flex-1 text-xs text-[#64748B]">${data.description}}</p>
                    <span class="flex gap-2">
                        <p class="bg-[#FEECEC] text-xs text-[#EF4444] py-1.5 px-3 rounded-full">${data.labels[0]}</p>
                        <p class="bg-[#FDE68A] text-xs text-[#D97706] py-1.5 px-3 rounded-full">${data.labels[1]}</p>
                    </span>
                </div>
                <hr class="text-gray-300">

                <div class="px-5 flex flex-col gap-2">
                    <h2 class="text-xs text-gray-400">#1 by ${data.author}</h2>
                    <h2 class="text-xs text-gray-400" >${data.updatedAt}</h2>
                </div>
            </div>
        `
        if(data.status === 'open') {
            div.classList.add('border-t-5', 'border-green-500', 'rounded-t-2xl')
        }
        else {
             div.classList.add('border-t-5', 'border-red-500', 'rounded-t-2xl')
        }
        allCardContainer.appendChild(div)

    })
}





console.log(arrayDB)
loadCard()