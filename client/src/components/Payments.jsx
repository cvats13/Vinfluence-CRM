import { useEffect, useState } from "react";
import API from "../services/api";

function Payments({ client }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentDate, setPaymentDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (client?._id) {
      fetchPayments();
    }
  }, [client]);

  const fetchPayments = async () => {
    try {
      const response = await API.get(`/payments/${client._id}`);
      setPayments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();

    try {
      await API.post("/payments", {
        clientId: client._id,
        amount,
        paymentMethod,
        paymentDate,
        remarks,
      });

      alert("Payment Added Successfully");

      setAmount("");
      setPaymentMethod("UPI");
      setPaymentDate("");
      setRemarks("");

      fetchPayments();

    } catch (error) {
      console.log(error);
      alert("Failed to Add Payment");
    }
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await API.delete(`/payments/${id}`);

      alert("Payment Deleted");

      fetchPayments();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="mb-4">💰 Add Payment</h3>

          <form onSubmit={addPayment}>

            <div className="row g-3">

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">

                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Card</option>
                </select>

              </div>

              <div className="col-md-3">

                <input
                  type="date"
                  className="form-control"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />

              </div>

              <div className="col-md-3">

                <input
                  className="form-control"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />

              </div>

            </div>

            <button
              className="btn btn-success mt-3"
              type="submit"
            >
              Add Payment
            </button>

          </form>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <h3 className="mb-4">
            Payment History
          </h3>

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>

                <th>Date</th>

                <th>Amount</th>

                <th>Method</th>

                <th>Remarks</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr key={payment._id}>

                  <td>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>

                  <td>
                    ₹{payment.amount}
                  </td>

                  <td>
                    {payment.paymentMethod}
                  </td>

                  <td>
                    {payment.remarks}
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePayment(payment._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Payments;