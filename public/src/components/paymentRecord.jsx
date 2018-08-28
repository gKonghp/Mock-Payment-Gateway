import React from 'react';
import {Table} from 'reactstrap';

const PaymentRecord = ({record}) => {
    function recordInfo(){
        if(record){
            return(
                <Table responsive={true} bordered={true} dark={true}>
                    <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Phone Number</th>
                        <th>Currency</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row">{record.custName}</td>
                        <td>{record.custPhone}</td>
                        <td>{record.currency}</td>
                        <td>{record.price}</td>
                    </tr>
                    </tbody>
                </Table>
            )
        }else{
            return(<div></div>)
        }
    }

    return (
        recordInfo()
    )
}

export default PaymentRecord;