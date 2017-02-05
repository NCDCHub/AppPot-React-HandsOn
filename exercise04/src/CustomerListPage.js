import React from "react";
import CustomerCondition from "./CustomerCondition";
import CustomerTable from "./CustomerTable";
import Customer from "./Customer";
import AppPot from "./config";

export default class CustomerListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { customers: []};
        
        this.findList = this.findList.bind(this);
    }

    findList(customerId, customerName) {
        Customer.select()
			.where("#Customer.customerId like ? AND #Customer.name like ?", "%" + customerId + "%", "%" + customerName + "%")
            .orderBy('#Customer.customerId', AppPot.Model.Order.asc)
			.findList()
        .then((result) => {
            this.setState({
                customers: result.Customer
            });
        })
        .catch(function(error) {
            console.error(error);
            alert(error.description);
        });
    }

    render() {
        return (
            <div>
                <div className="container">	
                    <CustomerCondition onSearch={this.findList} />
                    <CustomerTable customers={this.state.customers} />
                </div>
            </div>
        );
    }
}