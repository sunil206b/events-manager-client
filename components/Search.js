import { useState } from 'react';
import { useRouter } from 'next/router';
import {FaSearch} from 'react-icons/fa';
import styles from '@/styles/Search.module.css';

export default function Search() {
    const [term, setTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/events/search?term=${term}`)
        setTerm('')
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search Events"/>
                <button type="submit" className={styles.fa_custom}><FaSearch /></button>
            </form>
        </div>
    )
}
