import fs from "fs";
let data = JSON.parse(fs.readFileSync("pedidos.json"));

class OrderController{
  index(req,res){
    res.json(data)
  }

  create(req,res){
    try {
      let order = req.body;
  
      order = {
        id: data.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: false,
        timestamp: new Date()
      }
  
      data.pedidos.push(order);
  
      fs.writeFileSync("pedidos.json", JSON.stringify(data, null, 2));
  
      res.send(order);
      
    } catch (error) {
      console.log({error: error.message}); 
      console.log(error); 
    }
  }

  findById(req,res){
    try {
      let order = data.pedidos.find((item) => item.id === parseInt(req.params.id))
      
      res.json({order})
    } catch (error) {
      console.log({error: error.message}); 
      console.log(error);
    }
  }

  deleted(req,res){
    try {
      data.pedidos = data.pedidos.filter(order => order.id !== parseInt(req.params.id));
      
      fs.writeFileSync("pedidos.json", JSON.stringify(data, null, 2));

      res.json({message: "Pedido excluído com sucesso!"})
    } catch (error) {
      console.log({error: error.message}); 
      console.log(error); 
    }
  }

  updated(req,res){
    try {
      const { id, cliente, produto, valor, entregue } = req.body;
    
      if (!id || !cliente || !produto || !valor || !entregue == null) {
        throw new Error("Id, cliente, produto, valor e entregue são obrigatórios!")
      }
    
      const index = data.pedidos.findIndex(order => order.id === parseInt(id));
      
      if (index === -1){
        throw new Error("Registro não encontrado 2!");
      }

      data.pedidos[index].cliente = cliente;
      data.pedidos[index].produto = produto;
      data.pedidos[index].valor = valor;
      data.pedidos[index].entregue = entregue;

      fs.writeFileSync("pedidos.json", JSON.stringify(data, null, 2));

      res.json({pedido: 
      {
        cliente: cliente,
        produto: produto,
        valor: valor,
        entregue: entregue
      }
      });
    
    } catch (error) {
      console.log({error: error});
    }
  }

  updatedDelivered(req,res){
    try {
      const order = req.body;
    
      if (!order.id || order.entregue == null) {
        throw new Error("Id e entregue são obrigatórios!")
      }
    
      const index = data.pedidos.findIndex(item => item.id === parseInt(order.id));
      
      if (index === -1){
        throw new Error("Registro não encontrado 2!");
      }

      data.pedidos[index].entregue = order.entregue;

      fs.writeFileSync("pedidos.json", JSON.stringify(data, null, 2));

      res.json({pedido: data.pedidos[index]});
    
    } catch (error) {
      console.log({error: error});
    }
  }

  findClientSumOrders(req,res){
    try {
      const client = req.params.client;

      let ordersClientTotal = data.pedidos.filter((item) => {
        if ((item.cliente != undefined) && (item.entregue == true)){
          return item.cliente.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase().includes(client.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase())
        }
      }).reduce((a,b) => a + b.valor, 0)

      res.json({total: ordersClientTotal})
    } catch (error) {
      console.log({error: error});
    }
  }

  findProductSumOrders(req,res){
    try {
      const product = req.params.product;
      // console.log(product);
      let ordersProductTotal = data.pedidos.filter((item) => {
        if ((item.produto != undefined) && (item.entregue == true)){
          return item.produto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase().includes(product.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g,"").toLowerCase())
          // console.log(item.produto.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        }
      }).reduce((a,b) => a + b.valor, 0);

      res.json({total: ordersProductTotal})
    } catch (error) {
      console.log({error: error});
    }
  }
  
}

export default new OrderController();