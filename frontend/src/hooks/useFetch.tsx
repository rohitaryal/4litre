import { useEffect, useState } from "react"

const useFetch = function (url: string, options: RequestInit) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(data => data.json())
            .then(data => setResult(data))
            .catch(err => setError(err));
    }, [url]);

    return { result, error };
}

export default useFetch;