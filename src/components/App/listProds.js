import React, { useState, useEffect } from 'react';
import {
    getOrderByChild,
    getFilterByChild,
    getMostExpensive,
    getMostCheap,
    getPriceRange
} from '../Firebase/ProdutosDao';
import { TableProds } from './tableProds';

function ListProds(props) {

    const prods = []
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [order, setOrder] = useState('id_prod')
    const [filter, setFilter] = useState('nome')
    const [priceRange, setPriceRange] = useState(20000)
    const filterNames = {
        'id_prod': 'ID',
        'preco': 'Preço',
        'qtd_estoque': 'Quantidade em Estoque'
    }

    useEffect(() => {
        loadProdsFb()
    }, [order, filter])

    function loadProdsFb() {
        getOrderByChild(order, props.firebase.db, receiveProds)
        console.log({'ordenar':order})
    }

    function receiveProds(snap) {
        if (snap.exists()) {
            prods.push({ 'id': snap.key, ...snap.val() })
            console.log({"produto":{ 'id': snap.key, ...snap.val()}})
            setData([...prods])
        }
    }

    const handlerSelectOrder = (event) => {
        setOrder(event.target.value)
    }

    const handlerSelectFilter = (event) => {
        setFilter(event.target.value)
    }

    const handlerApplyFilter = () => {
        prods.length = 0;
        setData([...prods])
        setInterval(() => setLoad(false), 3000)
        const termo = document.getElementById('termo').value
        getFilterByChild(filter, termo, props.firebase.db, receiveProds)
    }

    const handlerMostExpensive = () => {
        prods.length = 0;
        setData([...prods])
        getMostExpensive(props.firebase.db, setData, prods)
    }

    const handlerMostCheap = () => {
        prods.length = 0;
        setData([...prods])
        getMostCheap(props.firebase.db, receiveProds)
    }

    const handlerPriceRange = (event) => {
        prods.length = 0;
        setData([...prods])
        setPriceRange(event.target.value)
        if (event.target.value == 0) setLoad(false)
        getPriceRange(priceRange, props.firebase.db, receiveProds)
    }

    return (<>
        <div>Ordenar por:
            <select name='order' onChange={handlerSelectOrder}>
                <option value={'id_prod'} selected={((order === 'id_prod') ? true : false)} >ID</option>
                <option value={'preco'} selected={((order === 'preco') ? true : false)}>Preco</option>
                <option value={'qtd_estoque'} selected={((order === 'qtd_estoque') ? true : false)}>Quantidade</option>
                <option value={'nome'} selected={((order === 'nome') ? true : false)}>Nome</option>
            </select>
            &nbsp;|&nbsp;Filtrar por:
            <select name='field' onChange={handlerSelectFilter}>
                <option value={'nome'} selected={((filter === 'nome') ? true : false)} >Nome</option>
                <option value={'descricao'} selected={((filter === 'descricao') ? true : false)}>Descricao</option>
            </select>
            &nbsp;|&nbsp;Termo de filtro: <input id='termo' placeholder='Digite o termo' onChange={handlerApplyFilter} />
            <button onClick={handlerApplyFilter}>Filtrar</button>
            <br />
            <button onClick={handlerMostExpensive}>Mais Caros</button>
            <button onClick={handlerMostCheap}>Mais Baratos</button>
            &nbsp;|&nbsp;<label for="vol">Preco:</label>
            R$ 10-20k<input type="range"
                id="price_range"
                name="price_range"
                value={priceRange}
                min="20"
                step='10'
                max="20000"
                onChange={handlerPriceRange}
            /> R$: {priceRange}
        </div><hr/>
        <ul>
            {(data.length > 0) ?
                <TableProds produtos={data}></TableProds>
                : <p>{load ? 'Loaging...' : 'Sorry! No Data Founded. :('}</p>}
        </ul>
    </>);
}

export default ListProds