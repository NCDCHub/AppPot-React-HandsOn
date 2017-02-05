import React from "react";
import moment from "moment";
import Customer from "./Customer";
import CustomerDetailDialog from "./CustomerDetailDialog";

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
                <td>
                    <input type="button" className="btn btn-primary btn-xs" value="編集" 
                        onClick={(event) => { this.props.onClick(customer, "edit"); }} />
                </td>
            </tr>
        );
    }
}

export default class CustomerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            customer: null
        };

        this.showDialog = this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    showDialog(customer, mode) {
        customer.mode = mode;
        this.setState({
            isDialogOpen: true,
            customer: customer
        });
    }

    closeDialog() {
        this.setState({
            isDialogOpen: false,
            customer: null
        });
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <caption>
                        <input type="button" className="btn btn-primary btn-sm pull-right" value="新規作成"
                            onClick={(event) => { this.showDialog(new Customer(), "new"); }} />
                    </caption>
                    <thead>
                        <tr>
                            <th>顧客ID</th>
                            <th>顧客名</th>
                            <th>郵便番号</th>
                            <th>住所</th>
                            <th>電話番号</th>
                            <th>性別</th>
                            <th>更新日</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customers.map((customer) => {
                            return <CustomerRow key={customer.objectId} customer={customer} onClick={this.showDialog} />;
                        })}
                    </tbody>
                </table>
                <CustomerDetailDialog customer={this.state.customer} isOpen={this.state.isDialogOpen} onRequestClose={this.closeDialog} />
            </div>
        );
    }
}