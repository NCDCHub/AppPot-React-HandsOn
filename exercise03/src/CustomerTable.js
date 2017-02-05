import React from "react";
import moment from "moment";

class CustomerRow extends React.Component {
    formatDate(date) {
        return moment(date).format("YYYY/MM/DD HH:mm:ss");
    }

    render() {
        const { customer } = this.props;
        return (
            <tr >
                <td>{customer.customerId}</td>
                <td>{customer.name}</td>
                <td>{customer.zip}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.sex}</td>
                <td>{this.formatDate(customer.serverUpdateTime)}</td>
            </tr>
        );
    }
}

export default class CustomerTable extends React.Component {
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>顧客ID</th>
                            <th>顧客名</th>
                            <th>郵便番号</th>
                            <th>住所</th>
                            <th>電話番号</th>
                            <th>性別</th>
                            <th>更新日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customers.map((customer) => {
                            return <CustomerRow key={customer.objectId} customer={customer} />;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}