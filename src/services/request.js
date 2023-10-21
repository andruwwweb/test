export const HOST = 'http://localhost:3000'

export const baseRequest = async (host, param) => {
    if (!param) {
        let res = await fetch(host, {method: "GET"})
        if (!res.ok) {
            throw new Error('Query error')
        } else {
            return res.json()
        }
    }
    else {
        let res = await fetch(`${host}?term=${param}`, {method: "GET"})
        if (!res.ok) {
            throw new Error('Query error')
        } else {
            return res.json()
        }
    }
}