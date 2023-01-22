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
  
}

export default new OrderController();