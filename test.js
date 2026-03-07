{/* <p class="flex items-center gap-2 bg-[#FEECEC] text-xs text-[#EF4444] py-1.5 px-3 rounded-full uppercase"> */}
                        {/* <img src="./assets/BugDroid.png"> */}
                        {/* ${data.labels[0]} */}
                        {/* </p> */}
                        {/* // label[1] */}
                        {/* ${getHtml(data.labels[1])} */}


function getHtml(labels) {
    const styles = {
        'bug':              'bg-[#FEECEC] text-[#EF4444]',
        'enhancement':      'bg-[#DCFCE7] text-[#16A34A]',
        'help wanted':      'bg-[#FDE68A] text-[#D97706]',
        'good first issue': 'bg-[#FDE68A] text-[#D97706]',
        'documentation':    'bg-[#EDE9FE] text-[#7C3AED]',
    }

    const icons = {
        'bug': './assets/BugDroid.png',
        'enhancement': './assets/Sparkle.png'
    }

    return labels.map((label) => {
        const style = styles[label.toLowerCase()] || 'bg-gray-100 text-gray-500'
        const icon = icons[label.toLowerCase()] || './assets/Vector.png'

        return `<p class="flex items-center gap-2 ${style} py-1.5 px-3 rounded-full uppercase">
                    <img scr="${icon}">
                    ${label}
                </p>`
    }).join('')
}

console.log(getHtml(['bug', 'enhancement']))