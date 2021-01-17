import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import useSWR from 'swr';
import axios from 'axios';

const List = ({ match, history }) => {

    const fetcher = async (api) => {
        console.log(api);
    }

    let { data } = useSWR('/board/api', fetcher);

    return(
        <div>
            <div>리스트</div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default List;