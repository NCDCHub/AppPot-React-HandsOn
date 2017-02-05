import React from "react";

export default class CustomerCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: "", customerName: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSearch() {
        this.props.onSearch(this.state.customerId, this.state.customerName);
    }

    render() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">顧客検索</h3>
                </div>
                <div className="panel-body">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-md-2"><label className="control-label pull-right">顧客ID</label></div>
                            <div className="col-md-3">
                                <input type="text" name="customerId" className="form-control" value={this.state.customerId} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group" style={{marginBottom: 0 + 'px'}}>
                            <div className="col-md-2"><label className="control-label pull-right">顧客名</label></div>
                            <div className="col-md-3">
                                <input type="text" name="customerName" className="form-control" value={this.state.customerName} onChange={this.handleInputChange} />
                            </div>
                            <div className="col-md-offset-4 col-md-3">
                                <input type="button" className="btn btn-primary pull-right" style={{width: 48 + '%'}} value="検索" onClick={this.handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}