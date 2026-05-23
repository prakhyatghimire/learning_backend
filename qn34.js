const products = [
    { id: 1, name: "Phone",  category: "electronics" },
    { id: 2, name: "Laptop", category: "electronics" },
    { id: 3, name: "Shoes",  category: "fashion"     },
    { id: 4, name: "Watch",  category: "fashion"     },
  ];
  
  app.get("/products", (req, res) => {
    const { category } = req.query;
  
    if (!category) {
      return res.json(products); // Return all if no filter
    }
  
    const filtered = products.filter((p) => p.category === category);
    res.json(filtered);
  });