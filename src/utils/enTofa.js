
export const enTofa = (status) => {

    const log = status
        .replace("انتظار", "pending")
        .replace("مصاحبه", "interview")
        .replace("رد شده", "declined")
    return log

}
