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
  limitToLast,
} from "firebase/database";

function getOrderByChild(order, db, callback) {
  const refDB = ref(db, "produtos/");
  const consulta = query(refDB, orderByChild(order));
  onChildAdded(consulta, callback);
}

function getFilterByChild(filter, value, db, callback) {
  const refDB = ref(db, "produtos/");
  const consulta = query(refDB, orderByChild(filter), startAt(value));
  onChildAdded(consulta, callback);
}

function getMostExpensive(db, setValue, list) {
  const refDB = ref(db, "produtos/");

  const consulta = query(refDB, orderByChild("preco"));
  onChildAdded(consulta, (snapshot) => {
    list.unshift(snapshot.val());
    setValue([...list]);
  });

  console.table(Object.fromEntries(list));
  //   console.log([...list]);
}

function getMostCheap(db, callback) {
  const refDB = ref(db, "produtos/");
  const consulta = query(refDB, orderByChild("preco"));
  onChildAdded(consulta, callback);
}

function getPriceRange(value, db, callback) {
  const refDB = ref(db, "produtos/");

  const consulta = query(refDB, orderByChild("preco"), endAt(Number(value)));

  onChildAdded(consulta, (snapshot) => {
    console.log(snapshot.val().preco);
  });

  onChildAdded(consulta, callback);
}

export {
  getOrderByChild,
  getFilterByChild,
  getMostExpensive,
  getMostCheap,
  getPriceRange,
};
