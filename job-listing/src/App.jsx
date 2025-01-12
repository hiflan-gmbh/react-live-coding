import { useEffect, useState } from 'react';
import './App.css';

//https://hacker-news.firebaseio.com/v0/jobstories.json
//https://hacker-news.firebaseio.com/v0/item/{id}.json

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const ITEMS_PER_PAGE = 6;

function App() {
  const [loading, setLoading] = useState(false);
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchJobIds = async (currentPage) => {
    setCurrentPage(currentPage);
    try {
      const response = await fetch(`${BASE_URL}/jobstories.json`);
      if (!response.ok) throw new Error('unable to fetch job Ids');
      const jobIds = await response.json();
      setJobIds(jobIds);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      if (jobIds.length === 0) {
        await fetchJobIds();
      }
      const idsPerPage = jobIds.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
      const jobsResponse = await Promise.all(
        idsPerPage.slice(0, 6).map((jobId) => {
          return fetch(`${BASE_URL}/item/${jobId}.json`).then((response) =>
            response.json()
          );
        })
      );

      setJobs([...jobs, ...jobsResponse]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 0) fetchJobs();
  }, [currentPage]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const isButtonVisible =
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE < jobIds.length;

  return (
    <>
      {jobs.map((job) => {
        return <h1 key={job.id}>{job.title}</h1>;
      })}
      {isButtonVisible && (
        <button disabled={loading} onClick={() => fetchJobs(currentPage + 1)}>
          Load more
        </button>
      )}
    </>
  );
}

export default App;
