import { useState, useMemo, useCallback, useEffect } from 'react';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';
import { TRANSACTION_DATA } from '../../api/mock_data';
import * as transactionApi from '../../api';
import AsyncData from '../AsyncData';
import useSWR from 'swr';
import { getAll } from '../../api';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  //ik gebruik mijn transactie data als startwaarde en vang ze op in de statevariabele transactions; ik voorzie ook een setter setTransactions
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        setError(null);
        const data = await transactionApi.getAll();
        setTransactions(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);


  // //transacties filteren
  // const filteredtransactions = transactions.filter((transactie) => {
  //   console.log('filtering...');
  //   return transactie.place.toLowerCase().includes(search.toLowerCase());
  // });

  //useMemo verwacht 2 argumenten: een functie en een array van dependencies
  //het eerste argument functie moet iets teruggeven
  const filteredTransaction = useMemo(() =>
    transactions.filter((transactie) => {
      console.log('filtering...');
      return transactie.place.name.toLowerCase().includes(search.toLowerCase());
    }),
    [search, transactions] //als de search of de transacties veranderen, dan moeten we opnieuw filteren
  );

  console.log('rendering TransactionList');
  return (
    <>
      <h1>Transactions</h1>
      <div className="input-group mb-3 w-50">
        <input
          type="search"
          id="search"
          className="form-control rounded"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setSearch(text)} //als er op de knop wordt geklikt, dan wordt de huidige tekst ingesteld
        >
          Search
        </button>
      </div>
      <div className='mt-4'>
        <AsyncData loading={loading} error={error}>
          {!error ? <TransactionTable transactions={filteredTransactions} /> : null}
        </AsyncData>
      </div>
{/* 
      {filteredTransaction.map((trans, index) => (
        <Transaction {...trans} key={index} />
      ))}

      <TransactionForm onSaveTransaction={handleSaveTransaction} /> */}
    </>
  );
}
