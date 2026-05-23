app.get("/calculate", (req, res) => {
    const { num1, num2, operator } = req.query;
    const a = parseFloat(num1);
    const b = parseFloat(num2);
  
    let result;
  
    if (operator === "+") result = a + b;
    else if (operator === "-") result = a - b;
    else if (operator === "*") result = a * b;
    else if (operator === "/") result = a / b;
    else return res.json("Invalid Operator");
  
    res.json({ result });
  });