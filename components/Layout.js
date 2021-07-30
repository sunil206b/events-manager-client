import Head from 'next/head';
import {useRouter} from 'next/router';
import Header from './Header';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';
import Showcase from './Showcase';

export default function Layout({title, keywords, description, children}) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}></meta>
                <meta name='keywords' content={keywords}></meta>
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Entertainment Events | Find the hottest parties',
    description: 'Find the latest entertainment events',
    keywords: 'musicals, concerts, comedy',
}