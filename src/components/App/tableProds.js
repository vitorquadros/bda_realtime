import React from "react";

export const TableProds = (props)=>{
    
    return(<><table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descricao</th>
                <th>qtd_estoque</th>
                <th>preco</th>
                <th>Importado</th>
                {/* <th colspan="2">Ações</th> */}
            </tr>
        </thead>
        <tbody>
            {props.produtos.map((produto,key)=>{return(
            <tr key={key}>
                <td><a href="">{produto.id_prod}</a></td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.qtd_estoque}</td>
                <td>{produto.preco}</td>
                <td>{(produto.importado)?'Sim':'Não'}</td>
                {/* <td>
                    <a href="{{route('delete',$produto->id)}}" title='Deletar'>&#128465</a>
                    <a href="{{route('edit',$produto->id)}}" title="Editar">✎</a>
                </td> */}
            </tr>)
            })}
        </tbody>
    </table>
    </>)
}