import { toast } from 'react-toastify';
import { statusOptions, typeOptions } from './../constants/index';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddJob = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //  form sınıfında örnek alma
    const form = new FormData(e.target);
    // formdaki verilerden obje oluşturma
    const newJob = Object.fromEntries(form.entries());

    // select alanlarını kontrol
    if (!newJob.type || !newJob.status) {
      toast.info('Please selecet type-status');
      return;
    }
    // işe id ekleme
    newJob.id = v4();
    // tarih ekleme
    newJob.date = new Date();

    // api'ye gönderme
    axios
      .post('http://localhost:4000/jobs', newJob)
      .then(() => {
        navigate('/');
        toast.success('upps try again');
      })
      .catch(() => toast.error('its done'));
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input type="text" name="position" required />
          </div>
          <div>
            <label>Company</label>
            <input type="text" name="company" required />
          </div>
          <div>
            <label>Location</label>
            <input type="text" name="location" required />
          </div>
          <div>
            <label>Status</label>
            <select name="status">
              <option selected disabled>
                select
              </option>
              {statusOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type">
              <option selected disabled>
                select
              </option>
              {typeOptions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <button className="btn">ADD</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
