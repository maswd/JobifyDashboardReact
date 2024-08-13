
export const faToen = (status) => {

    const log = status
        .replace("pending", "انتظار")
        .replace("interview", "مصاحبه")
        .replace("declined", "رد شده")
    return log

}
