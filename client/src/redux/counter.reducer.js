// counter.reducer.js
// Action Types
const SET_CW = "SET_CW";
const initialState = {
    number: "Connect Wallet",
};

export default function counter(state = initialState, action) {

    switch (action.type) {
        case SET_CW:
            return {
                ...state,
                number: action.number
            };

        default:
            return state;
    }
};