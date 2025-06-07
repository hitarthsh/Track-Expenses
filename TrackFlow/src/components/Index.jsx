import React, { useState } from "react";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: +amount,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const balance = income - expense;

  return (
    <div
      className="container-fluid py-5 min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="head-title mb-5">
            <h1
              className="text-center text-white display-4 fw-bold"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              Expense Tracker
            </h1>
          </div>

          {/* Balance Card */}
          <div
            className="card bg-dark border-0 mb-4 shadow-lg"
            style={{ background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)" }}
          >
            <div className="card-body p-4">
              <h6 className="text-uppercase fw-bold text-white-50 mb-2">
                Your Balance
              </h6>
              <h2 className="display-4 mb-0 text-white fw-bold">₹{balance}</h2>
            </div>
          </div>

          {/* Income/Expense Card */}
          <div
            className="card bg-dark border-0 mb-4 shadow-lg"
            style={{ background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)" }}
          >
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-6">
                  <div
                    className="p-3 rounded"
                    style={{ background: "rgba(40, 167, 69, 0.1)" }}
                  >
                    <h6 className="text-uppercase fw-bold text-white-50 mb-2">
                      Income
                    </h6>
                    <h4 className="text-success mb-0 fw-bold">₹{income}</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="p-3 rounded"
                    style={{ background: "rgba(220, 53, 69, 0.1)" }}
                  >
                    <h6 className="text-uppercase fw-bold text-white-50 mb-2">
                      Expense
                    </h6>
                    <h4 className="text-danger mb-0 fw-bold">₹{expense}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Form */}
          <div
            className="card bg-dark border-0 mb-4 shadow-lg"
            style={{ background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)" }}
          >
            <div className="card-body p-4">
              <h5 className="card-title mb-4 text-white fw-bold">
                Add New Transaction
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="text" className="form-label text-white-50">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-0"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter description..."
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label text-white-50">
                    Amount
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-dark text-white border-0"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      className="form-control bg-dark text-white border-0"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount..."
                      required
                    />
                  </div>
                  <small className="text-white-50 mt-2 d-block">
                    Use negative (-) for expense
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold"
                  style={{
                    background: "linear-gradient(45deg, #007bff, #0056b3)",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0,123,255,0.3)",
                  }}
                >
                  Add Transaction
                </button>
              </form>
            </div>
          </div>

          {/* Transaction History */}
          <div
            className="card bg-dark border-0 shadow-lg"
            style={{ background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)" }}
          >
            <div className="card-body p-4">
              <h5 className="card-title mb-4 text-white fw-bold">
                Transaction History
              </h5>
              {transactions.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-white-50 mb-0">No transactions yet</p>
                </div>
              ) : (
                <div className="list-group">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`list-group-item bg-dark border-0 d-flex justify-content-between align-items-center mb-2 rounded ${
                        transaction.amount > 0
                          ? "border-start border-success"
                          : "border-start border-danger"
                      }`}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderLeftWidth: "4px !important",
                      }}
                    >
                      <div>
                        <h6 className="mb-1 text-white fw-bold">
                          {transaction.text}
                        </h6>
                        <small className="text-white-50">
                          {new Date(transaction.id).toLocaleDateString()}
                        </small>
                      </div>
                      <span
                        className={`fw-bold ${
                          transaction.amount > 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₹{transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
