export const baseRequest = async (host, param) => {
    if (!param) {
        let res = await fetch(host)
        if (!res.ok) {
            throw new Error('Query error')
        } else {
            return await res.json()
        }
    }
    else {
        let res = await fetch(`${host}?term=${param}`)
        if (!res.ok) {
            throw new Error('Query error')
        } else {
            return await res.json()
        }
    }
}