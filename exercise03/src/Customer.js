import AppPot from "./config";

export default AppPot.defineModel("Customer", {
    "customerId": {
        type: AppPot.DataType.Varchar
    },
    "name": {
        type: AppPot.DataType.Varchar
    },
    "zip": {
        type: AppPot.DataType.Varchar
    },
    "address": {
        type: AppPot.DataType.Varchar
    },
    "phone": {
        type: AppPot.DataType.Varchar
    },
    "sex": {
        type: AppPot.DataType.Long
    }
});