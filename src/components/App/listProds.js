import React, { useState, useEffect } from 'react';
import {
    getOrderByChild,
    getFilterByChild,
    getMostExpensive,
    getMostCheap,
    getPriceRange
} from '../Firebase/ProdutosDao';
import { TableProds } from './tableProds';
import 'materialize-css';
import { Button, Select, Row, Col, ProgressBar, TextInput } from 'react-materialize';


function ListProds(props) {

    const prods = []
    const [data, setData] = useState([])
    const [loading, setLoad] = useState(true)
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
        console.log({ 'ordenar': order })
    }

    function receiveProds(snap) {
        if (snap.exists()) {
            prods.push({ 'id': snap.key, ...snap.val() })
            console.log({ "produto": { 'id': snap.key, ...snap.val() } })
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

    return (<div className='flex-container'>
        <div className={'filterFormContainer'}>
            <label for="order">Ordenar por:</label>
            <Select id='order' name='order' onChange={handlerSelectOrder}>
                <option value={'id_prod'} selected={((order === 'id_prod') ? true : false)} >ID</option>
                <option value={'preco'} selected={((order === 'preco') ? true : false)}>Preco</option>
                <option value={'qtd_estoque'} selected={((order === 'qtd_estoque') ? true : false)}>Quantidade</option>
                <option value={'nome'} selected={((order === 'nome') ? true : false)}>Nome</option>
            </Select>
            <div className='filterPanel'>
                <div>
                    <label for="filter">Filtrar por:</label>
                    <Select id='filter' name='field' onChange={handlerSelectFilter}>
                        <option value={'nome'} selected={((filter === 'nome') ? true : false)} >Nome</option>
                        <option value={'descricao'} selected={((filter === 'descricao') ? true : false)}>Descricao</option>
                    </Select>
                </div>
                <div>
                    <label for="termo"> Termo de filtro:</label>
                    <TextInput id="termo" placeholder='Digite o termo' onChange={handlerApplyFilter} />
                </div>
            </div>
            <label for="vol">Preco:</label>
            <div className='rangeStyle'>
                R$ 10-20k&nbsp;<input type='range'
                    id={"price_range"}
                    name={"price_range"}
                    value={priceRange}
                    max='20000'
                    min='10'
                    step='10'
                    onChange={handlerPriceRange}
                />
                &nbsp;R$: {priceRange}
            </div>
            {/* <Button onClick={handlerApplyFilter}>Filtrar</Button> */}
            <div className='btnsContainers'>
                <Button className="waves-effect waves-light btn red" onClick={handlerMostExpensive}>Mais Caros</Button>
                <Button className="waves-effect waves-light btn" onClick={handlerMostCheap}>Mais Baratos</Button>
            </div>
        </div>
        <div className={'tableContainer'}>
            {(data.length > 0) ?
                <TableProds produtos={data}></TableProds>
                : (loading) ? <Row>
                    <Col s={12}>
                        <ProgressBar />
                    </Col>
                </Row> : <p>Sem Resultados</p>
            }
        </div>
    </div>);
}

export default ListProds