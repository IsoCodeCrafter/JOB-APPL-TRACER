import { useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setJob, setError } from '../redux/jobSlice';
import Loading from '../components/Loading';
import RefreshButton from './../components/RefreshButton';
import Filter from '../components/Filter';

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  // api den verileri çekip store'a aktarır
  const fetchData = () => {
    axios
      .get('http://localhost:4000/jobs')
      .then((res) => dispatch(setJob(res.data)))
      .catch(() => dispatch(setError()));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter />

      <h3 className="job-count">
      Jobs found   ({state.jobs.length}) among (
        {state.jobs.length}) wiev
      </h3>

      <section className="job-list">
        {!state.initialized && <Loading />}

        {/* yüklendiyse ve hata yoksa listele varsa uyar */}
        {state.initialized && !state.isError ? (
          state.jobs.map((job) => <Card job={job} />)
        ) : (
          <p className="error-msg">
            <span>Upsssss..</span>
            <RefreshButton handleClick={() => fetchData()} />
          </p>
        )}
      </section>
    </div>
  );
};

export default JobList;
