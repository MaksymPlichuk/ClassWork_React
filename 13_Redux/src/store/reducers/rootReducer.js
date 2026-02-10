import { combineReducers } from "@reduxjs/toolkit";
import { bookReducer } from "./bookReducer/bookReducer";
import { authorReducer } from "./authorReducer/authorReducer";

export const rootReducer = combineReducers({
    book: bookReducer,
    author: authorReducer
})