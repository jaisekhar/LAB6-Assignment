const params = require('yargs');

const customers = require('./customer_crud.js');


const customer_id = {
    describe: 'ID of the Customer',
    demand : true,
    alias : 'i'
};

const customer_name = {
    describe: 'Name of the Customer',
    demand : true,
    alias : 'n'
};

const customer_email = {
    describe: 'E-mail of the Customer',
    demand : true,
    alias : 'e'
};

//Argument configuration for Yargs module

const param =  params
    .command('create','Add a new customer',{
        id: customer_id,
        name: customer_name,
        email: customer_email
    })
    .command('update','update existing customer',{
        id: customer_id,
        name: customer_name,
        email: customer_email
    })
    .command('list','List all Customers')
    .command('read','Read a Customer',{
      id: customer_id
    })
    .command('delete','Remove a Customer',{
      id: customer_id
    })
    .help()
    .argv;

//Accessing the first argument to know the typ;e of operation in CRUD.

var command = params.argv._[0];

//Argument configuration for Create Operation
if (command === 'create'){
    var customer = customers.createCustomer(param.id,param.name,param.email);
    if (customer){
      customers.logCustomers(customer);
    } else{
      console.log("Customer record already exists");
    }
}

else if (command === 'list') {
  var allCustomers = customers.readAll();
  console.log(`Printing ${allCustomers.length} customer(s).`);
  allCustomers.forEach((customer)=>{
    customers.logCustomers(customer);
  });
}

//Argument configuration for Read Operation
else if (command === 'read') {
   var customer = customers.readCustomer(param.id);
   if(customer){
    customers.logCustomers(customer);
          }
   else{
    console.log("Customer Record not found");
   }
}
//Argument configuration for Delete Operation
else if (command === 'delete') {
    var deleteCustomer = customers.deleteCustomer(param.id);
    var message = deleteCustomer ? 'Customer Record was removed' : 'Customer record not found';
    console.log(message);
}
//Argument configuration for Update Operation
else if (command === 'update'){
    var customer = customers.update_Customers(param.id,param.name,param.email);
    if (customer){
        customers.logCustomers(customer);
    } else{
        console.log("Customer does not exists");
    }
}

else{
  console.log('command customer recognized');
}
