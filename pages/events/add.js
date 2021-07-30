import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookie } from "@/helpers/index";
import Layout from '@/components/Layout';
import styles from '@/styles/AddEvent.module.css';
import { API_URL } from "@/config/index";

export default function AddEventPage({token}) {
    const [values, setValues] = useState({
        name: '',
        venue: '',
        address: '',
        performers: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        //Validation
        const hasEmptyFields = Object.values(values).some((element) => element === "");
        if (hasEmptyFields) {
           toast.error("Please fill in all fields");
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values)
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    return (
        <Layout title='Add New Event'>
            <Link href='/events'>Go Back</Link>
            <h1>Add Event</h1>
            <ToastContainer />

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input type="text" name="performers" id="performers" value={values.performers} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="date">Event Date</label>
                        <input type="date" name="date" id="date" value={values.date} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="time">Event Time</label>
                        <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea type="test" name="description" value={values.description} id="description" onChange={handleInputChange}></textarea>
                </div>
                <button className="btn" type="submit">Add Event</button>
            </form>
        </Layout>
    )
}


export async function getServerSideProps({req}) {
    const {token} = parseCookie(req);

    return {
        props: {
            token,
        }
    }
}