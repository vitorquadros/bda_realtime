import {
    ref,
    query,
    orderByChild,
    onChildAdded,
    off,
    endAt,
    endBefore,
    equalTo,
    startAt,
    startAfter,
    onValue,
    limitToFirst,
    limitToLast
} from "firebase/database"

function getOrderByChild(order,db,callback){
    //implement aqui
}

function getFilterByChild(filter,value, db,callback){
    //implement aqui
}

function getMostExpensive(db,setValue,list){
    // implement aqui
}

function getMostCheap(db,callback){
    //implemente aqui
}

function getPriceRange(value, db,callback){
    //implemente aqui
}

export {getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange}