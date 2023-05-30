export const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}

export const metaData = [
    {
        code: "kp",
        name: "Натяжение КП",
        unit: "H",
        normal: 9300
    },
    {
        code: "nt",
        name: "Натяжение НТ",
        unit: "H",
        normal: 14200
    },
    {
        code: "offset-kp",
        name: "Продольное смещение КП",
        unit: "мм",
        normal: 0
    },
    {
        code: "offset-nt",
        name: "Продольное смещение НТ",
        unit: "мм",
        normal: 0
    },
    {
        code: "sensor-ice",
        name: "Датчик гололеда",
        unit: "мм",
        normal: 10000
    },
    {
        code: "t",
        name: "Температура провода",
        unit: "°C",
        normal: 20
    },
    {
        code: "press",
        name: "Отжатие провода под фиксатором",
        unit: "мм",
        normal: 0
    },
    {
        code: "current",
        name: "Tок в точке подключения питающего фидера",
        unit: "А",
        normal: 14200
    }
]

export const typingData = (data) => {
    return data.map((item)=>{
        const msUTC = Date.parse(item.date)
        return {
            _id: item._id,
            ...item.data,
            time: msUTC
        }
    })
}


export const generateArray = (totalPages) => {
    let result = []
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result
}

export const genPages = (current, totalPage) => {
    const pages = generateArray(totalPage)
    const first = page => page === 1
    const middle = (page, between) => page > between.bet && page <= between.ween
    const last = page => page === totalPage

    const between = {
        bet: 0,
        ween: 0
    }
    if(current <= 2) {
        between.bet = 1
        between.ween = 3
    } else if(current > totalPage - 2) {
        between.bet = totalPage - 3
        between.ween = totalPage - 1
    } else {
        between.bet = current - 2
        between.ween = current + 1
    }
    const allPages = pages.filter(
        page => first(page) || middle(page, between) || last(page)
    )
    return addEtc(allPages)
}

export const addEtc = (pages) => {
    if(pages.length <= 1) {
        return pages
    }
    let lastPage = pages[pages.length - 1]
    let secondLast = pages[pages.length - 2]
    pages[0] + 1 !== pages[1] && pages.splice(1, 0, "...")
    lastPage !== secondLast + 1 && pages.splice(pages.length - 1, 0, "...")
    return pages
}

export const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

