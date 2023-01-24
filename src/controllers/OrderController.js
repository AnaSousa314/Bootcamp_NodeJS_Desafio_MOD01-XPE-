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
        throw new Error("Registro não encontrado 1!")
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
  
}

export default new OrderController();