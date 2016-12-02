export default function (state = null, action) {

    console.log("reducer-active-user");

    switch (action.type) {
        case "USER_SELECTED":
            return action.payload;
            break;
    }

    return state;
}
