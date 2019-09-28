const file =  require('fs');

//Functions for read and write JSON objects into a file.
var fetchCustomers = () => {
  try {                          //if file won't exist
    var customers = file.readFileSync('customers-data.json')
    return JSON.parse(customers);
  } catch(e){
    return [];
  }
};

var writeCustomers = (customers) => {
  file.writeFileSync('customers-data.json',JSON.stringify(customers, null, "\t"));
};

//End of I/O Functions

//Function to create the customer
var createCustomer = (id, name, email) => {
    var customers = fetchCustomers();
    var customer = {id,name,email};
    var customerExists =  customers.filter((customer) => {
      return customer.id === id;
    });

    if (customerExists.length === 0){
      customers.push(customer);
      writeCustomers(customers);
      return customer
    }

  };

//Function to update the customer details based on Id

var update_Customers = (id, name, email) => {
    var customers = fetchCustomers();
    var customer = {id,name,email};
    var index = customers.findIndex(obj => obj.id==id);
    console.log(index);

    if (index != -1){
        customers[index].name=name;
        customers[index].email=email;
        writeCustomers(customers);
        return customer
    }

};

var readAll = () => {
    return fetchCustomers();
};

var readCustomer = (id) => {
    
    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {
      return customer.id === id;
    });

    return getCustomers[0]

};

//Function to Delete the customer based on the Id.

var deleteCustomer = (id) => {

    var customers = fetchCustomers();

    var CustomerFilter =  customers.filter((customer) => {
      return customer.id !== id;
    });

    writeCustomers(CustomerFilter);

    return customers.length !== CustomerFilter.length
    
};

//Function to log the Customer details in to the console.

var logCustomers = (customer) => {
  console.log('***');
  console.log(`Customer_Id: ${customer.id}`);
  console.log(`Customer_Name: ${customer.name}`);
  console.log(`Customer_E-mail: ${customer.email}`);
};

module.exports = {
    createCustomer, readAll, deleteCustomer, readCustomer,logCustomers, update_Customers
};
