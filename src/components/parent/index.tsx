import { useForm } from '../../hooks';
import styles from './style.module.css';

export const Parent = () => {
  const { handleSubmit, register, errors } = useForm();
  
  interface Valid {
    [key: string]: string;
  }
  

  const handleAdd = (data:Valid) => {
    console.log(data);
  };

  return (
    <>
      <h1 className={styles.title}>Parent</h1>

      <form onSubmit={handleSubmit(handleAdd)}>
        <div>
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <input
            {...register('name', { required: 'Please fill name' })}
          />
        </div>

        <div>
          {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
          <input
            {...register("age", { required: 'Please fill age' })}
          />
        </div>
        <button>Save</button>
      </form>
    </>
  );
};
