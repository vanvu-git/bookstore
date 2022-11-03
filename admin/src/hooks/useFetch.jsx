import { useEffect, useState } from 'react';
import axios from 'axios';


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const res = await axios.get(url);
                setData(res.data);
                setPosts(res.data.posts);
            }catch (err){
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    },[]);


    const reFetch = async () => {
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data);
        }catch (err){
            setError(err);
        }
        setLoading(false);
    };

    return {posts, data, loading, error, reFetch};
};

export default useFetch;