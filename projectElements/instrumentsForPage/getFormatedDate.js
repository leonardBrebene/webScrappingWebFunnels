
const getFormatedDate =  () => {

    const fileName = new Date(Date.now() + 2 * 3600 * 1000).toISOString().replace(':', '-').replace(':', '-').slice(0, 19)
    return fileName.toString()
}
export default getFormatedDate;