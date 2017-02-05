import React from "react";
import Modal from "react-modal";
import Customer from "./Customer";

export default class CustomerDetailDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {}
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen() {
        const customer = this.props.customer;
        this.setState({
            values: {
                objectId: customer.objectId,
                customerId: customer.customerId,
                name: customer.name,
                zip: customer.zip,
                address: customer.address,
                phone: customer.phone,
                sex: customer.sex,
                serverCreateTime: customer.serverCreateTime,
                serverUpdateTime: customer.serverUpdateTime
            }
        });
    }

    handleInputChange(event) {
        var values = this.state.values;
        values[event.target.name] = event.target.value;
        this.setState({
            values: values
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const customer = this.props.customer;
        if (customer.mode == "new") {
            var promise = customer.insert(this.state.values);
        }
        else {
            var promise = customer.update(this.state.values);
        }
        
        promise.then(() => {
            this.props.onRequestClose();
        })
        .catch((error) => {
            console.log(error);
			alert(error.description);
		});

        return false;
    }

    nullToBlank(str) {
	    return str == null || str == undefined ? "" : str;
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                onAfterOpen={this.handleOpen}
                className="modal-content"
                overlayClassName="modal-overlay"
                contentLabel="Customer Detail Dialog"
            >
                <div className="panel panel-primary" style={{marginBottom: 0 + "px"}}>
                    <div className="panel-heading">
                        <h3 className="panel-title text-center">顧客詳細</h3>
                    </div>

                    <form name="customerForm" onSubmit={this.handleSubmit}>
                        <div className="panel-body">
                            <div className="form-group">
                                <label className="control-label" htmlFor="objectId">オブジェクトID</label>
                                <input type="text" className="form-control" name="objectId" readOnly="readOnly"
                                    value={this.nullToBlank(this.state.values.objectId)} onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="customerId">顧客ID</label>
                                <input type="text" className="form-control" name="customerId" required="required"
                                    value={this.nullToBlank(this.state.values.customerId)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="name">顧客名</label>
                                <input type="text" className="form-control" name="name" required="required"
                                    value={this.nullToBlank(this.state.values.name)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="zip">郵便番号</label>
                                <input type="text" className="form-control" name="zip" 
                                    value={this.nullToBlank(this.state.values.zip)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="address">住所</label>
                                <input type="text" className="form-control" name="address" 
                                    value={this.nullToBlank(this.state.values.address)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="phone">電話番号</label>
                                <input type="text" className="form-control" name="phone" required="required" pattern="^[0-9]+$"
                                    value={this.nullToBlank(this.state.values.phone)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="sex">性別</label>
                                <input type="text" className="form-control" name="sex" required="required" pattern="^[0-1]+$"
                                    value={this.nullToBlank(this.state.values.sex)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="serverCreateTime">登録日</label>
                                <input type="text" className="form-control" name="serverCreateTime" readOnly="readOnly" 
                                    value={this.nullToBlank(this.state.values.serverCreateTime)} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="serverUpdateTime">更新日</label>
                                <input type="text" className="form-control" name="serverUpdateTime" readOnly="readOnly" 
                                    value={this.nullToBlank(this.state.values.serverUpdateTime)} onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div className="panel-footer container-fluid" style={{paddingLeft: 0 + "px", paddingRight: 0 + "px"}}>
                            <div className="row-fluid">
                                <div className="col-md-offset-3 col-md-6">
                                    <input type="button" className="btn btn-primary" style={{width: 48 + "%"}} value="キャンセル" onClick={this.props.onRequestClose} />
                                    <input type="submit" className="btn btn-primary pull-right" style={{width: 48 + "%"}} value="保存" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}