import { getMessages } from "../../database/methods";

export async function getClassMessages(classID = localStorage.getItem("classID")) {
    try {
        localStorage.setItem('classID', classID);
        const messages = await getMessages();
        return orderByTimestamp(messages);
    }
    catch (err) {
        return [];
    }
}

function orderByTimestamp(items) {
    for (let i = 0; i < items.length; i++) {
        let latest = items[i], idx = i;
        for (let j = i + 1; j < items.length; j++) {
            if (items[j].createdAt.seconds > latest.createdAt.seconds ||
                (items[j].createdAt.seconds == latest.createdAt.seconds &&
                    items[j].createdAt.nanoseconds > latest.createdAt.nanoseconds)) {
                latest = items[j];
                idx = j;
            }
        }

        [items[i], items[idx]] = [items[idx], items[i]];
    }

    return items;
}
