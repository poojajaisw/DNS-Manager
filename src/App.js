import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [domains, setDomains] = useState([]);
  const [records, setRecords] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [newRecord, setNewRecord] = useState({ domainId: '', type: '', value: '' });
  const [searchDomain, setSearchDomain] = useState('');
  const [filterType, setFilterType] = useState('');
  const [recordTypes, setRecordTypes] = useState([]);

  useEffect(() => {
    fetchDomains();
    fetchRecords();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get('http://localhost:8080/domains');
      setDomains(response.data);
    } catch (error) {
      console.error('Error fetching domains:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/records');
      setRecords(response.data);

      // Extract unique record types from the records data
      const types = new Set(response.data.map(record => record.type));
      setRecordTypes(Array.from(types));
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleDomainSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/domains', { name: newDomain });
      if (response.status === 201) {
        fetchDomains();
      }
    } catch (error) {
      console.error('Error adding domain:', error);
    }

    setNewDomain('');
  };
  const handleRecordSubmit = async (e) => {
    e.preventDefault();
  
    console.log('New Record:', newRecord);
  
    try {
      const response = await axios.post('http://localhost:8080/records', newRecord);
      console.log('Response:', response); 
  
      if (response.status === 201) {
        fetchRecords();
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  
    setNewRecord({ domainId: '', type: '', value: '' });
  };
  

  const handleRecordDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/records/${id}`);
      if (response.status === 200) {
        fetchRecords();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredDomains = domains.filter(domain => domain.name.includes(searchDomain));
  const filteredRecords = filterType ? records.filter(record => record.type === filterType) : records;

  return (
    <>
       <h1 className="text-center text-uppercase pt-1" style={{backgroundColor:'blue'}}>DNS Manager App</h1>
    <div className="container" style={{marginTop:'5%', backgroundColor:'#3fb4d4'}}>
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center text-uppercase pt-1">Add a new domain:</h2>
          <form onSubmit={handleDomainSubmit}>
            <input
              type="text" className="form-control"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Enter Domain Name"
            />
            <button type="submit" className="btn btn-primary mt-2">Add Domain</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="text-center text-uppercase pt-1">Domains</h2>
          <input type="text" className="form-control mb-2" placeholder="Search Domain" value={searchDomain} onChange={(e) => setSearchDomain(e.target.value)} />
          <ul className='list-group'>
            {filteredDomains.map((domain) => (
              <li key={domain._id} className="list-group-item">{domain.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <h2 className="text-center text-uppercase pt-1">Add a new record:</h2>
          <form onSubmit={handleRecordSubmit}>
            <input
              type="text" className="form-control mb-2"
              value={newRecord.domainId}
              onChange={(e) => setNewRecord({ ...newRecord, domainId: e.target.value })}
              placeholder="Domain ID"
            />
            <input
              type="text" className="form-control mb-2"
              value={newRecord.type}
              onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
              placeholder="Type"
            />
            <input
              type="text" className="form-control mb-2"
              value={newRecord.value}
              onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
              placeholder="Value"
            />
            <button type="submit" className="btn btn-primary">Add Record</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="text-center text-uppercase pt-1">Records</h2>
          <select onChange={(e) => setFilterType(e.target.value)} className="form-control mb-2">
            <option value="">Filter by Record Type</option>
            {recordTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <ul className='list-group'>
            {filteredRecords.map((record) => (
              <li key={record._id} className="list-group-item">
                {record.type}: {record.value}
                <button onClick={() => handleRecordDelete(record._id)} className="btn btn-danger ml-2" >Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
